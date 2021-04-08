<template>
  <span class="modal-button">
    <a class="btn border border-dark"
       v-bind:class="{
          'btn-primary': buttonStyle == 'primary',
          'btn-light': buttonStyle == 'light'
          }" role="button">
      <template v-if="showIcon && biIconClassName">
        <i :class="biIconClassName"></i>
      </template>
      <template v-if="buttonLabel">
        {{buttonLabel}}
      </template>
    </a>
  </span>
</template>

<script>
export default {
  props: {
    showIcon: Boolean,
    biIconClassName: String,
    buttonStyle: String,
    buttonLabel: String
  }
}
</script>
