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
          <li class="list-group-item list-group-item-info">
            <i class="bi-info-circle"></i>
            設定画面にて背景の地図をOpenStreetMap, 地理院地図(標準/淡色)の3種類から選べます。
          </li>
          <li class="list-group-item list-group-item-info">
            <i class="bi-info-circle"></i>
            設定画面にて町域グループ/町丁ラベルの表示/非表示が切り替えられます。<br>
            背景地図にすでに町域・町丁が表示されている場合に非表示にすると便利です。<br>
            表示が重い場合、ラベルを非表示にすると改善する場合があります。
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
