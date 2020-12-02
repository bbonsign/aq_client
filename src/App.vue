<template>
  <div id="app">
    <Main msg="OpenAQ" />
  </div>
</template>


<script>
import Main from "./components/Main.vue";

export default {
  name: "App",
  components: {
    Main,
  },
};
</script>


<style>
body {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  background-color: darkslategray;
  color: whitesmoke;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100%;
  margin-top: 60px;
  text-align: center;
}
</style>
