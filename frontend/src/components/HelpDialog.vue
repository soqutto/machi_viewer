<template>
  <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h2>
          <i class="bi-question-circle"></i>
          ヘルプ
        </h2>
        <ModalCloseButton bindedDialogName="helpDialog"></ModalCloseButton>
      </div>
      <div class="modal-body">
        <ul class="list-group">
          <li class="list-group-item list-group-item-primary">
            画面左上の
            <button type="button" class="btn btn-primary btn-sm">
              <i class="bi-folder2-open"></i>開く
            </button>
            ボタンをクリックし、色分け地図を見たい市町村を検索します。
          </li>
          <li class="list-group-item list-group-item-primary">
            検索結果の各市町村に表示されている
            <button type="button" class="btn btn-primary btn-sm">
              開く
            </button>
            ボタンをクリックすることで、各市町村の色分け地図が画面上に表示されます。
          </li>
          <li class="list-group-item list-group-item-primary">
            地図は自由にスクロールおよび拡大縮小ができます。
          </li>
        </ul>
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
