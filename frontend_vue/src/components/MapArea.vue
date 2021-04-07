<template>
  <div id="map-area">
    <Modal></Modal>
    <MapView></MapView>
  </div>
</template>

<script>
import MapView from './MapView.vue'
import Modal from './Modal.vue'

export default {
  components: {
    MapView, Modal
  }
}
</script>

<style>
#map-area {
  position: relative;
}
</style>
