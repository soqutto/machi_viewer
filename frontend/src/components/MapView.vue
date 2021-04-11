<template>
  <div id="map"></div>
</template>

<script>
// import {main} from '@/modules/Map.js'
import MapView from '@/modules/MapView'

export default {
  mounted () {
    MapView.attach('map')
    // main()
  }
}
</script>

<style scoped>
#map {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
