<template>
	<div class="p-grid crud-demo">
		<div class="p-col-12">
            <Toast/>
				<Toolbar class="p-mb-4">
					<template v-slot:left>
						<Button :label="cambiarLabelListaClientes" icon="pi pi-plus" :class="cambiarEstiloListaClientes" @click="mostrarListaClientes" />
					</template>
                    <template v-slot:right v-if="muestraListaClientes">
                        <label for="texto"><p><strong>Lista clientes    :</strong></p></label>
                        <Dropdown id="statusBoleta" v-on:change="getClientePorIdEventChange(cliente_id)" v-model="cliente_id" :options="clientesResumido" optionLabel="text" optionValue="value" placeholder="Select One" required="true" :class="{'p-invalid': !cliente_id}"></Dropdown>
                    </template>
				</Toolbar>
            <div class="p-grid p-fluid">
                <div class="p-col-3 p-md-3">
                    <div class="p-field">
                        <label for="cliente.codigoCliente" style="text-align:center">Codigo Cliente</label>
                        <InputText disabled="true" :value="cliente.codigoCliente" style="text-align:center" />
                    </div>
                </div>
                <div class="p-col-3 p-md-3">
                    <div class="p-field">
                        <label for="cliente.nombreCliente" style="text-align:center" >Nombres</label>
                        <InputText disabled="true" :value="cliente.nombreCliente" style="text-align:center" />
                    </div>
                </div>
                <div class="p-col-3 p-md-3">
                    <div class="p-field">
                        <label for="cliente.apellidoCliente" style="text-align:center">Apellidos</label>
                        <InputText disabled="true" :value="cliente.apellidoCliente" style="text-align:center" />
                    </div>
                </div>
                <div class="p-col-3 p-md-3">
                    <div class="p-field">
                        <label for="cliente.dniCliente" style="text-align:center">DNI</label>
                        <InputText disabled="true" :value="cliente.dniCliente" style="text-align:center" />
                    </div>
                </div>
            </div>
		</div>
	</div>
    <div class="p-grid crud-demo" v-if="muestraListaClientes">
        <div class="p-col-12">
            <div>
                <Toast/>
                <Toolbar class="p-mb-4">
                    <template v-slot:left >
                        <h5><strong>Contrato : </strong><strong>{{ codigoNuevoContrato }}</strong></h5>
                    </template>
                <template v-on:validacion="metodoValidacion">
                    {{validacion}}
                </template>
                </Toolbar>
                <ContratoDetalle  
                :deshabilitar ="muestraListaClientes && !desbloquearBoton && !editar"
                :CodContrato="codigoNuevoContrato"
                :IdClient="cliente_id"
                :cadena ="contratoDetalles"
                v-on:validacion="metodoValidacion"
                />   
            </div>
        </div>
    </div>
    <div class="p-grid crud-demo" v-if="muestraListaClientes">
        <div class="p-col-12">
            <div>
                <Toast/>
                <Toolbar class="p-mb-4">
                    <template v-slot:left>
                        <Button label="Lista de Boletas" icon="pi pi-bars" :class="CambiarEstiloListaBoletas" @click="cambiarMostrarListaBoleta" :disabled="muestraListaClientes && !desbloquearBoton && !editar"/>
                        <Button label="Detalle de Boleta" icon="pi pi-bars" :class="CambiarEstiloDetalleBoletas"  :disabled="muestraListaClientes && desbloquearBoton "/>
                    </template>
                <template v-on:validacion="metodoValidacion">
                    {{validacion}}
                </template>
                </Toolbar>
                <BoletaLista 
                v-if="mostrarListaBoleta"
                :deshabilitar ="muestraListaClientes && !desbloquearBoton"
                :boletas ="boletas"
                :cliente="cliente"
                v-on:boleta="unpack"
                />
                <BoletaDetalle  
                v-if="mostrarDetalleBoleta"
                :editar="editar"
                :deshabilitar ="muestraListaClientes && !desbloquearBoton"
                :boleta ="boleta"
                />
            </div>
        </div>
    </div>
</template>

<script>
class Cliente {
  constructor( statusCliente = '',codigoCliente = '',nombreCliente = '' ,apellidoCliente = '',dniCliente = '',correoCliente = '',fechaCreacionCliente = '',direccionCliente = {departamento : '',provincia : '',distrito : '',programa : '',mzlt : ''}) {

    this.statusCliente = statusCliente;
	this.codigoCliente = codigoCliente;
	this.nombreCliente = nombreCliente;
    this.apellidoCliente = apellidoCliente;
    this.dniCliente = dniCliente;
    this.correoCliente = correoCliente;
    this.fechaCreacionCliente = fechaCreacionCliente;
    this.direccionCliente = direccionCliente;
  }
}

