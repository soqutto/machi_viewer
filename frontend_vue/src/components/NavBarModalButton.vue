<template>
  <span class="modal-button">
    <button
      type="button"
      v-on:click="toggle"
      class="btn border border-dark"
      v-bind:class="{
          'btn-primary': buttonStyle == 'primary',
          'btn-light': buttonStyle == 'light',
          'active': this.$root.$data.state.modal[bindedDialogName].shown
      }"
      role="button">
      <template v-if="showIcon && biIconClassName">
        <i :class="biIconClassName"></i>
      </template>
      <template v-if="buttonLabel">
        {{buttonLabel}}
      </template>
    </button>
  </span>
</template>

<script>
export default {
  props: {
    showIcon: Boolean,
    biIconClassName: String,
    buttonStyle: String,
    buttonLabel: String,
    bindedDialogName: String
  },

  data () {
    return {
      state: this.$root.$data.state
    }
  },

  methods: {
    toggle: function (event) {
      this.$root.toggleDialogState(this.bindedDialogName)
    }
  }
}
</script>
