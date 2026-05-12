import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2VpdGhmb3JnYSIsImEiOiJjbW8yNGJ2dmcwZXhxMnFwczY2ZnJkMnl2In0.D0pur85wTOoOxkgp2R40cQ";

const DISTRICT_GEOJSON_URL =
  "https://gismaps.fultoncountyga.gov/arcgispub/rest/services/Elections/VotingDistrictsMapViewer_Public/MapServer/7/query?where=DISTRICT+%3D+%27051%27&outFields=*&f=geojson";

const EARLY_VOTING = [
  { name: "East Roswell Library", address: "2301 Holcomb Bridge Rd, Roswell, GA 30076" },
  { name: "Roswell Library", address: "115 Norcross St, Roswell, GA 30075" },
  { name: "North Fulton Service Center", address: "7741 Roswell Rd, Sandy Springs, GA 30350" },
  { name: "Sandy Springs Library", address: "395 Mount Vernon Hwy, Sandy Springs, GA 30328" },
  { name: "Johns Creek Environmental Campus", address: "8100 Holcomb Bridge Rd, Johns Creek, GA 30022" },
  { name: "Northeast Spruill Oaks Library", address: "9560 Spruill Rd, Johns Creek, GA 30022" },
  { name: "Robert F. Fulton Library at Ocee", address: "5090 Abbotts Bridge Rd, Johns Creek, GA 30005" },
  { name: "Alpharetta Branch Library", address: "10 Park Plaza, Alpharetta, GA 30009" },
  { name: "Fulton County HHS North", address: "4700 North Point Pkwy, Alpharetta, GA 30005" },
  { name: "Milton Library", address: "855 Mayfield Rd, Milton, GA 30009" },
];

const EARLY_HOURS = "Oct 13–30, 2026 · Mon–Fri 7AM–7PM";

const ELECTION_DAY = [
  { name: "Crabapple Middle School", address: "10900 Woodstock Rd, Roswell, GA 30075" },
  { name: "Temple Beth Tikvah", address: "9955 Coleman Rd, Roswell, GA 30075" },
  { name: "St. Andrews Catholic Church", address: "675 Riverside Rd, Roswell, GA 30075" },
  { name: "East Roswell Branch Library", address: "2301 Holcomb Bridge Rd, Roswell, GA 30076" },
  { name: "Elkins Pointe Middle School", address: "11290 Elkins Rd, Roswell, GA 30076" },
  { name: "Northwood Elementary", address: "10200 Wooten Rd, Roswell, GA 30076" },
  { name: "Mimosa Elementary School", address: "1550 Warsaw Rd, Roswell, GA 30076" },
  { name: "Crosspointe Community Church", address: "77 East Crossville Rd, Roswell, GA 30075" },
  { name: "Roswell High School", address: "11595 King Rd, Roswell, GA 30075" },
  { name: "Roswell Library", address: "115 Norcross St, Roswell, GA 30075" },
  { name: "North River Baptist Church", address: "12090 Hardscrabble Rd, Roswell, GA 30075" },
  { name: "Esther Jackson Elementary", address: "1400 Martin Rd, Roswell, GA 30076" },
  { name: "Johns Creek Environmental Campus", address: "8100 Holcomb Bridge Rd, Roswell, GA 30022" },
  { name: "Hillside Elementary School", address: "9250 Scott Rd, Roswell, GA 30076" },
  { name: "Mountain Park Community Building", address: "100 Lakeshore Dr, Mountain Park, GA 30075" },
];

const ELECTION_HOURS = "Nov 3, 2026 · 7AM–7PM";

// Merge into a unified location list with availability flags
const normalizeAddr = (s) => s.toLowerCase().replace(/\s+/g, " ").trim();
const LOCATION_MAP = new Map();
for (const loc of EARLY_VOTING) {
  const key = normalizeAddr(loc.address);
  LOCATION_MAP.set(key, { name: loc.name, address: loc.address, early: true, electionDay: false });
}
for (const loc of ELECTION_DAY) {
  const key = normalizeAddr(loc.address);
  if (LOCATION_MAP.has(key)) {
    LOCATION_MAP.get(key).electionDay = true;
  } else {
    LOCATION_MAP.set(key, { name: loc.name, address: loc.address, early: false, electionDay: true });
  }
}
const ALL_LOCATIONS = Array.from(LOCATION_MAP.values());

