<template>
  <div v-show="isShown" class="modal-bg">
    <getting-started v-show="this.state.modal.gettingStarted.isShown"></getting-started>
    <open-dialog v-show="this.state.modal.openDialog.isShown"></open-dialog>
    <setting-dialog v-show="this.state.modal.settingDialog.isShown"></setting-dialog>
    <help-dialog v-show="this.state.modal.helpDialog.isShown"></help-dialog>
    <about-dialog v-show="this.state.modal.aboutDialog.isShown"></about-dialog>
  </div>
</template>

<script>
import GettingStarted from './GettingStarted'
import OpenDialog from './OpenDialog'
import SettingDialog from './SettingDialog'
import HelpDialog from './HelpDialog'
import AboutDialog from './AboutDialog'

export default {
  components: {
    GettingStarted,
    OpenDialog,
    SettingDialog,
    HelpDialog,
    AboutDialog
  },

  data () {
    return {
      state: this.$root.$data.state
    }
  },

  computed: {
    isShown: function () {
      return this.state.modal.isShown
    }
  }
}
</script>

<style>
.modal-bg {
  z-index: 2;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  background-color: rgba(100, 100, 100, 0.7);
}

</style>
