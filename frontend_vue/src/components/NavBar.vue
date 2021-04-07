<template>
  <nav class="container-fluid navbar d-flex bg-light">
    <div class="col-7">
      <span class="button">
        <a
          class="btn btn-light border border-dark"
          data-toggle="modal"
          data-target="#search-modal"
          role="button"
        >
          <i class="bi-folder2-open"></i>&nbsp;開く
        </a>
      </span>
      <span class="text"> ○○県○○市 </span>
    </div>
    <div class="col-sm-5 text-right">
      <a class="btn btn-light border border-dark" role="button">
        <i class="bi-gear"></i>&nbsp;設定
      </a>
      <a type="button" class="btn btn-light border border-dark" role="button">
        <i class="bi-question-circle"></i>&nbsp;ヘルプ
      </a>
      <a type="button" class="btn btn-light border border-dark" role="button">
        <i class="bi-info-circle"></i>このサイトについて
      </a>
    </div>
  </nav>
</template>
