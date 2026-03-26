/**
 * Georgia House District 51 – Approximate Boundary (GeoJSON)
 *
 * Source basis: 2021 Georgia General Assembly Redistricting Plan (HB 1EX)
 * covering Sandy Springs / northern Fulton County.
 *
 * ⚠️  IMPORTANT: This polygon is an approximation for visualization purposes.
 * Replace with the official shapefile-derived GeoJSON from:
 *   • Georgia General Assembly: https://www.legis.ga.gov/districts
 *   • Fulton County GIS: https://gis.fultoncountyga.gov
 *   • Georgia's Official State GIS Portal: https://data.georgiaspatial.org
 *
 * The boundary follows major roads and the Chattahoochee River corridor
 * through Sandy Springs in Fulton County.
 */

export const district51GeoJSON = {
  type: "FeatureCollection" as const,
  features: [
    {
      type: "Feature" as const,
      properties: {
        district: "51",
        state: "GA",
        chamber: "House",
        fullName: "Georgia House District 51",
        city: "Sandy Springs",
        county: "Fulton",
        representative: "Keith Gettmann (Candidate)",
      },
      geometry: {
        type: "Polygon" as const,
        // Coordinates trace clockwise from NW corner.
        // Follows Chattahoochee River (W), Northridge Rd corridor (N),
        // Fulton/DeKalb county line (E), and I-285 corridor (S).
        coordinates: [
          [
            [-84.4498, 33.9603],
            [-84.4409, 34.0022],
            [-84.4280, 34.0182],
            [-84.4050, 34.0365],
            [-84.3840, 34.0435],
            [-84.3620, 34.0380],
            [-84.3510, 34.0335],
            [-84.3280, 34.0180],
            [-84.3135, 34.0050],
            [-84.3018, 33.9820],
            [-84.3010, 33.9565],
            [-84.3060, 33.9310],
            [-84.3189, 33.9115],
            [-84.3450, 33.8980],
            [-84.3810, 33.8950],
            [-84.4075, 33.9030],
            [-84.4291, 33.9211],
            [-84.4410, 33.9368],
            [-84.4498, 33.9603],
          ],
        ],
      },
    },
  ],
};
