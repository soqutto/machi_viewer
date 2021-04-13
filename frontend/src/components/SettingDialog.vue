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
        <h3>ラベル表示設定</h3>
        <p>
          町域グループ、町丁ラベルの表示/非表示が切り替えられます。<br>
          背景地図に丁番が表示されていて見づらいときはオフにしてください。
        </p>
        <div class="row">
          <div class="col">
            <fieldset>
              <div class="form-group indented">
                <label>町域グループラベル</label>
                <div class="form-check indented">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="show-townarea-label"
                    id="show-townarea"
                    value="true"
                    v-model="townLabelShow"
                  >
                  <label class="form-check-label" for="show-townarea">
                    表示する
                  </label>
                </div>
                <div class="form-check indented">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="show-townarea-label"
                    id="hide-townarea"
                    value="false"
                    v-model="townLabelShow"
                  >
                  <label class="form-check-label" for="hide-townarea">
                    表示しない
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
          <div class="col">
            <div class="form-group indented">
              <label>町丁ラベル</label>
              <div class="form-check indented">
                <input
                  class="form-check-input"
                  type="radio"
                  name="show-townsubarea-label"
                  id="show-townsubarea"
                  value="true"
                  v-model="townSubAreaLabelShow"
                >
                <label class="form-check-label" for="show-townarea">
                  表示する
                </label>
              </div>
              <div class="form-check indented">
                <input
                  class="form-check-input"
                  type="radio"
                  name="show-townsubarea-label"
                  id="hide-townsubarea"
                  value="false"
                  v-model="townSubAreaLabelShow"
                >
                <label class="form-check-label" for="hide-townarea">
                  表示しない
                </label>
              </div>
            </div>
          </div>
        </div>
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
    },
    townLabelShow: {
      get () {
        return this.state.map.showTownLabel ? 'true' : 'false'
      },
      set (bool) {
        this.state.map.showTownLabel = bool === 'true'
        if (this.state.map.townIsShown) MapView.drawer.drawUpdate()
      }
    },
    townSubAreaLabelShow: {
      get () {
        return this.state.map.showTownSubAreaLabel ? 'true' : 'false'
      },
      set (bool) {
        this.state.map.showTownSubAreaLabel = bool === 'true'
        if (this.state.map.townIsShown) MapView.drawer.drawUpdate()
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
