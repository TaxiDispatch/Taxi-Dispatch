var map = new maplibregl.Map({
      container: 'map',
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [8.5456, 47.3739],
      zoom: 9.5
});

// Make sure to create a MapLibreGlDirections instance only after the map is loaded
map.on("load", () => {
  // Create an instance of the default class
  const directions = new MapLibreGlDirections(map);
      serviceUrl: "https://router.project-osrm.org/route/v1"

  // Enable interactivity (if needed)
  directions.interactive = true;

  // Optionally add the standard loading-indicator control
  map.addControl(new LoadingIndicatorControl(directions));

  // Set the waypoints programmatically
  directions.setWaypoints([
    [-73.8271025, 40.8032906],
    [-73.8671258, 40.82234996],
  ]);

  // Remove waypoints
  directions.removeWaypoint(0);

  // Add waypoints
  directions.addWaypoint([-73.8671258, 40.82234996], 0);

  // Remove everything plugin-related from the map
  directions.clear();
});
