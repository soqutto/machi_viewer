<template>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h2>まちビューア(β)</h2>
        <ModalCloseButton bindedDialogName="gettingStarted"></ModalCloseButton>
      </div>
      <div class="modal-body">
        <p>
          このサービスでは、町丁ごとに色分けされた地図を自動で生成して表示します。
        </p>
        <h4>早速使ってみましょう！</h4>
        <ul class="list-group">
          <li class="list-group-item">画面左上の[開く]ボタンをクリックし、色分け地図を見たい市町村を検索します。</li>
          <li class="list-group-item">検索結果に表示された各市町村の横に表示されている[開く]ボタンをクリックすることで、各市町村の色分け地図が画面上に表示されます。</li>
          <li class="list-group-item">地図は自由にスクロールおよび拡大縮小ができます。</li>
          <li class="list-group-item">詳しい使い方はヘルプをご覧ください。</li>
        </ul>
        <p>
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
