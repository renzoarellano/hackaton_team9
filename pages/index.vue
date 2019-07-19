<template>
  <div class="home">
    <Header />
    <Login />
    <Footer />
  </div>
</template>

<script>
/*eslint-disable */
// @ is an alias to /src
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import Login from "~/components/Login.vue";

export default {
  name: "home",
  components: {
    Header,
    Login,
    Footer,
  }
};
</script>

<style>

</style>
