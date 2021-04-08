<template>
  <div id="wrapper" class="container min-vw-100 min-vh-100 no-gutters">
    <Header></Header>
    <NavBar></NavBar>
    <MapArea></MapArea>
    <Footer></Footer>
  </div>
</template>

<script>
import 'bootstrap'
import Header from './components/Header.vue'
import NavBar from './components/NavBar.vue'
import MapArea from './components/MapArea.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Header, NavBar, MapArea, Footer
  }
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.css';
@import 'bootstrap-icons/font/bootstrap-icons.css';

#wrapper {
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
}

</style>
