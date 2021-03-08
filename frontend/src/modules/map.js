import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '../css/map.css'
import iconRetinaUrl  from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl        from 'leaflet/dist/images/marker-icon.png'
import shadowUrl      from 'leaflet/dist/images/marker-shadow.png'

let map = L.map("map").setView([43.067, 141.35], 16);

L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 18
}).addTo(map);
