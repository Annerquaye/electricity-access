
mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5uZXJxdWF5ZSIsImEiOiJjbDN1OHN1NG4wZzZvM2ZuMHkyYzRybWY0In0.rfM8ZifOkxDoNJ3y39Q5HQ";
  var map = new mapboxgl.Map({
  container: "map",
  style:  "mapbox://styles/annerquaye/cl4kmaep3001r15mrdcppenn7",
  zoom: 1.15,
    maxZoom: 4,
    minZoom: 1,
    center: [3.158, 24.797],//[10.108, 35.221],
    // maxBounds: [
    //   [-180, 15],
    //   [-30, 72],
    // ],
  projection: "naturalEarth",
});


map.on('load', function () {
  // This is the function that finds the first symbol layer
  let layers = map.getStyle().layers;
  let firstSymbolId;
  for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === 'symbol') {
          firstSymbolId = layers[i].id;
          break;
      }
  }
  map.addLayer(
      {
        id: "power-outline",
        type: "line",
        source: {
          type: "geojson",
          data: "data/Power2019.geojson",
        },
        paint: {
          "line-color": "gray",
          "line-width": 0.9,
        },
      },
      "waterway-label" // Here's where we tell Mapbox where to slot this new layer
    );

  map.addLayer(
    {
      id: "power-access",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/Power2019.geojson",
      },
      minzoom: .5,
      paint: {
        "fill-color": [
            'interpolate',
            ['linear'],
            ['get', 'Access'],
            5,
            '#e93e3a',
            20,
            '#ed683c',
            40,
            '#f3903f',
            60,
            '#fdc70c',
            80,
            '#fff33b',
            100,
            '#FFEFBD',
          ],
        "fill-opacity": 0.8
      }
    }, 
    "power-outline"
    );
  
});

//Create the popup

map.on('click', 'power-access', function (e) {
  console.log("clicked...");
  var countryName = e.features[0].properties.Entity;
  var powerAccess = e.features[0].properties.Access;
    powerAccess = powerAccess.toFixed(1);

  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h2>' + countryName + '</h2>'
          + '<hr>' +
           '<h3>' + powerAccess + '% of the population had access to electricity in 2019.' + '</h3>')
      .addTo(map);
});
map.on('mouseenter', 'power-access', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'power-access', function () {
  map.getCanvas().style.cursor = '';
});