const COLOR_EARLY = "#3b82f6";   // blue
const COLOR_ELECTION = "#BA0C2F"; // red
const COLOR_BOTH = "#a855f7";    // purple

function pinColor(loc) {
  if (loc.early && loc.electionDay) return COLOR_BOTH;
  if (loc.early) return COLOR_EARLY;
  return COLOR_ELECTION;
}

function availabilityLabel(loc) {
  if (loc.early && loc.electionDay) return "Early Voting & Election Day";
  if (loc.early) return "Early Voting Only";
  return "Election Day Only";
}

function locationHours(loc) {
  if (loc.early && loc.electionDay) return `${EARLY_HOURS}<br/>${ELECTION_HOURS}`;
  if (loc.early) return EARLY_HOURS;
  return ELECTION_HOURS;
}

const BOUNDS = [
  [-84.45, 33.95],
  [-84.15, 34.10],
];

// Ray-casting point-in-polygon
function pointInPolygon(point, vs) {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const [xi, yi] = vs[i];
    const [xj, yj] = vs[j];
    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function pointInGeometry(point, geometry) {
  if (geometry.type === "Polygon") {
    return pointInPolygon(point, geometry.coordinates[0]);
  }
  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates.some((poly) => pointInPolygon(point, poly[0]));
  }
  return false;
}

async function geocode(query) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    query
  )}.json?access_token=${mapboxgl.accessToken}&proximity=-84.31,34.025&country=US&limit=1`;
  const res = await fetch(url);
  const data = await res.json();
  return data.features?.[0]?.center || null;
}

function popupHTML(loc) {
  const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    loc.address
  )}`;
  const avail = availabilityLabel(loc);
  return `
    <div class="cmap-popup">
      <div class="cmap-popup-header"><strong>${loc.name}</strong></div>
      <div class="cmap-popup-body">
        <div>${loc.address}</div>
        <div style="margin-top:8px;font-size:12px;font-weight:700;color:#003056;">Available for: ${avail}</div>
        <div style="margin-top:4px;font-size:11px;opacity:0.8;">${locationHours(loc)}</div>
        <a href="${dirUrl}" target="_blank" rel="noopener" style="display:inline-block;margin-top:10px;padding:6px 10px;background:#dbb04a;color:#003056;border-radius:4px;text-decoration:none;font-weight:600;font-size:12px;">Get Directions</a>
      </div>
    </div>
  `;
}

