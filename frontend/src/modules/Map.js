import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '../css/map.css'
import iconRetinaUrl  from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl        from 'leaflet/dist/images/marker-icon.png'
import shadowUrl      from 'leaflet/dist/images/marker-shadow.png'

import * as d3 from 'd3'
import * as topojson from 'topojson'

const map = L.map("map").setView([35.6492, 139.5493], 13);

L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> Contributors',
  maxZoom: 18
}).addTo(map);

const townSvg = d3.select(map.getPanes().overlayPane).append("svg");
const townSvgGroup = townSvg.append("g").attr("class", "leaflet-zoom-hide");

d3.json('./topojson.test/h27ka13208.topojson').then(createTownSvg);

function createTownSvg(tj){
  const gj = topojson.feature(tj, tj.objects.town);
  const transform = d3.geoTransform({point: projectPoint});
  const path = d3.geoPath().projection(transform);

  const townPolygons = townSvgGroup.selectAll("path")
                       .data(gj.features)
                       .enter()
                       .append("path");

  map.on("moveend", update);
  update();

  function projectPoint(x, y){
    const point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
  }

  function update(){
    const bounds = path.bounds(gj);

    let topLeft = bounds[0], bottomRight = bounds[1];
    console.log(topLeft, bottomRight);

    townSvg.attr("width", bottomRight[0] - topLeft[0])
           .attr("height", bottomRight[1] - topLeft[1])
           .style("left", topLeft[0] + "px")
           .style("top", topLeft[1] + "px");

    townSvgGroup.attr("transform", "translate(" + -topLeft[0] + ","
                                                + -topLeft[1] + ")");

    townPolygons.attr("d", path)
                .style("fill-opacity", 0.7)
                .attr("fill", "skyblue")
                .attr("stroke", "#aaaaaa")
                .attr("stroke-width", "1.4");
  }

}