<template>
    <div class="pagos">
    <Header />
    <Pagostemp />
    <Footer /> 
    </div>
</template>
<script>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import Pagostemp from "~/components/Pagostemp.vue";
export default {
    name:'pagos',
    components: {
    Header,
    Pagostemp,
    Footer,
  }
}
</script>

<style>
.np{
    padding-left:0px;
    padding-right: 0px;
}
</style>