export default function District51Map() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const districtGeomRef = useRef(null);
  const searchMarkerRef = useRef(null);
  const [address, setAddress] = useState("");
  const [statusMsg, setStatusMsg] = useState(null); // {type:'in'|'out'|'err', text}
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-84.31, 34.025],
      zoom: 11.2,
      maxBounds: BOUNDS,
    });
    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

    map.on("load", async () => {
      // Load district boundary
      try {
        const res = await fetch(DISTRICT_GEOJSON_URL);
        const geojson = await res.json();
        if (geojson?.features?.length) {
          districtGeomRef.current = geojson.features[0].geometry;
          map.addSource("district51", { type: "geojson", data: geojson });
          map.addLayer({
            id: "district51-fill",
            type: "fill",
            source: "district51",
            paint: { "fill-color": "#BA0C2F", "fill-opacity": 0.12 },
          });
          map.addLayer({
            id: "district51-line",
            type: "line",
            source: "district51",
            paint: { "line-color": "#BA0C2F", "line-width": 2.5 },
          });
        }
      } catch (e) {
        console.error("Failed to load district boundary", e);
      }

      // Geocode and add pins (one per unique location)
      const addPin = async (loc) => {
        const center = await geocode(loc.address);
        if (!center) return;
        const popup = new mapboxgl.Popup({ offset: 18, className: "cmap-popup" }).setHTML(
          popupHTML(loc)
        );
        new mapboxgl.Marker({ color: pinColor(loc) }).setLngLat(center).setPopup(popup).addTo(map);
      };

      for (const loc of ALL_LOCATIONS) addPin(loc);
    });

    return () => map.remove();
  }, []);

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!address.trim()) return;
    setSearching(true);
    setStatusMsg(null);
    try {
      const center = await geocode(address);
      if (!center) {
        setStatusMsg({ type: "err", text: "Address not found. Try again." });
        setSearching(false);
        return;
      }
      const map = mapRef.current;
      map.flyTo({ center, zoom: 14, essential: true });
      if (searchMarkerRef.current) searchMarkerRef.current.remove();
      searchMarkerRef.current = new mapboxgl.Marker({ color: "#dbb04a" })
        .setLngLat(center)
        .addTo(map);

      const geom = districtGeomRef.current;
      if (geom && pointInGeometry(center, geom)) {
        setStatusMsg({ type: "in", text: "Welcome Neighbor! You are in District 51." });
      } else {
        setStatusMsg({ type: "out", text: "You are just outside the district." });
      }
    } catch (err) {
      setStatusMsg({ type: "err", text: "Search failed. Try again." });
    } finally {
      setSearching(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 80,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
      }}
    >
      <style>{`
        #map-container { position: absolute; top: 0; left: 0; right: 0; bottom: 0; }
        .mapboxgl-map { height: 100% !important; }
      `}</style>
      <div ref={containerRef} id="map-container" />

      {/* Search overlay */}
      <form
        onSubmit={handleSearch}
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 10,
          background: "rgba(0,48,86,0.95)",
          padding: 12,
          borderRadius: 8,
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
          maxWidth: 320,
          width: "calc(100% - 32px)",
        }}
      >
        <div style={{ color: "#dbb04a", fontWeight: 700, marginBottom: 4, fontSize: 14 }}>
          Am I in District 51?
        </div>
        <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 11, marginBottom: 8, lineHeight: 1.4 }}>
          Some locations are available for both Early Voting and Election Day. Click each pin for details.
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: 4,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "white",
              color: "#003056",
              fontSize: 14,
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={searching}
            style={{
              padding: "8px 14px",
              borderRadius: 4,
              border: "none",
              background: "#dbb04a",
              color: "#003056",
              fontWeight: 700,
              cursor: searching ? "wait" : "pointer",
              fontSize: 14,
            }}
          >
            {searching ? "..." : "Am I In?"}
          </button>
        </div>
        {statusMsg && (
          <div
            style={{
              marginTop: 10,
              padding: "8px 10px",
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 600,
              background:
                statusMsg.type === "in"
                  ? "#dbb04a"
                  : statusMsg.type === "out"
                  ? "#BA0C2F"
                  : "rgba(255,255,255,0.15)",
              color: statusMsg.type === "out" ? "white" : "#003056",
            }}
          >
            {statusMsg.text}
          </div>
        )}
        <div
          style={{
            marginTop: 10,
            padding: "8px 10px",
            borderRadius: 4,
            background: "#dbb04a",
            color: "#003056",
            fontSize: 12,
            fontWeight: 700,
            lineHeight: 1.4,
            textAlign: "center",
          }}
        >
          Always verify your assigned precinct at{" "}
          <a
            href="https://mvp.sos.ga.gov/s/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#003056", textDecoration: "underline", fontWeight: 800 }}
          >
            Georgia My Voter Page
          </a>
        </div>
      </form>

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 16,
          zIndex: 10,
          background: "rgba(0,48,86,0.95)",
          padding: 12,
          borderRadius: 8,
          color: "white",
          fontSize: 12,
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ fontWeight: 700, color: "#dbb04a", marginBottom: 6 }}>Legend</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ width: 12, height: 12, background: COLOR_EARLY, borderRadius: "50%", display: "inline-block" }} />
          Early Voting Only
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ width: 12, height: 12, background: COLOR_ELECTION, borderRadius: "50%", display: "inline-block" }} />
          Election Day Only
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ width: 12, height: 12, background: COLOR_BOTH, borderRadius: "50%", display: "inline-block" }} />
          Early + Election Day
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 16, height: 3, background: "#BA0C2F", display: "inline-block" }} />
          District 51 Boundary
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 10,
          color: "white",
          fontSize: 14,
          fontWeight: 600,
          padding: "10px 16px",
          background: "rgba(0,48,86,0.92)",
          borderTop: "2px solid #dbb04a",
        }}
      >
        Always verify your assigned precinct at{" "}
        <a
          href="https://mvp.sos.ga.gov/s/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#dbb04a", textDecoration: "underline", fontWeight: 700 }}
        >
          Georgia My Voter Page
        </a>
      </div>
    </div>
  );
}
