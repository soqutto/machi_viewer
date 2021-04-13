<template>
  <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h2>
          <i class="bi-gear"></i>
            設定
        </h2>
        <ModalCloseButton bindedDialogName="settingDialog"></ModalCloseButton>
      </div>
      <div class="modal-body">
        <h3>地図設定</h3>
        <fieldset>
          背景に表示する地図を切り替えます。
          <div class="form-group indented">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="map-type"
                id="map-type-osm"
                value="osm"
                v-model="baseMapType"
              >
              <label class="form-check-label" for="map-type-osm">
                OpenStreetMap
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="map-type"
                id="map-type-gsi"
                value="gsi"
                v-model="baseMapType"
              >
              <label class="form-check-label" for="map-type-gsi">
                地理院地図(標準)
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="map-type"
                id="map-type-gsi-pale"
                value="gsi-pale"
                v-model="baseMapType"
              >
              <label class="form-check-label" for="map-type-gsi-pale">
                地理院地図(淡色)
              </label>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
import MapView from '@/modules/MapView'
import ModalCloseButton from './ModalCloseButton'

export default {
  components: {
    ModalCloseButton
  },

  data () {
    return {
      state: this.$root.$data.state
    }
  },

  computed: {
    baseMapType: {
      get () {
        return this.state.map.baseMapType
      },
      set (baseMapType) {
        this.state.map.baseMapType = baseMapType
        MapView.changeMap(baseMapType)
      }
    }

  }
}
</script>

<style scoped>
h3, h4, h5, h6 {
  border-bottom: 1px solid #aaa;
}
p {
  margin-bottom: 1rem;
}
div.indented {
  margin-left: 1rem;
}
</style>
