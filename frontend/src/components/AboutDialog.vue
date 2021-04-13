<template>
  <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h2>
          <i class="bi-info-circle"></i>
          アプリについて
        </h2>
        <ModalCloseButton bindedDialogName="aboutDialog"></ModalCloseButton>
      </div>
      <div class="modal-body">
        <h3>バージョン情報</h3>
        <p>
          まちビューア(β) Version {{this.$root.$data.version}} ({{this.$root.$data.buildDate}})<br>
          &copy; tsuchiden (<a href="https://twitter.com/soqu__plusplus" target="_blank">@soqu__plusplus</a>)<br>
          <a href="https://github.com/soqutto/machi_viewer" target="_blank">GitHub</a>
        </p>
        <h3>対応環境</h3>
        <h5>デスクトップ</h5>
        <p>
          Chrome, Firefox, Edge, Safari (いずれも最新版)
        </p>
        <h5>モバイル</h5>
        <p>
          iOS 10.3, Android 5以降
        </p>
        <h3>利用データについて</h3>
        <p>
          <ul>
            <li>
              <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a>
              &copy; OpenStreetMap contributors
            </li>
            <li>
              <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">地理院地図 地理院タイル</a>
            </li>
            <li>
              <a href="https://geoshape.ex.nii.ac.jp/ka/" target="_blank">国勢調査町丁・字等別境界データセット</a>
              (CODH作成) <br>
              「平成27年国勢調査町丁・字等別境界データ」(NICT加工)
            </li>
          </ul>
        </p>
        <h3>おことわり</h3>
        <p>
          このWebアプリは開発中のものであり, <strong>無保証</strong>です.<br>
          作者は, 利用者がこのアプリを利用することによって生じた損害を補償いたしません.
        </p>
        <p>
          国勢調査の調査区をベースとしたデータを利用しているため, 実際に通用している町丁名とは異なる場合や,
          同じ町丁でも複数の区域に分割される場合があります.
          データの仕様によるものですので, あらかじめご了承ください.
        </p>
        <p>
          また, データを独自に構造化しているため, 一部の町丁が正しく表示されない場合があります. <br>
          住所の正確性を要する用途には利用せず, 参考程度にご利用ください. <br>
          不具合と思われる場合は, 以下のお問い合わせフォームからご報告いただけます.
        </p>
        <h3>お問い合わせ</h3>
        <p>
          不具合の報告・その他各種お問い合わせにつきましては,
          <a href="https://forms.gle/1qiWP5JsmgVJkfqQA" target="_blank">お問い合わせフォーム</a>
          からお願いいたします。
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

<style scoped>
h3, h4, h5, h6 {
  border-bottom: 1px solid #aaa;
}
p {
  margin-bottom: 1.5rem;
}
</style>
