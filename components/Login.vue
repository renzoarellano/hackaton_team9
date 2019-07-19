<template>
    <div class="col-xs-12 np posSesion">
        <div class="container">
            <div class="row">
                <div v-if="showError" class="col-12 col-md-11 col-lg-7 np position-alert text-center">
                    <div class="alert alert-danger" role="alert">
                        <p>
                            <b>Porfavor corriga los siguientes errores: </b>
                            <li v-for="error in errors">{{ error }}</li>
                        </p>
                        <button class="btnCerrarErrores" @click="showError = false">
                             Cerrar ❌
                        </button>
                    </div>
                </div>
                <div class="login-wrap">
                    <div class="login-html">
                        <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Iniciar Sesión</label>
                        <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Registrate</label>
                        <div class="login-form">
                            <div class="sign-in-htm">
                                <form @submit="formLogin" autocomplete="off">
                                     <div class="group">
                                        <label for="tipo" class="label">Tipo de Documento</label>
                                        <select name="tipoDocumento" v-model="tipodocumento" @change="onChange"  id="tipo_documento" class="input">
                                            <option value="0" disabled selected>Seleccione un Tipo de Documento</option>
                                            <option value="dni">DNI</option>
                                            <option value="ruc">RUC</option>
                                        </select>
                                    </div>
                                    <div class="group">
                                        <label for="dni" class="label">Número de Documento</label>
                                        <input  v-model="dni" type="text" class="input" maxlength="8">
                                    </div>
                                    <div class="group">
                                        <label for="contrasena" class="label">Contraseña</label>
                                        <input id="contrasena" v-model="password" type="password" class="input" data-type="password">
                                    </div>
                                    <div class="group">
                                        <!--input type="submit" class="button" value="Iniciar"--->
                                        <button type="submit" class="button">Iniciar</button>
                                    </div>
                                </form>
                                <div class="hr"></div>
                               
                            </div>
                            <div class="sign-up-htm">
                                <form @submit="formRegistro" autocomplete="off">
                                    <div class="group">
                                        <label for="registroUsername" class="label">Nombres</label>
                                        <input id="registroUsername" v-model="registronombres" type="text" class="input">
                                    </div>
                                    <div class="group">
                                        <label for="registroUsername" class="label">Apellidos</label>
                                        <input  v-model="registroapellidos" type="text" class="input">
                                    </div>
                                    <div class="group">
                                        <label for="registroCorreo" class="label">Correo eléctronico</label>
                                        <input id="registroCorreo" v-model="registroemail" type="email" class="input">
                                    </div>
                                    <div class="group">
                                        <label for="tipo" class="label" >Tipo de Documento</label>
                                        <select name="tipoDocumento" v-model="registrotipodocumento" @change="getRegistrotipo" class="input">
                                            <option value="0" disabled selected>Seleccione un Tipo de Documento</option>
                                            <option value="dni">DNI</option>
                                            <option value="ruc">RUC</option>
                                        </select>
                                    </div>
                                    <div class="group">
                                        <label for="correo" class="label">Número de Documento</label>
                                        <input v-model="registrodni" type="text" class="input" maxlength="8">
                                    </div>
                                    <div class="group">
                                        <label for="registroContrasena" class="label">Contraseña (8 carácteres mínimo)</label>
                                        <input id="registroContrasena" v-model="registropassword" minlength="8" type="password" class="input" data-type="password">
                                    </div>
                                    <div class="group">
                                        <label for="registroRecontrasena" class="label">Repetir Contraseña </label>
                                        <input id="registroRecontrasena" v-model="registrorepassword" type="password" class="input" minlength="8">
                                    </div>
                                    <div class="group">
                                        <button type="submit" class="button">Registrar</button>
                                    </div>
                                </form>
                                <div class="hr"></div>
                                <div class="foot-lnk">
                                    <label for="tab-1">¿Ya eres miembro?</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
