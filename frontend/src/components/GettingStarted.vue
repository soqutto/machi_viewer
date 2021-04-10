<template>
  <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h2>まちビューア(β)</h2>
        <ModalCloseButton bindedDialogName="gettingStarted"></ModalCloseButton>
      </div>
      <div class="modal-body">
        <h4>概要</h4>
        <p class="list-group-item list-group-item-light">
          このサービスでは、町丁ごとに色分けされた地図を自動で生成して表示します。
        </p>
        <h4>早速使ってみましょう！</h4>
        <div class="container">
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
          <li class="list-group-item list-group-item-info">
            詳しい使い方は
            <button type="button" class="btn btn-light border border-dark btn-sm">
              <i class="bi-question-circle"></i>ヘルプ
            </button>
            をクリックすることでご覧になれます。
          </li>
        </ul>
        </div>
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
