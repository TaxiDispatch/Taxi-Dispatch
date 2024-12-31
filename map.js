var map = new maplibregl.Map({
      container: 'map',
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [8.5456, 47.3739],
      zoom: 9.5
});

map.on("load", () => {
      // Get route from Routing API
      let start = [11.393712, 47.259938],
        end = [11.430896, 47.28187];
      let url = new URL("https://maptoolkit.p.rapidapi.com/route");
      url.searchParams.append("point", `${start[1]},${start[0]}`);
      url.searchParams.append("point", `${end[1]},${end[0]}`);
      url.searchParams.append("routeType", "car");
      url.searchParams.append("rapidapi-key", "your-api-key");
      fetch(url)
        .then((r) => r.json())
        .then((route) => {
          let path = route.paths[0];
          // Add route polyline to map
          let coordinates = polyline.decode(path.points).map(c => c.reverse());
          console.log(coordinates);
          map.addLayer({
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: coordinates,
                },
              },
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#2a3561",
              "line-width": 5,
            },
          });
          // Add instruction markers with popup to map
          path.instructions.forEach((instruction) => {
            let $img = document.createElement("img");
            $img.src = "https://static.maptoolkit.net/sprites/maptoolkit/route-via.svg";
            $img.width = 12;
            $img.height = 12;
            $img.style["cursor"] = "pointer";
            new maplibregl.Marker({
              element: $img,
              anchor: "center",
            })
              .setLngLat(instruction.coordinate.reverse())
              .addTo(map)
              .setPopup(new maplibregl.Popup().setHTML(`<p>${instruction.text}</p>`));
          });
          // Add route end marker
          let $img = document.createElement("img");
          $img.src = "https://static.maptoolkit.net/sprites/maptoolkit/marker.svg";
          $img.width = 29;
          $img.height = 30;
          let marker = new maplibregl.Marker({
            element: $img,
            anchor: "bottom",
          })
            .setLngLat(coordinates[coordinates.length - 1])
            .addTo(map);
        });
    });
