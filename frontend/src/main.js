// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMq from 'vue-mq'
import App from './App'
// import router from './router'

import AppStateStore from './modules/AppStateStore'
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
    }

  }
})
