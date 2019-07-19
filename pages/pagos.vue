<template>
    <div class="pagos">
        <Header />
    <Footer /> 
    </div>
</template>
<script>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
export default {
    name:'pagos',
    components: {
    Header,
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
