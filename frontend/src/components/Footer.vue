<template>
  <footer id="footer" class="navbar-dark bg-dark d-flex justify-content-between">
    <div class="">
      &copy; 2021 tsuchiden
    </div>
    <div>
      ver. {{this.$root.$data.version}}
    </div>
  </footer>
</template>

<style scoped>
#footer {
  color: #fff;
  font-size: small;
}
</style>