import BoletaDetalle  from './BoletaDetalle'
import BoletaLista  from './BoletaLista'
import ContratoDetalle from '../contrato/ContratoDetalle'
import axios from 'axios';
export default {
    components: {
        BoletaDetalle,
        ContratoDetalle,
        BoletaLista,
    },
    props:{
        dataCliente: Object
    },
    data() {
        return {
            estados: [
				{ value: 'Activo', text: 'Activo' },
				{ value: 'Inactivo', text: 'Inactivo' }
            ],
            mostrarListaBoleta: true,//se usa
            mostrarDetalleBoleta: false,

            editar:false,
            desbloquearBoton: false,
            cliente_id: '',
            cliente: new Cliente(),
            clientes : [],
            clientesResumido:[],

            boleta_id: '',
            muestraListaClientes: false,

            boletaDetalleDialog: false,
            nuevoServicio: false,
            boletas: [],
            contratoDetalles: [],

            muestraBoletaDetalle: true,
            boletaDetallesTemporal: [],
            boleta: '',
            cambioEvento : false,
            codigoNuevoContrato: '',
            

  
        }
    },
    created() {
        this.Inicializar()
    },
    mounted(){

    },
    methods:{
        metodoValidacion(){
            this.getContratoDetalles()
        },
        async Inicializar(){
            if (this.dataCliente._id == '') {
                this.mostrarListaClientes()
            }else{
                this.muestraListaClientes = true
                this.cliente_id = this.dataCliente.data._id
                await this.getClientePorIdEventChange()
            }
            
        },
        async unpack(valor){
            this.boleta = valor.boleta
            this.mostrarListaBoleta = false,
            this.mostrarDetalleBoleta = true
            this.editar = valor.editar
            await this.getContratoDetalles()
        },
        cambiarMostrarListaBoleta(){
            this.mostrarListaBoleta = true,
            this.mostrarDetalleBoleta = false
            this.getBoletas()
        },
        async getContratoDetalles(){
			await axios.get('http://18.230.199.15:8000/v1/contratodetallexcodigocliente/' + this.cliente_id)
                .then(data => {
                this.contratoDetalles = data.data
                })
        },
        async getBoletas(){//se usa
			await axios.get('http://18.230.199.15:8000/v1/boletaxcliente/' + this.cliente_id)
                .then(data => {
                this.boletas = data.data
                console.log(this.boletas);
                })
        },
        async getClientes(){//se usa
            await axios.get('http://18.230.199.15:8000/v1/cliente')
			.then(data => {
                this.clientes = data.data
                for (let index = 0; index < this.clientes.length; index++) {
				this.clientesResumido.push({'value': this.clientes[index]._id,'text': this.clientes[index].codigoCliente +'-'+ this.clientes[index].nombreCliente+'-'+ this.clientes[index].apellidoCliente})
                }
			})
        },
        async getCliente(){//se usa
            await axios.get('http://18.230.199.15:8000/v1/cliente/' + this.cliente_id)
                .then(data => {
                this.cliente = data.data

                });
        },

        async getClientePorIdEventChange(){//se usa
            this.cambioEvento = true
            this.desbloquearBoton = true
            await this.getBoletas()
            await this.getCliente()
            await this.getContratoDetalles() 
            if (this.contratoDetalles.length > 0) {
                this.codigoNuevoContrato = this.contratoDetalles[0].codigoContrato
            }else{
                this.generacionCodigoNuevoContrato()
            }
        },
        generacionCodigoNuevoContrato(){
           this.codigoNuevoContrato = this.cliente.codigoCliente +'-'+ this.GeneraNuevo() 
        },
        async mostrarListaClientes(){//se usa
            this.muestraListaClientes = !this.muestraListaClientes
            this.clientesResumido = []
            this.clientes = []
            this.cliente_id = ''
            this.codigoNuevoContrato = ''

            await this.getClientes()//se usa
            if (!this.muestraListaClientes) {    
                this.desbloquearBoton = false
                this.boletas=[]
                this.contratoDetalles=[]
                this.cliente = new Cliente()
            }            
        },
        GeneraNuevo(){
			const fecha = (new Date())
			const anio = new Date(fecha).getUTCFullYear()
			const mes = (new Date(fecha).getMonth() < 9 ? '0'+(new Date(fecha).getMonth()+1): new Date(fecha).getMonth()+1) 
			const dia = (new Date(fecha).getUTCDate() < 9? '0'+(new Date(fecha).getUTCDate()): new Date(fecha).getUTCDate())
			const hora = (new Date(fecha).getHours() < 9? '0'+(new Date(fecha).getHours()): new Date(fecha).getHours())
			const minuto = new Date(fecha).getMinutes()
            const segundo = (new Date(fecha).getUTCSeconds() < 10? '0'+(new Date(fecha).getUTCSeconds()): new Date(fecha).getUTCSeconds())

            return  anio +''+ mes +''+ dia + '-' + hora +''+ minuto + '' + segundo;
        }
              
    },
    computed:{
        cambiarEstiloListaClientes(){
            return !this.muestraListaClientes ? 'p-button-success p-mr-2' : 'p-button-secondary p-mr-2'
        },
        cambiarLabelListaClientes(){
            return !this.muestraListaClientes ? 'Nuevo' : 'Cancelar'
        },
        CambiarEstiloListaBoletas(){
            return !this.mostrarListaBoleta ? 'p-button-outlined p-button-info p-mr-2 p-mb-2' : 'p-button-secondary p-mr-2 p-mb-2'
        },
        CambiarEstiloDetalleBoletas(){
            return !this.mostrarDetalleBoleta ? 'p-button-outlined p-button-info p-mr-2 p-mb-2' : 'p-button-secondary p-mr-2 p-mb-2'
        },
    }

}
</script>

<style scoped>

</style>
