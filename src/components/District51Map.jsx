import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2VpdGhmb3JnYSIsImEiOiJjbW8yNGJ2dmcwZXhxMnFwczY2ZnJkMnl2In0.D0pur85wTOoOxkgp2R40cQ";

export default function District51Map() {
  const containerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-84.31, 34.025],
      zoom: 11.5,
    });
    return () => map.remove();
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