const Cookie = process.client ? require('js-cookie') : undefined
    export default {
        name: 'Login',
        data() {
            return {
                dni: '',
                password: '',
                registronombres: '',
                registrotipodocumento:'',
                registrodni:'',
                registroapellidos:'',
                registroemail: '',
                registropassword: '',
                registrorepassword: '',
                notificacionLogin: false,
                errors: [],
                showError: false,
                tipodocumento: '',
                tipoUsuario: {},
            };
        },
        mounted(){
            this.geolocate();
        },
        methods: {
             onChange(e) {
   
            this.tipodocumento = e.target.value;
        },
        getRegistrotipo(e) {
   
            this.registrotipodocumento = e.target.value;
        },
        formRegistro(e){
            e.preventDefault();
            this.errors=[];
            if(!this.registronombres){
               this.errors.push('Ingrese nombres y apellidos correctamente');
                this.showError = true;
            }else if(!this.validEmail(this.registroemail)){
                this.errors.push('Ingrese un correo electrónico válido');
                this.showError = true;
            }else if(!this.registropassword){
                this.errors.push('Ingrese una contraseña.');
                this.showError = true;
            }else if((this.registropassword != this.registrorepassword) || !this.registrorepassword){
                this.errors.push('Reingrese correctamente su contraseña.');
                this.showError = true;
            }else{
                this.$axios.$post('https://hackathonbbva-back.herokuapp.com/registro', {
                            'nombres': this.registronombres,
                            'apellidos': this.registroapellidos,
                            'correo': this.registroemail,
                            'password': this.registropassword,
                            'tipoDocumento':this.registrotipodocumento,
                            'documento':this.registrodni
                        })
                        .then((response)=> {
                            if(response.codigo == '1'){
                                const auth = {
                                dni: this.dni
                            }
                            console.log(auth);
                            $nuxt.$store.commit('setAuth', auth) // mutating to store for client rendering
                            Cookie.set('auth', auth) // saving token in cookie for server rendering
                            $nuxt.$router.push('/pagos')
                            }else if(response.codigo == '2'){
                                alert('Usuario ya registrado con anterioridad');
                            }
                        })
                        .catch((error) => {
                        });
                
            }
        },
        formLogin(e){
            e.preventDefault();
            this.errors=[] ;

            this.$axios.$post('https://hackathonbbva-back.herokuapp.com/login', {
                            'documento': this.dni,
                            'password': this.password,
                            'tipoDocumento': this.tipodocumento,
                            'ip': '138.125.5.96'
                        })
                        .then((response)=> {
                            if(response.codigo == '1'){
                                const auth = {
                                dni: this.dni
                            }
                            console.log(auth);
                            $nuxt.$store.commit('setAuth', auth) // mutating to store for client rendering
                            Cookie.set('auth', auth) // saving token in cookie for server rendering
                            $nuxt.$router.push('/pagos')
                            }
                        })
                        .catch((error) => {
                        });
        },  
        setPlace(place) {
        this.currentPlace = place;
        },
        addMarker() {
        if (this.currentPlace) {
            const marker = {
            lat: this.currentPlace.geometry.location.lat(),
            lng: this.currentPlace.geometry.location.lng()
            };
            this.markers.push({ position: marker });
            this.places.push(this.currentPlace);
            this.center = marker;
            this.currentPlace = null;
        }
        },
        geolocate: function() {
        navigator.geolocation.getCurrentPosition(position => {
            this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
            };
        });
        },
        validEmail: function(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
        },
        
    }
</script>

<style scoped>
    .modal {
        width: 500px;
        margin: 0px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px 3px;
        transition: all 0.2s ease-in;
        font-family: Helvetica, Arial, sans-serif;
    }
    .fadeIn-enter {
        opacity: 0;
    }
    .fadeIn-leave-active {
        opacity: 0;
        transition: all 0.2s step-end;
    }
    .fadeIn-enter .modal,
    .fadeIn-leave-active.modal {
        transform: scale(1.1);
    }
    button {
        padding: 7px;
        margin-top: 10px;
        background-color: green;
        color: white;
        font-size: 1.1rem;
    }
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #00000094;
        z-index: 999;
        transition: opacity 0.2s ease;
    }
    .position-alert {
        position: fixed;
        margin: auto;
        z-index: 999;
        top: 40%;
    }
    .btnCerrarErrores {
        background-color: transparent;
        outline: none;
        border: 1px solid rgba(66, 94, 179, 0.7);;
        font-family: 'muli_bold';
        padding: 10px 10px 10px 10px;
        font-size: 15px;
        color: rgba(66, 94, 179, 0.7);;
        border-radius: 20px;
    }
</style>
