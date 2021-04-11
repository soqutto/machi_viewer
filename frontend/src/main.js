// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMq from 'vue-mq'
import App from './App'
// import router from './router'

import AppStateStore from '@/modules/AppStateStore'
import JSONDataStore from '@/modules/JSONDataStore'
import TownParser from '@/modules/TownParser'
import TownCoordinate from '@/modules/TownCoordinate'
import TownColorizer from '@/modules/TownColorizer'
import MapView from '@/modules/MapView'

Vue.observable(AppStateStore)

Vue.config.productionTip = false

Vue.use(VueMq, {
  breakpoints: {
    sp: 480,
    md: 720,
    pc: Infinity
  },
  defaultBreakpoint: 'sp'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  components: { App },
  template: '<App/>',

  data () {
    return {
      version: AppStateStore.version,
      buildDate: AppStateStore.buildDate,
      state: AppStateStore.state
    }
  },

  methods: {
    setDialogState: function (dialogName, bool) {
      AppStateStore.setDialogState(dialogName, bool)
    },
    toggleDialogState: function (dialogName) {
      AppStateStore.toggleDialogState(dialogName)
    },
    openCity: async function (cityId) {
      await MapView.reset()
      const json = await JSONDataStore.load(cityId)
      await TownParser.parse(json)
      await TownCoordinate.createTable(TownParser)
      await TownColorizer.createTable(TownParser.city.getTownAreaList())
      MapView.fitBounds(TownParser.city.latLngBounds)
      await MapView.draw()
    }

  }
})
