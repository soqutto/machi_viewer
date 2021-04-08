<template>
  <div id="map"></div>
</template>

<script>
import {main} from '@/modules/Map.js'

export default {
  mounted () {
    main()
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
