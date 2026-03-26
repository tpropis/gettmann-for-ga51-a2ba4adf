/**
 * District 51 Community Issues Map
 * Built with MapLibre GL JS + CARTO free tiles (no token required)
 *
 * Architecture note: this component is intentionally self-contained so that
 * issue data can be swapped out from any source (Airtable, REST API, etc.)
 * without touching the map rendering logic. Feed new data via the
 * `issues` prop once you wire up a backend.
 */

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  Search,
  X,
  ChevronDown,
  ChevronUp,
  MapPin,
  AlertCircle,
  Layers,
  List,
  Navigation,
  Info,
} from "lucide-react";
import {
  issueData,
  CATEGORIES,
  CATEGORY_CONFIG,
  getPointsGeoJSON,
  getZonesGeoJSON,
  type Category,
  type IssueData,
  type IssueStatus,
} from "@/data/issueData";
import { district51GeoJSON } from "@/data/district51GeoJSON";

// ─── Configuration ────────────────────────────────────────────────────────────

const MAP_CENTER: [number, number] = [-84.376, 33.972];
const MAP_ZOOM = 12.2;

// OSM raster tiles — universally available, no auth, works from any origin.
// Using an inline StyleSpecification avoids fetching external style JSON.
const MAP_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  glyphs: "https://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: "osm-tiles",
      type: "raster",
      source: "osm",
      minzoom: 0,
      maxzoom: 22,
    },
  ],
};

// Nominatim geocoding (free, no key) — bounded to Sandy Springs area
const NOMINATIM_VIEWBOX = "-84.50,34.07,-84.26,33.85"; // left,top,right,bottom

// ─── Status Config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<IssueStatus, { bg: string; text: string; dot: string }> = {
  Critical: { bg: "#FEF2F2", text: "#DC2626", dot: "#DC2626" },
  Ongoing: { bg: "#FFF7ED", text: "#EA580C", dot: "#EA580C" },
  "In Progress": { bg: "#EFF6FF", text: "#2563EB", dot: "#2563EB" },
  Resolved: { bg: "#ECFDF5", text: "#059669", dot: "#059669" },
  Monitoring: { bg: "#F5F3FF", text: "#7C3AED", dot: "#7C3AED" },
};

// ─── Popup HTML Factory ───────────────────────────────────────────────────────

function buildPopupHTML(issue: IssueData): string {
  const cat = CATEGORY_CONFIG[issue.category];
  const st = STATUS_CONFIG[issue.status];
  return `
    <div class="cmap-popup-inner">
      <div class="cmap-popup-header" style="background:${cat.color}">
        <span class="cmap-popup-emoji">${cat.emoji}</span>
        <span class="cmap-popup-cat">${issue.category.toUpperCase()}</span>
        <span class="cmap-popup-type">${issue.type === "zone" ? "ZONE" : "ISSUE"}</span>
      </div>
      <div class="cmap-popup-body">
        <div class="cmap-popup-title-row">
          <h3 class="cmap-popup-area">${issue.areaName}</h3>
          <span class="cmap-popup-status" style="background:${st.bg};color:${st.text}">${issue.status}</span>
        </div>
        <p class="cmap-popup-issue">${issue.topIssue}</p>
        <p class="cmap-popup-summary">${issue.summary}</p>
        <div class="cmap-popup-card" style="border-left-color:${cat.color}">
          <div class="cmap-popup-card-label">Why Independents Care</div>
          <p class="cmap-popup-card-text">${issue.whyIndependentsCare}</p>
        </div>
        <div class="cmap-popup-card cmap-popup-card-angle">
          <div class="cmap-popup-card-label">Message Angle</div>
          <p class="cmap-popup-card-text cmap-popup-quote">&ldquo;${issue.suggestedMessageAngle}&rdquo;</p>
        </div>
        <div class="cmap-popup-footer">
          <span class="cmap-popup-sources">${issue.sourceCount} source${issue.sourceCount !== 1 ? "s" : ""}</span>
        </div>
      </div>
    </div>
  `;
}

