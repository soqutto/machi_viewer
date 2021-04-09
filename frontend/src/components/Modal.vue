<template>
  <div v-show="isShown" class="modal-bg">
    <open-dialog v-show="this.state.modal.openDialog.isShown"></open-dialog>
    <help-dialog v-show="this.state.modal.helpDialog.isShown"></help-dialog>
  </div>
</template>

<script>
import OpenDialog from './OpenDialog'
import HelpDialog from './HelpDialog'

export default {
  components: {
    OpenDialog, HelpDialog
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
