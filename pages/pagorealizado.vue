<template>
    <div class="pagorealizado">
       <Header/>
        <Pagorealizado/>
        <Footer/>
    </div>
</template>
<script>
// @ is an alias to /src
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import Pagorealizado from "~/components/Pagorealizado.vue";

export default {
  name: "home",
  components: {
    Header,
    Pagorealizado,
    Footer,
  }
};
</script>