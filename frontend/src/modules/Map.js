import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '../css/map.css'
import iconRetinaUrl  from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl        from 'leaflet/dist/images/marker-icon.png'
import shadowUrl      from 'leaflet/dist/images/marker-shadow.png'

import * as d3 from 'd3'
import * as topojson from 'topojson'

import TownParser from './TownParser'
import TownColorizer from './TownColorizer'
import TownCoordinate from './TownCoordinate'

const map = L.map("map").setView([35.6492, 139.5493], 13);

L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors<br>'
               +'<a href="https://geoshape.ex.nii.ac.jp/ka/" target="_blank">国勢調査町丁・字等別境界データセット(CODH)</a>',
  minZoom: 5,
  maxZoom: 18
}).addTo(map);

const citySvg = d3.select(map.getPanes().overlayPane).append("svg");

const main = async () => {
  await TownParser.load('./topojson.test/h27ka13208.topojson');
  await TownParser.parse();
  await TownColorizer.createTable(TownParser.city.getTownAreaList());
  await TownCoordinate.createTable(TownParser);
  createTownSvg();
}

function createTownSvg(){
  const geoJsonCity = topojson.feature(TownParser.json, TownParser.json.objects.city);
  const geoJsonTown = topojson.feature(TownParser.json, TownParser.json.objects.town);
  const transform = d3.geoTransform({point: projectPoint});
  const path = d3.geoPath().projection(transform);

  const cityGroup = citySvg.append("g").attr("class", "leaflet-zoom-hide").attr("id", "city");

  const cityFramePolygon = cityGroup.selectAll("path")
                           .data(geoJsonCity.features)
                           .enter()
                           .append("path");

  const townGroup = cityGroup.append("g").attr("class", "leaflet-zoom-hide").attr("id", "town");

  const townPolygons = townGroup.selectAll("path")
                       .data(geoJsonTown.features)
                       .enter()
                       .append("path");

  const townLabelGroup = cityGroup.append("g").attr("class", "leaflet-zoom-hide").attr("id", "town-label");
  const townSubAreaLabelGroup = cityGroup.append("g").attr("class", "leaflet-zoom-hide").attr("id", "townSubArea-label");

  const townLabels = townLabelGroup.selectAll("circle")
                     .data(Object.keys(TownCoordinate.getTownCenterPointTable()))
                     .enter()
                     .append("circle");
  
  const townSubAreaLabels = townSubAreaLabelGroup.selectAll("circle")
                            .data(Object.keys(TownCoordinate.getTownSubAreaCenterPointTable()))
                            .enter()
                            .append("circle");

  map.on("moveend", update);
  update();

  function projectPoint(x, y){
    const point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
  }

  function project(x, y){
    const point = map.latLngToLayerPoint(new L.LatLng(y, x));
    return [point.x, point.y];
  }

  function update(){
    const bounds = path.bounds(geoJsonCity);

    let topLeft = bounds[0], bottomRight = bounds[1];
    console.log(topLeft, bottomRight);

    citySvg.attr("width", bottomRight[0] - topLeft[0])
           .attr("height", bottomRight[1] - topLeft[1])
           .style("left", topLeft[0] + "px")
           .style("top", topLeft[1] + "px");

    cityFramePolygon.attr("d", path)
                    .style("fill", "none")
                    .attr("stroke", "#888888")
                    .attr("stroke-width", "4.0");

    cityGroup.attr("transform", "translate(" + -topLeft[0] + ","
                                                + -topLeft[1] + ")");

    townPolygons.attr("class", (d) => "town-" + d.properties.KCODE1)
                .attr("fill", (d) => {
                  const k = d.properties.KCODE1;
                  const normalizedTownId = TownParser.city.getTownById(k).getTownSubAreaById(k).id;
                  return TownColorizer.getColor(normalizedTownId);
                })
                .attr("stroke", "#666666")
                .attr("stroke-width", "1.4")
                .style("fill-opacity", 0.5)
                .attr("d", path);

    townLabels.attr("cx", (d) => project(...TownCoordinate.getTownCenterPoint(d))[0])
              .attr("cy", (d) => project(...TownCoordinate.getTownCenterPoint(d))[1])
              .attr("r", "10")
              .attr("fill", "#333333");

    townSubAreaLabels.attr("cx", (d) => project(...TownCoordinate.getTownSubAreaCenterPoint(d))[0])
                     .attr("cy", (d) => project(...TownCoordinate.getTownSubAreaCenterPoint(d))[1])
                     .attr("r", "3")
                     .attr("fill", "#666666");
  }

}

main();