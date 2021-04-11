<template>
  <nav class="container-fluid navbar d-flex bg-light">
    <div class="col-sm-6">
      <nav-bar-modal-button
        v-bind:show-icon="true"
        bi-icon-class-name="bi-folder2-open"
        button-style="primary"
        button-label="開く"
        binded-dialog-name="openDialog"></nav-bar-modal-button>
      <span class="text">{{this.$root.$data.state.data.cityName}}</span>
    </div>
    <div class="col-sm-6 text-right">
    <!--
      <nav-bar-modal-button
        v-bind:show-icon="true"
        bi-icon-class-name="bi-gear"
        button-style="light"
        button-label="設定"
        binded-dialog-name="settingDialog"></nav-bar-modal-button>
     -->
      <nav-bar-modal-button
        v-bind:show-icon="true"
        bi-icon-class-name="bi-question-circle"
        button-style="light"
        button-label="ヘルプ"
        binded-dialog-name="helpDialog"></nav-bar-modal-button>
      <nav-bar-modal-button
        v-bind:show-icon="true"
        bi-icon-class-name="bi-info-circle"
        button-style="light"
        button-label="このサイトについて"
        binded-dialog-name="aboutDialog"></nav-bar-modal-button>
    </div>
  </nav>
</template>

<script>
import NavBarModalButton from './NavBarModalButton'

export default {
  components: {
    NavBarModalButton
  }
}
</script>

<style scoped>
nav {
  border-bottom: 1px solid black;
}
</style>
