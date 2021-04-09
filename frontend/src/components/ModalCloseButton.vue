<template>
  <button @click="this.click" type="button" class="close" aria-label="close">
    <span aria-hidden="true">&times;</span>
  </button>
</template>

<script>
export default {
  props: {
    bindedDialogName: String
  },

  methods: {
    click: function () {
      this.$root.setDialogState(this.bindedDialogName, false)
    }
  }
}
</script>
