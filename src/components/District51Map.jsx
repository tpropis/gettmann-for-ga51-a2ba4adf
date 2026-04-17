/**
 * District51Map.jsx
 * Interactive voter map for Georgia House District 51 (Roswell / Johns Creek / Sandy Springs)
 * keithforga.com
 *
 * Dependencies (add to your project):
 *   npm install mapbox-gl @mapbox/mapbox-gl-geocoder
 *
 * Required env var:
 *   REACT_APP_MAPBOX_TOKEN  (or VITE_MAPBOX_TOKEN for Vite)
 *
 * Usage:
 *   <District51Map />
 */

import React, { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl/dist/esm-min/mapbox-gl.js";
import "mapbox-gl/dist/mapbox-gl.css";

// ─── CONFIG ────────────────────────────────────────────────────────────────────

const MAPBOX_TOKEN = "pk.eyJ1Ijoia2VpdGhmb3JnYSIsImEiOiJjbW8yNGJ2dmcwZXhxMnFwczY2ZnJkMnl2In0.D0pur85wTOoOxkgp2R40cQ";

const DISTRICT_GEOJSON_URL =
  "https://gismaps.fultoncountyga.gov/arcgispub/rest/services/Elections/VotingDistrictsMapViewer_Public/MapServer/7/query?where=DISTRICT+%3D+%27051%27&outFields=*&f=geojson";

const BOUNDS = [
  [-84.45, 33.95], // SW
  [-84.15, 34.1],  // NE
];

const CENTER = [-84.31, 34.025];
const INITIAL_ZOOM = 11.5;

// Georgia Red
const DISTRICT_COLOR = "#BA0C2F";
const DISTRICT_FILL  = "rgba(186,12,47,0.08)";

// Polling locations
const EARLY_VOTING = [
  {
    id: "ev1",
    name: "North Fulton Service Center",
    address: "7741 Roswell Rd, Sandy Springs, GA 30350",
    coords: [-84.3757, 33.9635],
  },
  {
    id: "ev2",
    name: "Roswell Library",
    address: "115 Norcross St, Roswell, GA 30075",
    coords: [-84.3616, 34.0231],
  },
  {
    id: "ev3",
    name: "East Roswell Library",
    address: "2301 Holcomb Bridge Rd, Roswell, GA 30076",
    coords: [-84.2947, 34.0292],
  },
];

const ELECTION_DAY = [
  {
    id: "ed1",
    name: "Hembree Park Recreation Center",
    address: "850 Hembree Rd, Roswell, GA 30076",
    coords: [-84.3271, 34.0454],
  },
  {
    id: "ed2",
    name: "East Roswell Recreation Center",
    address: "9000 Fouts Rd, Roswell, GA 30076",
    coords: [-84.2762, 34.0388],
  },
];

// ─── HELPERS ───────────────────────────────────────────────────────────────────

/**
 * Point-in-polygon check via Mapbox queryRenderedFeatures isn't ideal mid-load,
 * so we use ray-casting on the GeoJSON polygon directly.
 */
function pointInPolygon(point, polygon) {
  // polygon: GeoJSON Polygon or MultiPolygon geometry
  const [px, py] = point;
  let inside = false;

  const checkRing = (ring) => {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i];
      const [xj, yj] = ring[j];
      const intersect =
        yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
  };

  if (polygon.type === "Polygon") {
    checkRing(polygon.coordinates[0]);
  } else if (polygon.type === "MultiPolygon") {
    polygon.coordinates.forEach((poly) => checkRing(poly[0]));
  }
  return inside;
}

function mapsUrl(address) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

// ─── CUSTOM MARKER SVG ─────────────────────────────────────────────────────────

