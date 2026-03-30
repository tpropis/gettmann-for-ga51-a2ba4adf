/**
 * Georgia House District 51 – Boundary (GeoJSON)
 *
 * Source: Georgia General Assembly Legislative and Congressional Reapportionment
 * Office shapefiles, processed by the Metric Geometry and Gerrymandering Group
 * (MGGG) and published via the Sapora Report / Know-Your-House-District project.
 *
 * HD51 covers east Sandy Springs (Fulton County) and extends toward the
 * Sandy Springs / Dunwoody border area, east of GA-400.
 *
 * Representative: Josh McLaurin (D) — current incumbent
 * Challenger: Keith Gettmann
 *
 * ⚠️  For the most current official boundary after any future redistricting:
 *   • Georgia General Assembly: https://www.legis.ga.gov/districts
 *   • Fulton County GIS: https://gismaps.fultoncountyga.gov
 *   • Georgia GIO Data Hub: https://data-hub.gio.georgia.gov
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
        county: "Fulton / DeKalb",
        representative: "Josh McLaurin (D) — Challenger: Keith Gettmann",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [-84.26947, 34.02527],
            [-84.27259, 34.02461],
            [-84.27714, 34.02131],
            [-84.28620, 34.02101],
            [-84.29258, 34.02353],
            [-84.29608, 34.02517],
            [-84.30295, 34.02562],
            [-84.30739, 34.02463],
            [-84.31069, 34.02368],
            [-84.31457, 34.02236],
            [-84.31767, 34.02020],
            [-84.31249, 34.01799],
            [-84.30574, 34.01320],
            [-84.30874, 34.01048],
            [-84.31026, 34.00930],
            [-84.31323, 34.00821],
            [-84.31445, 34.00569],
            [-84.31976, 34.00456],
            [-84.32453, 34.00251],
            [-84.32860, 34.00057],
            [-84.33218, 34.00581],
            [-84.33298, 34.00891],
            [-84.33463, 34.01013],
            [-84.33820, 34.00908],
            [-84.34112, 34.00676],
            [-84.34436, 34.00407],
            [-84.34846, 34.00407],
            [-84.35043, 34.00158],
            [-84.35080, 33.99701],
            [-84.35158, 33.98917],
            [-84.35040, 33.98380],
            [-84.35065, 33.97944],
            [-84.35264, 33.97561],
            [-84.35630, 33.97397],
            [-84.35876, 33.97124],
            [-84.36533, 33.96299],
            [-84.36547, 33.95995],
            [-84.36460, 33.95532],
            [-84.36166, 33.95518],
            [-84.35769, 33.95629],
            [-84.35139, 33.95847],
            [-84.34782, 33.96329],
            [-84.34753, 33.96780],
            [-84.34672, 33.96637],
            [-84.34533, 33.96630],
            [-84.33933, 33.97005],
            [-84.33725, 33.97087],
            [-84.33472, 33.97005],
            [-84.32697, 33.96766],
            [-84.32284, 33.96726],
            [-84.32012, 33.96737],
            [-84.31709, 33.96613],
            [-84.31329, 33.96540],
            [-84.30982, 33.96393],
            [-84.30332, 33.96043],
            [-84.29982, 33.95934],
            [-84.29494, 33.95979],
            [-84.29065, 33.95825],
            [-84.28427, 33.95638],
            [-84.27902, 33.95700],
            [-84.27412, 33.95830],
            [-84.27250, 33.95884],
            [-84.26874, 33.96160],
            [-84.26575, 33.96463],
            [-84.25809, 33.96818],
            [-84.26085, 33.97070],
            [-84.26225, 33.97412],
            [-84.26160, 33.97720],
            [-84.26334, 33.98330],
            [-84.26308, 33.98659],
            [-84.26516, 33.98786],
            [-84.25984, 33.98990],
            [-84.25864, 33.99312],
            [-84.25857, 33.99838],
            [-84.25263, 34.00700],
            [-84.25184, 34.01068],
            [-84.25198, 34.01354],
            [-84.25206, 34.01682],
            [-84.25339, 34.02032],
            [-84.25295, 34.02345],
            [-84.25401, 34.02436],
            [-84.25945, 34.02388],
            [-84.26391, 34.02177],
            [-84.26907, 34.02132],
            [-84.26947, 34.02527],
          ],
        ],
      },
    },
  ],
};
