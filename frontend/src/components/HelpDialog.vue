<template>
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h2>sample content</h2>
        <ModalCloseButton bindedDialogName="helpDialog"></ModalCloseButton>
      </div>
      <div class="modal-body">
        <h3>sample section</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet labore harum eum, autem, blanditiis esse a, possimus exercitationem aspernatur ut repudiandae! Totam quasi maiores, culpa et commodi incidunt. Impedit, dignissimos.</p>
        <h3>sample section</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet labore harum eum, autem, blanditiis esse a, possimus exercitationem aspernatur ut repudiandae! Totam quasi maiores, culpa et commodi incidunt. Impedit, dignissimos.</p>
      </div>
    </div>
  </div>
</template>

<script>
import ModalCloseButton from './ModalCloseButton'

export default {
  components: {
    ModalCloseButton
  }
}
</script>