function makePinSVG(color) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
      <defs>
        <filter id="glow-${color.replace("#","")}">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path
        d="M14 0C6.268 0 0 6.268 0 14c0 9.941 14 22 14 22S28 23.941 28 14C28 6.268 21.732 0 14 0z"
        fill="${color}"
        filter="url(#glow-${color.replace("#","")})"
        opacity="0.95"
      />
      <circle cx="14" cy="14" r="5" fill="white" opacity="0.9"/>
    </svg>
  `;
}

// ─── POPUP COMPONENT (rendered as HTML string) ─────────────────────────────────

function popupHTML({ name, address, type }) {
  const accent = type === "early" ? "#22d3ee" : "#ef4444";
  const label  = type === "early" ? "EARLY VOTING" : "ELECTION DAY";
  return `
    <div style="
      font-family: 'DM Sans', 'Segoe UI', sans-serif;
      background: #0f1117;
      border: 1px solid ${accent}44;
      border-radius: 10px;
      padding: 14px 16px;
      min-width: 210px;
      box-shadow: 0 0 20px ${accent}33;
    ">
      <div style="
        font-size: 9px;
        letter-spacing: 0.12em;
        color: ${accent};
        font-weight: 700;
        margin-bottom: 6px;
        text-transform: uppercase;
      ">${label}</div>
      <div style="
        font-size: 14px;
        font-weight: 600;
        color: #f1f5f9;
        margin-bottom: 4px;
        line-height: 1.3;
      ">${name}</div>
      <div style="
        font-size: 12px;
        color: #94a3b8;
        margin-bottom: 12px;
        line-height: 1.4;
      ">${address}</div>
      <a
        href="${mapsUrl(address)}"
        target="_blank"
        rel="noopener noreferrer"
        style="
          display: block;
          text-align: center;
          background: ${accent};
          color: #0f1117;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 7px 12px;
          border-radius: 6px;
          transition: opacity 0.2s;
        "
        onmouseover="this.style.opacity='0.85'"
        onmouseout="this.style.opacity='1'"
      >
        Get Directions →
      </a>
    </div>
  `;
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function District51Map() {
  const mapContainer = useRef(null);
  const mapRef       = useRef(null);
  const geocoderInput = useRef(null);

  const [districtGeo, setDistrictGeo]   = useState(null);
  const [searchQuery, setSearchQuery]   = useState("");
  const [statusMsg, setStatusMsg]       = useState(null); // { type: "success"|"outside"|"error", text }
  const [isSearching, setIsSearching]   = useState(false);
  const [legend, setLegend]             = useState(true);

  // ── Load district GeoJSON ──────────────────────────────────────────────────
  useEffect(() => {
    fetch(DISTRICT_GEOJSON_URL)
      .then((r) => r.json())
      .then(setDistrictGeo)
      .catch(() =>
        console.warn("Failed to load district boundary. Using fallback.")
      );
  }, []);

  // ── Init map ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: CENTER,
      zoom: INITIAL_ZOOM,
      maxBounds: BOUNDS,
      attributionControl: false,
    });

    map.on("load", () => {
      // ── District boundary ───────────────────────────────────────────────
      if (districtGeo) addDistrictLayers(map, districtGeo);

      // ── Polling markers ─────────────────────────────────────────────────
      addMarkers(map);

      // ── Nav controls ────────────────────────────────────────────────────
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "bottom-right");
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Add district layers when GeoJSON arrives ───────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !districtGeo) return;

    const addWhenReady = () => addDistrictLayers(map, districtGeo);

    if (map.isStyleLoaded()) {
      addWhenReady();
    } else {
      map.once("load", addWhenReady);
    }
  }, [districtGeo]);

  function addDistrictLayers(map, geojson) {
    if (map.getSource("district51")) return; // already added

    map.addSource("district51", { type: "geojson", data: geojson });

    // Fill
    map.addLayer({
      id: "district51-fill",
      type: "fill",
      source: "district51",
      paint: {
        "fill-color": DISTRICT_FILL,
        "fill-opacity": 1,
      },
    });

    // Stroke
    map.addLayer({
      id: "district51-line",
      type: "line",
      source: "district51",
      paint: {
        "line-color": DISTRICT_COLOR,
        "line-width": 2,
        "line-blur": 3,
        "line-opacity": 0.95,
      },
    });
  }

  function addMarkers(map) {
    const addGroup = (locations, color, type) => {
      locations.forEach((loc) => {
        const el = document.createElement("div");
        el.innerHTML = makePinSVG(color);
        el.style.cursor = "pointer";
        el.style.transition = "transform 0.2s";
        el.addEventListener("mouseenter", () => {
          el.style.transform = "scale(1.2) translateY(-3px)";
        });
        el.addEventListener("mouseleave", () => {
          el.style.transform = "scale(1) translateY(0)";
        });

        const popup = new mapboxgl.Popup({
          offset: 28,
          closeButton: false,
          className: "d51-popup",
          maxWidth: "260px",
        }).setHTML(popupHTML({ ...loc, type }));

        new mapboxgl.Marker({ element: el })
          .setLngLat(loc.coords)
          .setPopup(popup)
          .addTo(map);

        el.addEventListener("click", () => popup.addTo(map));
      });
    };

    addGroup(EARLY_VOTING,  "#22d3ee", "early");
    addGroup(ELECTION_DAY,  "#ef4444", "election");
  }

  // ── Address search ─────────────────────────────────────────────────────────
  const handleSearch = useCallback(
    async (e) => {
      e?.preventDefault();
      if (!searchQuery.trim()) return;

      setIsSearching(true);
      setStatusMsg(null);

      try {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchQuery
        )}.json?access_token=${MAPBOX_TOKEN}&country=US&proximity=-84.31,34.025&limit=1`;

        const res  = await fetch(url);
        const data = await res.json();

        if (!data.features?.length) {
          setStatusMsg({ type: "error", text: "Address not found. Try a more specific search." });
          return;
        }

        const [lng, lat] = data.features[0].center;
        mapRef.current?.flyTo({ center: [lng, lat], zoom: 14, duration: 1400 });

        // Point-in-polygon check
        if (districtGeo) {
          const geom = districtGeo.features?.[0]?.geometry || districtGeo.geometry;
          const inside = geom ? pointInPolygon([lng, lat], geom) : null;

          if (inside === true) {
            setStatusMsg({
              type: "success",
              text: "Welcome Neighbor! You are in District 51.",
            });

            // Drop a temporary marker
            const el = document.createElement("div");
            el.style.cssText = `
              width:16px;height:16px;
              border-radius:50%;
              background:#BA0C2F;
              border:2px solid white;
              box-shadow:0 0 12px #BA0C2F;
            `;
            new mapboxgl.Marker({ element: el })
              .setLngLat([lng, lat])
              .addTo(mapRef.current);
          } else if (inside === false) {
            setStatusMsg({
              type: "outside",
              text: "You are just outside the district. Check the SOS site for your representative.",
            });
          }
        }
      } catch (err) {
        setStatusMsg({ type: "error", text: "Search failed. Please try again." });
      } finally {
        setIsSearching(false);
      }
    },
    [searchQuery, districtGeo]
  );

  // ── Render ─────────────────────────────────────────────────────────────────
  const statusStyles = {
    success: "bg-emerald-900/80 border-emerald-500/60 text-emerald-200",
    outside: "bg-amber-900/80 border-amber-500/60 text-amber-200",
    error:   "bg-red-900/80 border-red-500/60 text-red-200",
  };

  return (
    <>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        .mapboxgl-popup-content {
          background: transparent !important;
          padding: 0 !important;
          box-shadow: none !important;
          border: none !important;
        }
        .mapboxgl-popup-tip { display: none !important; }
        .mapboxgl-ctrl-bottom-right { bottom: 56px !important; }
        
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .status-banner { animation: fadeSlide 0.3s ease forwards; }

        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(186,12,47,0.6); }
          70%  { box-shadow: 0 0 0 10px rgba(186,12,47,0); }
          100% { box-shadow: 0 0 0 0 rgba(186,12,47,0); }
        }
      `}</style>

      {/* Map */}
      <div ref={mapContainer} style={{ width: '100%', height: 'calc(100vh - 220px)' }} />

      {/* ── TOP OVERLAY ── */}
      <div className="absolute top-0 left-0 right-0 z-10 p-3 flex flex-col gap-2 pointer-events-none">

        {/* Header badge */}
        <div className="pointer-events-auto self-start flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{ background: "rgba(3,7,18,0.82)", border: "1px solid rgba(186,12,47,0.5)", backdropFilter: "blur(8px)" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#BA0C2F", display: "inline-block", animation: "pulse-ring 2s infinite" }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#e2e8f0", textTransform: "uppercase" }}>
            Georgia House District 51
          </span>
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="pointer-events-auto flex gap-2 w-full max-w-md"
          style={{ maxWidth: 420 }}
        >
          <input
            ref={geocoderInput}
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setStatusMsg(null); }}
            placeholder="Enter your address or ZIP (30076, 30022, 30350)…"
            style={{
              flex: 1,
              background: "rgba(3,7,18,0.88)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              color: "#f1f5f9",
              fontSize: 13,
              padding: "9px 14px",
              outline: "none",
              backdropFilter: "blur(8px)",
              fontFamily: "inherit",
            }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(186,12,47,0.7)")}
            onBlur={(e)  => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
          />
          <button
            type="submit"
            disabled={isSearching}
            style={{
              background: isSearching ? "#7f1d1d" : "#BA0C2F",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "9px 16px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.06em",
              cursor: isSearching ? "default" : "pointer",
              whiteSpace: "nowrap",
              fontFamily: "inherit",
              transition: "background 0.2s",
            }}
          >
            {isSearching ? "…" : "Am I In?"}
          </button>
        </form>

        {/* Status message */}
        {statusMsg && (
          <div
            className={`pointer-events-auto status-banner self-start px-3 py-2 rounded-lg text-sm font-medium border ${statusStyles[statusMsg.type]}`}
            style={{ backdropFilter: "blur(8px)", maxWidth: 420, fontSize: 13, lineHeight: 1.4 }}
          >
            {statusMsg.type === "success" && "✅ "}
            {statusMsg.type === "outside" && "📍 "}
            {statusMsg.type === "error" && "⚠️ "}
            {statusMsg.text}
            {statusMsg.type === "outside" && (
              <a
                href="https://mvp.sos.ga.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 underline opacity-80 hover:opacity-100"
              >
                Georgia MVP →
              </a>
            )}
          </div>
        )}
      </div>

      {/* ── LEGEND ── */}
      <div
        className="absolute z-10"
        style={{ bottom: 56, left: 12 }}
      >
        <button
          onClick={() => setLegend((v) => !v)}
          style={{
            background: "rgba(3,7,18,0.82)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 8,
            color: "#94a3b8",
            fontSize: 11,
            padding: "4px 10px",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            fontFamily: "inherit",
            marginBottom: 4,
            display: "block",
          }}
        >
          {legend ? "Hide" : "Show"} Legend
        </button>

        {legend && (
          <div
            style={{
              background: "rgba(3,7,18,0.88)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              padding: "10px 14px",
              backdropFilter: "blur(10px)",
              minWidth: 190,
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#64748b", marginBottom: 8, textTransform: "uppercase" }}>
              Map Legend
            </div>
            <LegendRow color="#BA0C2F" label="District 51 Boundary" />
            <LegendRow color="#22d3ee" label="Early Voting Location" pin />
            <LegendRow color="#ef4444" label="Election Day Precinct" pin />
          </div>
        )}
      </div>

      {/* ── FOOTER DISCLAIMER ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center gap-2 px-4 py-2"
        style={{ background: "rgba(3,7,18,0.9)", borderTop: "1px solid rgba(186,12,47,0.3)" }}
      >
        <span style={{ fontSize: 10, color: "#64748b", fontWeight: 500 }}>ⓘ</span>
        <span style={{ fontSize: 11, color: "#94a3b8", textAlign: "center" }}>
          Always verify your assigned precinct at{" "}
          <a
            href="https://mvp.sos.ga.gov/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#BA0C2F", fontWeight: 600, textDecoration: "none" }}
          >
            Georgia My Voter Page
          </a>
          {" "}· Precinct boundaries subject to change
        </span>
      </div>
    </>
  );
}

function LegendRow({ color, label, pin }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
      {pin ? (
        <svg width="12" height="16" viewBox="0 0 28 36">
          <path d="M14 0C6.268 0 0 6.268 0 14c0 9.941 14 22 14 22S28 23.941 28 14C28 6.268 21.732 0 14 0z" fill={color} />
          <circle cx="14" cy="14" r="5" fill="white" opacity="0.9" />
        </svg>
      ) : (
        <div style={{ width: 20, height: 3, borderRadius: 2, background: color, boxShadow: `0 0 6px ${color}` }} />
      )}
      <span style={{ fontSize: 12, color: "#cbd5e1" }}>{label}</span>
    </div>
  );
}
