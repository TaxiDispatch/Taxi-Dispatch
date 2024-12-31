var map = new maplibregl.Map({
      container: 'map',
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [8.5456, 47.3739],
      zoom: 9.5
});

function getRoute(start, end) {
    const url = `https://router.project-osrm.org/route/v1/driving/${start.join(',')};${end.join(',')}?overview=full&geometries=geojson`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const routeCoordinates = data.routes[0].geometry.coordinates;

      // Check and remove existing route
      if (map.getSource('route')) {
        map.removeLayer('route');
        map.removeSource('route');

        // Add the route to the map
        map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: routeCoordinates
            }
          }
        });

        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {},
          paint: {
            'line-color': '#ff0000',
            'line-width': 4
          }
        });
      })
      .catch(error => console.error('Error fetching route:', error));
  }

  // Fetch and display the route
  map.on('load', function () {
    const start = [8.5456, 47.3739]; // Start coordinates
    const end = [8.5466, 47.3749];   // End coordinates
    getRoute(start, end);
  });
