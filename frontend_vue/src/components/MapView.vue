<template>
  <div id="map"></div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  mounted () {
    const map = L.map('map').setView([35.6492, 139.5493], 13)
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      minZoom: 5,
      maxZoom: 18
    }).addTo(map)
  }
}
</script>

<style scoped>
#map {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
</style>
