<template>
    <div class="Pagorealizado">
        <div class="col-12">
            <div class="container">
                <div class="col-12" style="color:white; font-family:'muli_bold;'">
                    RESUMENT DE PAGO
                </div>
                <div class="col-12 text-center" style="margin-top;50px;padding-bottom:600px;">
                    <div class="col-12 color">
                        MONTO A PAGAR
                    </div>
                    <div class="col-12 color" style="margin-top:20px;">
                        1324 Soles
                    </div>
                    <div class="col-12 color" style="margin-top:20px;">
                        Tarjeta BBVA
                </div>    
                    <div class="col-12">
                    <label for="contrasena" class="label">Correo electrónico</label>
                    <input   type="email" class="input" v-model="correo">
                </div>
                <div class="col-12">
                    <button @click="hacerConfirmacion" type="button" class="btn btn-success">CONFIRMAR</button>
                </div>

                </div>
                 
                <div>
               
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/*eslint-disable */
// @ is an alias to /src
export default {
  name: "Pagorealizado",
  data(){
      return{
          correo:'',
      }
  },
  methods:{
      hacerConfirmacion(){
          this.$axios.$post('https://hackathonbbva-back.herokuapp.com/enviarCorreo', {
                    'correo':this.correo,
                    'mensaje':'Pago realizado con exito con monto: 1398 soles',       
                }).then(result => {
                    if(result.codigo == '1'){
                    this.$swal({
                        title:'Correo Enviado',
                        type: 'success'
                    }).then((result)=>{
                        if(result.value){
                            $nuxt.$router.push('/pagos');
                        }
                    });
                    }

                });
        }
  }
};
</script>
<style>
.color{
    color:white;
    font-family:'muli_bold';
    font-size: 25px;
}
</style>

