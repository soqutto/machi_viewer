<template>
  <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h2>このサイトについて</h2>
        <ModalCloseButton bindedDialogName="aboutDialog"></ModalCloseButton>
      </div>
      <div class="modal-body">
        <h3>バージョン情報</h3>
        <p>
          まちビューア(β) Version {{this.$root.$data.version}} ({{this.$root.$data.buildDate}})
        </p>
        <h3>対応環境</h3>
        <h5>デスクトップ</h5>
        <p>
          Chrome, Firefox, Edge, Safari (いずれも最新版)
        </p>
        <h5>モバイル</h5>
          iOS 10.3, Android 5以降
        <p>
        </p>
        <h3>お問い合わせ</h3>
        <p>
          不具合の報告・その他各種お問い合わせにつきましては, お問い合わせフォームからお願いいたします。
        </p>
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
