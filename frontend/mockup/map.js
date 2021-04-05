import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const map = L.map("map").setView([35.6492, 139.5493], 13);
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors',
  minZoom: 5,
  maxZoom: 18,
}).addTo(map);