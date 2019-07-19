<template>
    <div class="pagostemp" style="padding-top:80px;">
        <div class="container">
           <div class="row">
            <div class="col-12 col-md-6 np estiloName">
                    Bienvenido, <span class="estiloNombre">{{datosCliente.nombres}} {{datosCliente.apepaterno}}</span>    
            </div>

            <div class="col-12 col-md-12 np">
               <div class="row">
                    <div class="estiloDNI col-6 ">
                    DNI: <span class="estiloDNI">{{datosCliente.numdoc}}</span>
                </div>
                <div class="col-6 text-right estiloPregunta">
                   ¿Desea realizar un pago externo? <input type="text" v-model="numsuministrado" name="numsuministrado" id="numsuministrado" placeholder="Ingrese Cód. Suministro"> <button @click="agregarSuministro" type="button" class="btn btn-success">Ingresar</button>
                </div>
                <div class="col-12 col-md-8 np text-center" style="margin-top:50px; margin-bottom:600px;">
                    <div class="col estiloTitulo">
                        LISTA DE PAGOS
                    </div>
                        <table class="table table-hover">
                            
                        <thead> 
                            <tr>
                            <th scope="col" style="font-family:'muli_bold';"># de suministro</th>
                            <th scope="col" style="font-family:'muli_bold';">Entidad</th>
                            <th scope="col" style="font-family:'muli_bold';">Monto</th>
                            <th scope="col" style="font-family:'muli_bold';">¿Desea Pagar?</th>
                            </tr>
                        </thead>
                       
                        <tbody>
                            <tr v-for="pago in pagos" :key="pago.numerosuministro">
                            <th scope="row">{{pago.numerosuministro}}</th>
                            <td>{{pago.entidad}}</td>
                            <td>{{pago.monto}}</td>
                            <td><input class="form-check-input" type="checkbox" v-model="seleccionPagos" :value="pago.numerosuministro" id="defaultCheck1"></td>
                            </tr>
                        </tbody>
                        <div class="col montoTotal">
                            Monto total a pagar: <span class="estiloMonto">{{montoTotal}}</span>
                        </div>
                      
                        </table>
                        <div class="col-12 text-right">
                            Seleccionar Todos <input type="checkbox" @click="selectAll" v-model="allSelected">
                        </div>
                          <div class="col-12 text-right" style="margin-top:20px;">
                            <button @click="hacerPago" type="button" class="btn btn-success">Hacer pago</button>
                        </div>
                </div>
                <div class="col-12 col-md-4 np" style="margin-top:50px;">
                    <div class="col-12 text-center">
                        <div class="row">
                            <div class="col-6 tituloGeneral">
                            Tarjetas
                        </div>
                        <div class="col-6">
                            <button @click="agregarTarjeta" type="button" class="btn btn-warning">Agregar Tarjeta</button>
                        </div>
                        </div>
                    </div>
                    <div v-for="tarjeta in tarjetas" :key="tarjeta.numero" class="card" style="width:100%; background-color: rgba(66, 94, 179, 0.6); margin-top:20px;" >
                    <div class="card-body col-12">
                       <div class="row">
                        <div class="col-8 np text-center">
                        <b-form-radio style="color:white;" v-model="eliminarSelected" :value="tarjeta.numtarjeta">{{tarjeta.numtarjeta}}</b-form-radio>
                        <div class="col" style="font-family:'muli_bold';">
                             Tipo: <span style="font-family:'muli_bold';color:white;">{{tarjeta.descripcion}}</span>
                        </div>
                        <div class="col" style="font-family:'muli_bold';">
                            Banco: <span style="font-family:'muli_bold';color:white;">{{tarjeta.banco}}</span>
                        </div>
                        </div>
                        <div class="col-4">
                            <img :src="tarjeta.url_image" alt="Tarjeta de algun banco" width="100%">
                        </div>
                       </div>
                    </div>
                    </div>
                     <div class="col-12 np text-right" style="margin-top:20px;">
                            <button @click="eliminarTarjetas" type="button" class="btn btn-danger">Eliminar Tarjeta(s)</button>
                        </div>
                </div>

               </div>
            </div>
           </div>

        </div>
    </div>
</template>
<script>
export default {
    name:'Pagostemp',
    data(){
        return{
            dniSeteado:'',
            tipoDocumentosetado:'',
            datosCliente:[],
            pagos:[],
            montoTotal :0,
            seleccionPagos:[],
            eliminarSelected:'',
            allSelected:false,
            seleccionPago:'',
            tarjetas:[],
        }
    },
    methods:{
        agregarTarjeta(){
           
        },
        eliminarTarjetas(){

        },
        selectAll(){
            this.allSelected = true;
            for(var j =0 ; j<this.pagos.length ; j++){
                this.seleccionPagos.push(this.pagos[j].numerosuministro);
            }
            console.log(this.seleccionPagos);
        },
        hacerPago(){
            this.$swal({
                title:'Pago realizado',
                text: 'Monto total:' +this.montoTotal,
                type: 'success'
            }).then((result)=>{
                if(result.value){
                    $nuxt.$router.push('/pagorealizado');
                }
            });
            
        },
        agregarSuministro(){
            
        }
        
    },
    created(){
       let datos = this.$store.getters.loggeIn;
        //console.log(datos);
       this.dniSeteado = datos.dni;
       this.tipoDocumentosetado = datos.tipoDocumento;
       Promise.all([datos]).then((vals) => {
                this.$axios.$post('https://hackathonbbva-back.herokuapp.com/pagos', {
                    'documento':this.dniSeteado,
                    'tipoDocumento':this.tipoDocumentosetado,
                    'ip': '168.128.35.75'
                    
                }).then(result => {
                    this.datosCliente = result.datosCliente[0];
                    this.pagos = result.pagos;

                    var montoT = 0;
                    for(var i=0; i< this.pagos.length; i++){
                        montoT = montoT+ parseFloat(this.pagos[i].monto);
                        //console.log(montoT);
                    }
                    this.montoTotal = montoT;

                });
            });

            Promise.all([datos]).then((vals) => {
                this.$axios.$post('https://hackathonbbva-back.herokuapp.com/tarjetasAsociadas', {
                    'documento':this.dniSeteado,
                    'tipoDocumento':this.tipoDocumentosetado,
                    'ip': '168.128.35.75'
                    
                }).then(result => {
                    this.tarjetas = result;

                });
            });
       //console.log(this.dniSeteado);
    },
    mounted(){
        let datos = this.$store.getters.loggeIn;
        if(datos.dni == undefined){
            $nuxt.$router.push('/');
        }
    },
    
}
</script>
<style>
.estiloName{
    color: white;
    font-family: 'muli_bold';
    font-size: 18px;
}
.np{
    padding-left: 0px;
    padd.ing-right: 0px;
}
.estiloDNI{
    color: white;
    font-family: 'muli_bold';
    font-size: 18px;
}
.estiloNombre{
    color: white;
    font-family: 'muli_bold';
    font-size: 20px;
}
.estiloPregunta{
    color: white;
    font-family: 'muli_bold';
    font-size: 18px;
}

.estiloMonto,.montoTotal{
    color:white;
    font-family: 'muli_bold';
    font-size: 22px;
}   
.estiloTitulo{
    color: white;
    font-family:'muli_bold';
    font-size:23px;
}
</style>