// ─── Helper: polygon centroid ─────────────────────────────────────────────────

function centroid(coords: [number, number][]): [number, number] {
  const n = coords.length;
  return [
    coords.reduce((s, c) => s + c[0], 0) / n,
    coords.reduce((s, c) => s + c[1], 0) / n,
  ];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface FilterChipProps {
  category: Category;
  active: boolean;
  onToggle: (c: Category) => void;
}

function FilterChip({ category, active, onToggle }: FilterChipProps) {
  const cfg = CATEGORY_CONFIG[category];
  return (
    <button
      onClick={() => onToggle(category)}
      title={cfg.label}
      style={
        active
          ? { background: cfg.color, color: "#fff", borderColor: cfg.color }
          : { background: "#fff", color: "#6B7280", borderColor: "#E5E7EB" }
      }
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 whitespace-nowrap shadow-sm hover:shadow-md"
    >
      <span>{cfg.emoji}</span>
      <span className="hidden sm:inline">{cfg.label}</span>
    </button>
  );
}

interface IssuePanelCardProps {
  issue: IssueData;
  selected: boolean;
  onClick: () => void;
}

function IssuePanelCard({ issue, selected, onClick }: IssuePanelCardProps) {
  const cat = CATEGORY_CONFIG[issue.category];
  const st = STATUS_CONFIG[issue.status];
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 border-b border-gray-100 transition-all duration-150 hover:bg-gray-50 ${
        selected ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-sm flex-shrink-0">{cat.emoji}</span>
          <span
            className="text-[10px] font-bold uppercase tracking-wide flex-shrink-0"
            style={{ color: cat.color }}
          >
            {issue.category}
          </span>
          {issue.type === "zone" && (
            <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 uppercase tracking-wide">
              Zone
            </span>
          )}
        </div>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
          style={{ background: st.bg, color: st.text }}
        >
          {issue.status}
        </span>
      </div>
      <p className="text-sm font-semibold text-gray-900 font-heading leading-tight mb-0.5">
        {issue.areaName}
      </p>
      <p className="text-xs text-gray-500 leading-snug line-clamp-2">
        {issue.topIssue}
      </p>
    </button>
  );
}

// ─── No-Token Fallback ────────────────────────────────────────────────────────

function NoTokenMessage() {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-campaign-light to-white">
      <div className="text-center max-w-lg px-8 py-12">
        <div className="w-16 h-16 rounded-full bg-campaign-navy/10 flex items-center justify-center mx-auto mb-5">
          <MapPin size={32} className="text-campaign-navy/50" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-campaign-navy mb-3">
          Mapbox Token Required
        </h3>
        <p className="text-gray-600 mb-5 leading-relaxed">
          The interactive district map requires a Mapbox GL JS access token. Add
          the following to your{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">.env</code>{" "}
          file and restart the development server:
        </p>
        <code className="block bg-gray-900 text-green-400 px-5 py-3 rounded-lg text-sm font-mono text-left mb-5">
          VITE_MAPBOX_TOKEN=pk.eyJ1IjoieW91ci...
        </code>
        <p className="text-sm text-gray-500">
          Get a free token at{" "}
          <span className="text-campaign-navy font-medium">mapbox.com</span>.
          The free tier supports up to 50,000 map loads/month.
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CommunityMap() {
  // ── Refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const geocodeAbortRef = useRef<AbortController | null>(null);

  // ── State
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [activeCategories, setActiveCategories] = useState<Set<Category>>(
    new Set(CATEGORIES)
  );
  const [visibleIssues, setVisibleIssues] = useState<IssueData[]>(issueData);
  const [selectedIssue, setSelectedIssue] = useState<IssueData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidePanelOpen, setSidePanelOpen] = useState(true);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [issueCount, setIssueCount] = useState(issueData.length);

  // ── Map initialization
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const container = mapContainerRef.current;

    // Force explicit pixel dimensions before MapLibre reads them.
    // CSS percentage/flex heights can resolve to 0 at useEffect time;
    // reading from the parent and falling back to viewport math guarantees
    // a non-zero canvas size so WebGL actually renders tiles.
    const parent = container.parentElement;
    const w = parent?.clientWidth || window.innerWidth;
    const h = parent?.clientHeight || window.innerHeight - 130;
    if (w > 0) container.style.width = w + "px";
    if (h > 0) container.style.height = h + "px";

    // 15-second timeout so spinner never runs forever
    const loadTimeout = setTimeout(() => {
      setMapError(
        "Map took too long to load. Check your internet connection and try refreshing."
      );
    }, 15000);

    // Track whether the map's `load` event has fired yet
    let mapLoadFired = false;

    const map = new maplibregl.Map({
      container,
      style: MAP_STYLE,
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      minZoom: 10,
      maxZoom: 18,
      attributionControl: false,
    });

    // Only treat errors as fatal if they happen before the load event.
    // After load, tile-level 404s/network blips are non-fatal.
    map.on("error", (e) => {
      if (mapLoadFired) return;
      clearTimeout(loadTimeout);
      const msg = (e as { error?: { message?: string } }).error?.message || String(e);
      console.error("Map load error:", msg);
      setMapError(`Map failed to load. Check your internet connection and try refreshing.`);
    });

    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-right"
    );
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "bottom-right"
    );
    map.addControl(
      new maplibregl.ScaleControl({ unit: "imperial" }),
      "bottom-left"
    );

    map.on("load", () => {
      mapLoadFired = true;
      // Force the canvas to recompute its dimensions now that flex layout has settled
      map.resize();

      // ── District 51 boundary
      map.addSource("district51", {
        type: "geojson",
        data: district51GeoJSON as GeoJSON.FeatureCollection,
      });
      map.addLayer({
        id: "district-fill",
        type: "fill",
        source: "district51",
        paint: { "fill-color": "#1D3557", "fill-opacity": 0.04 },
      });
      map.addLayer({
        id: "district-outline",
        type: "line",
        source: "district51",
        paint: {
          "line-color": "#1D3557",
          "line-width": 2.5,
          "line-opacity": 0.65,
          "line-dasharray": [4, 2],
        },
      });
      map.addLayer({
        id: "district-label",
        type: "symbol",
        source: "district51",
        layout: {
          "text-field": "DISTRICT 51",
          "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          "text-size": 11,
          "text-letter-spacing": 0.15,
          "text-transform": "uppercase",
          "symbol-placement": "point",
        },
        paint: {
          "text-color": "#1D3557",
          "text-opacity": 0.45,
          "text-halo-color": "#ffffff",
          "text-halo-width": 2,
        },
      });

      // ── Issue polygon zones
      const zonesData = getZonesGeoJSON(new Set(CATEGORIES));
      map.addSource("issues-zones", {
        type: "geojson",
        data: zonesData as GeoJSON.FeatureCollection,
      });
      map.addLayer({
        id: "zones-fill",
        type: "fill",
        source: "issues-zones",
        paint: {
          "fill-color": ["get", "categoryColor"],
          "fill-opacity": 0.14,
        },
      });
      map.addLayer({
        id: "zones-outline",
        type: "line",
        source: "issues-zones",
        paint: {
          "line-color": ["get", "categoryColor"],
          "line-width": 2,
          "line-opacity": 0.7,
          "line-dasharray": [3, 2],
        },
      });

      // ── Issue point markers (with clustering)
      const pointsData = getPointsGeoJSON(new Set(CATEGORIES));
      map.addSource("issues-points", {
        type: "geojson",
        data: pointsData as GeoJSON.FeatureCollection,
        cluster: true,
        clusterMaxZoom: 13,
        clusterRadius: 45,
      });

      // Cluster circle
      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "issues-points",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["coalesce", ["to-number", ["get", "point_count"]], 0],
            "#1D3557",
            6,
            "#C43B3B",
            11,
            "#7F1D1D",
          ],
          "circle-radius": [
            "step",
            ["coalesce", ["to-number", ["get", "point_count"]], 0],
            22,
            6,
            28,
            11,
            34,
          ],
          "circle-stroke-width": 3,
          "circle-stroke-color": "#ffffff",
          "circle-opacity": 0.9,
        },
      });

      // Cluster count label
      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "issues-points",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          "text-size": 13,
        },
        paint: { "text-color": "#ffffff" },
      });

      // Individual point markers
      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "issues-points",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": ["get", "categoryColor"],
          "circle-radius": 11,
          "circle-stroke-width": 2.5,
          "circle-stroke-color": "#ffffff",
          "circle-opacity": 0.92,
        },
      });

      // ── Click: cluster → zoom in
      map.on("click", "clusters", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        if (!features.length) return;
        const clusterId = features[0].properties?.cluster_id;
        if (clusterId == null) return;
        const source = map.getSource("issues-points") as maplibregl.GeoJSONSource;
        source.getClusterExpansionZoom(clusterId as number).then((zoom) => {
          const geom = features[0].geometry as GeoJSON.Point;
          map.easeTo({ center: geom.coordinates as [number, number], zoom: zoom ?? 14 });
        }).catch(() => {/* ignore */});
      });

      // ── Click: unclustered point → popup
      map.on("click", "unclustered-point", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["unclustered-point"],
        });
        if (!features.length) return;
        const props = features[0].properties as IssueData & { categoryColor: string };
        const issue = issueData.find((d) => d.id === props.id);
        if (!issue) return;
        const geom = features[0].geometry as GeoJSON.Point;
        openPopup(issue, geom.coordinates as [number, number], map);
      });

      // ── Click: zone → popup at centroid
      map.on("click", "zones-fill", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["zones-fill"],
        });
        if (!features.length) return;
        const props = features[0].properties as IssueData;
        const issue = issueData.find((d) => d.id === props.id);
        if (!issue || !issue.polygonCoordinates) return;
        openPopup(issue, centroid(issue.polygonCoordinates), map);
      });

      // ── Cursor changes
      const hoverLayers = ["clusters", "unclustered-point", "zones-fill"];
      hoverLayers.forEach((layer) => {
        map.on("mouseenter", layer, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", layer, () => {
          map.getCanvas().style.cursor = "";
        });
      });

      // ── Update side panel on move
      const onMoveEnd = () => updateVisible(map);
      map.on("moveend", onMoveEnd);
      map.on("zoomend", onMoveEnd);

      clearTimeout(loadTimeout);
      setMapLoaded(true);
      updateVisible(map);
    });

    mapRef.current = map;

    // Resize canvas whenever the container size changes (e.g. side panel toggling)
    const resizeObserver = new ResizeObserver(() => {
      if (mapRef.current) mapRef.current.resize();
    });
    if (mapContainerRef.current) resizeObserver.observe(mapContainerRef.current);

    return () => {
      clearTimeout(loadTimeout);
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Sync category filters to map sources
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    const map = mapRef.current;

    const pSrc = map.getSource("issues-points") as maplibregl.GeoJSONSource | undefined;
    if (pSrc) pSrc.setData(getPointsGeoJSON(activeCategories) as GeoJSON.FeatureCollection);

    const zSrc = map.getSource("issues-zones") as maplibregl.GeoJSONSource | undefined;
    if (zSrc) zSrc.setData(getZonesGeoJSON(activeCategories) as GeoJSON.FeatureCollection);

    updateVisible(mapRef.current);
    setIssueCount(issueData.filter((i) => activeCategories.has(i.category)).length);
  }, [activeCategories, mapLoaded]);

  // ── Open popup helper
  function openPopup(
    issue: IssueData,
    coords: [number, number],
    map: maplibregl.Map
  ) {
    if (popupRef.current) {
      popupRef.current.remove();
      popupRef.current = null;
    }
    const popup = new maplibregl.Popup({
      closeButton: true,
      closeOnClick: false,
      maxWidth: "340px",
      className: "cmap-popup",
      offset: 14,
    })
      .setLngLat(coords)
      .setHTML(buildPopupHTML(issue))
      .addTo(map);

    popupRef.current = popup;
    setSelectedIssue(issue);

    popup.on("close", () => {
      setSelectedIssue(null);
      popupRef.current = null;
    });
  }

  // ── Update visible issues in side panel
  function updateVisible(map: maplibregl.Map) {
    const bounds = map.getBounds();
    if (!bounds) return;
    const visible = issueData.filter((issue) => {
      if (!activeCategories.has(issue.category)) return false;
      if (issue.type === "point" && issue.coordinates) {
        return bounds.contains(issue.coordinates as [number, number]);
      }
      if (issue.type === "zone" && issue.polygonCoordinates) {
        const c = centroid(issue.polygonCoordinates);
        return bounds.contains(c as [number, number]);
      }
      return false;
    });
    setVisibleIssues(visible);
  }

  // ── Category toggle
  const toggleCategory = useCallback((cat: Category) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        if (next.size === 1) return prev; // keep at least one
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  }, []);

  const toggleAllCategories = useCallback(() => {
    setActiveCategories((prev) =>
      prev.size === CATEGORIES.length
        ? new Set([CATEGORIES[0]])
        : new Set(CATEGORIES)
    );
  }, []);

  // ── Fly to issue
  const flyToIssue = useCallback(
    (issue: IssueData) => {
      if (!mapRef.current) return;
      let coords: [number, number];
      if (issue.type === "point" && issue.coordinates) {
        coords = issue.coordinates;
      } else if (issue.type === "zone" && issue.polygonCoordinates) {
        coords = centroid(issue.polygonCoordinates);
      } else {
        return;
      }
      mapRef.current.flyTo({ center: coords, zoom: Math.max(mapRef.current.getZoom(), 14.5), duration: 900 });
      openPopup(issue, coords, mapRef.current);
      setMobileSheetOpen(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // ── Geocode address search
  const handleGeocode = useCallback(async () => {
    const q = searchQuery.trim();
    if (!q || !mapRef.current) return;

    // First: check if query matches an issue
    const match = issueData.find(
      (i) =>
        i.areaName.toLowerCase().includes(q.toLowerCase()) ||
        i.topIssue.toLowerCase().includes(q.toLowerCase())
    );
    if (match) {
      flyToIssue(match);
      return;
    }

    // Otherwise: geocode via Nominatim (free, no key required)
    setIsGeocoding(true);
    if (geocodeAbortRef.current) geocodeAbortRef.current.abort();
    const controller = new AbortController();
    geocodeAbortRef.current = controller;

    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q + " Sandy Springs GA")}&format=json&limit=1&viewbox=${NOMINATIM_VIEWBOX}&bounded=0`;
      const res = await fetch(url, {
        signal: controller.signal,
        headers: { "Accept-Language": "en" },
      });
      const data = await res.json();
      if (data?.length) {
        const { lon, lat } = data[0];
        mapRef.current?.flyTo({ center: [parseFloat(lon), parseFloat(lat)], zoom: 15, duration: 1000 });
      }
    } catch (_) {
      // aborted or network error — silently ignore
    } finally {
      setIsGeocoding(false);
    }
  }, [searchQuery, flyToIssue]);

  // ── Filtered issue list
  const filteredIssues = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return visibleIssues.filter(
      (i) =>
        !q ||
        i.areaName.toLowerCase().includes(q) ||
        i.topIssue.toLowerCase().includes(q) ||
        i.summary.toLowerCase().includes(q)
    );
  }, [visibleIssues, searchQuery]);

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="absolute inset-0 flex overflow-hidden bg-gray-100">

      {/* ── Desktop Side Panel ──────────────────────────────────── */}
      <aside
        className={`hidden lg:flex flex-col flex-shrink-0 bg-white shadow-xl z-20 overflow-hidden transition-all duration-300 ${
          sidePanelOpen ? "w-[360px]" : "w-0"
        }`}
      >
        {/* Panel header */}
        <div className="flex-shrink-0 px-5 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-campaign-navy flex items-center justify-center">
                <MapPin size={13} className="text-white" />
              </div>
              <h2 className="font-heading text-sm font-bold text-campaign-navy uppercase tracking-wider">
                District 51 Issues
              </h2>
            </div>
            <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {filteredIssues.length} visible
            </span>
          </div>
          <p className="text-xs text-gray-400 pl-9">
            Sandy Springs · Fulton County, GA
          </p>
        </div>

        {/* Search bar */}
        <div className="flex-shrink-0 px-4 py-3 border-b border-gray-100">
          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search issues or address…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGeocode()}
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-campaign-navy/30 focus:border-campaign-navy/50 placeholder-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={13} />
                </button>
              )}
            </div>
            <button
              onClick={handleGeocode}
              disabled={isGeocoding}
              className="px-3 py-2 bg-campaign-navy text-white rounded-lg text-xs font-semibold hover:bg-campaign-navy/90 transition-colors disabled:opacity-50"
            >
              <Navigation size={13} />
            </button>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex-shrink-0 px-4 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Categories
            </span>
            <button
              onClick={toggleAllCategories}
              className="text-[10px] font-semibold text-campaign-navy/70 hover:text-campaign-navy underline underline-offset-2"
            >
              {activeCategories.size === CATEGORIES.length ? "Clear all" : "Select all"}
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <FilterChip
                key={cat}
                category={cat}
                active={activeCategories.has(cat)}
                onToggle={toggleCategory}
              />
            ))}
          </div>
        </div>

        {/* Issue list */}
        <div className="flex-1 overflow-y-auto">
          {filteredIssues.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400">
              <Info size={28} className="mb-2 opacity-40" />
              <p className="text-sm">No issues in current view</p>
              <p className="text-xs mt-1">Pan or zoom the map to explore</p>
            </div>
          ) : (
            filteredIssues.map((issue) => (
              <IssuePanelCard
                key={issue.id}
                issue={issue}
                selected={selectedIssue?.id === issue.id}
                onClick={() => flyToIssue(issue)}
              />
            ))
          )}
        </div>

        {/* Panel footer */}
        <div className="flex-shrink-0 px-5 py-3 border-t border-gray-100 bg-gray-50">
          <p className="text-[10px] text-gray-400 leading-relaxed">
            {issueCount} issues tracked across {CATEGORIES.length} categories.{" "}
            Data is updated regularly.{" "}
            <span className="font-medium text-campaign-navy/60">
              Sources on each card.
            </span>
          </p>
        </div>
      </aside>

      {/* ── Map area ────────────────────────────────────────────── */}
      <div className="flex-1 relative min-w-0 h-full">

        {/* Map canvas */}
        <div ref={mapContainerRef} className="absolute inset-0" />

        {/* Desktop: side panel toggle */}
        <button
          onClick={() => setSidePanelOpen((o) => !o)}
          className="hidden lg:flex absolute top-4 left-4 z-10 items-center gap-1.5 bg-white text-campaign-navy text-xs font-bold px-3 py-2 rounded-lg shadow-lg hover:shadow-xl border border-gray-200 transition-all"
          title={sidePanelOpen ? "Hide panel" : "Show panel"}
        >
          <List size={14} />
          {!sidePanelOpen && <span>Issues</span>}
        </button>

        {/* Desktop: floating filter chips */}
        <div className="hidden lg:block absolute top-4 right-4 z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFiltersVisible((v) => !v)}
              className="flex items-center gap-1.5 bg-white text-gray-600 text-xs font-bold px-3 py-2 rounded-lg shadow-lg border border-gray-200 hover:border-campaign-navy/30 transition-all"
            >
              <Layers size={13} />
              <span>Filter</span>
              {filtersVisible ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            </button>
          </div>
          {filtersVisible && (
            <div className="mt-2 flex flex-wrap gap-1.5 justify-end max-w-xs">
              {CATEGORIES.map((cat) => (
                <FilterChip
                  key={cat}
                  category={cat}
                  active={activeCategories.has(cat)}
                  onToggle={toggleCategory}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mobile: top bar */}
        <div className="lg:hidden absolute top-3 left-3 right-3 z-10 flex gap-2">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search issues or address…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGeocode()}
              className="w-full pl-8 pr-3 py-2.5 text-sm bg-white border border-gray-200 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-campaign-navy/30 placeholder-gray-400"
            />
          </div>
          {/* Issues list toggle */}
          <button
            onClick={() => setMobileSheetOpen((o) => !o)}
            className="flex-shrink-0 flex items-center gap-1 bg-campaign-navy text-white text-xs font-bold px-3 py-2.5 rounded-xl shadow-lg"
          >
            <List size={14} />
            <span className="tabular-nums">{filteredIssues.length}</span>
          </button>
        </div>

        {/* Mobile: filter strip */}
        <div className="lg:hidden absolute top-[60px] left-0 right-0 z-10 px-3 overflow-x-auto">
          <div className="flex gap-1.5 pb-1 w-max">
            {CATEGORIES.map((cat) => (
              <FilterChip
                key={cat}
                category={cat}
                active={activeCategories.has(cat)}
                onToggle={toggleCategory}
              />
            ))}
          </div>
        </div>

        {/* District badge */}
        <div className="absolute bottom-10 left-3 z-10 lg:bottom-6">
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-campaign-navy text-[10px] font-bold px-2.5 py-1.5 rounded-lg shadow-md border border-campaign-navy/15 uppercase tracking-wider">
            <span
              className="inline-block w-3 h-3 rounded-sm border border-campaign-navy/50"
              style={{ background: "rgba(29,53,87,0.08)" }}
            />
            District 51 Boundary
          </div>
        </div>
      </div>

      {/* ── Mobile Bottom Sheet ──────────────────────────────────── */}
      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 z-30 bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ${
          mobileSheetOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "70vh" }}
      >
        {/* Sheet handle */}
        <div
          className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100"
          onClick={() => setMobileSheetOpen(false)}
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-campaign-navy flex items-center justify-center">
              <MapPin size={11} className="text-white" />
            </div>
            <span className="font-heading text-sm font-bold text-campaign-navy uppercase tracking-wide">
              {filteredIssues.length} Issues Visible
            </span>
          </div>
          <X size={18} className="text-gray-400" />
        </div>

        {/* Mobile filter chips */}
        <div className="flex gap-2 px-4 py-3 overflow-x-auto border-b border-gray-100">
          {CATEGORIES.map((cat) => (
            <FilterChip
              key={cat}
              category={cat}
              active={activeCategories.has(cat)}
              onToggle={toggleCategory}
            />
          ))}
        </div>

        {/* Mobile issue list */}
        <div className="overflow-y-auto" style={{ maxHeight: "calc(70vh - 130px)" }}>
          {filteredIssues.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <p className="text-sm">No issues in current view</p>
            </div>
          ) : (
            filteredIssues.map((issue) => (
              <IssuePanelCard
                key={issue.id}
                issue={issue}
                selected={selectedIssue?.id === issue.id}
                onClick={() => flyToIssue(issue)}
              />
            ))
          )}
        </div>
      </div>

      {/* Mobile sheet backdrop */}
      {mobileSheetOpen && (
        <div
          className="lg:hidden fixed inset-0 z-20 bg-black/20"
          onClick={() => setMobileSheetOpen(false)}
        />
      )}

      {/* Loading / error state */}
      {!mapLoaded && (
        <div className="absolute inset-0 z-30 bg-campaign-light flex items-center justify-center">
          {mapError ? (
            <div className="text-center max-w-sm px-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={24} className="text-red-500" />
              </div>
              <p className="text-sm font-bold text-campaign-navy mb-2">Map failed to load</p>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{mapError}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-campaign-navy text-white text-xs font-semibold rounded-lg hover:bg-campaign-navy/90 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-campaign-navy/20 border-t-campaign-navy rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-campaign-navy/60 font-medium">
                Loading District 51 Map…
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CommunityMap;
