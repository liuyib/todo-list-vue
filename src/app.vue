<template>
  <div id="app">
    <div class="cover"></div>

    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./todo/header.vue";
import Footer from "./todo/footer.jsx";
import Todo from "./todo/todo.vue";

export default {
  components: {
    Header,
    Footer,
    Todo
  }
};
</script>

<style lang="stylus">
#app {
  position: relative;
  width: 100%;
  height: 100vh;
}

.cover {
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
