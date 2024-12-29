var map = new maplibregl.Map({
      container: 'map',
      style: 'https://github.com/maplibre/demotiles/blob/gh-pages/styles/osm-bright-gl-style/style.json', // stylesheet location
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
      terrain: {"source": "raster-dem-source", "exaggeration": 0.5}
});
