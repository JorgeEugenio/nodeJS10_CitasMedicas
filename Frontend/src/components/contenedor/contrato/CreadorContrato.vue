<template>
	<div class="p-grid crud-demo">
		<div class="p-col-12">
            <Toast/>
				<Toolbar class="p-mb-4">
					<template v-slot:left>
						<Button :label="cambiarLabelListaClientes" icon="pi pi-plus" :class="cambiarEstiloListaClientes" @click="mostrarListaClientes" />
					</template>
                    <template v-slot:right v-if="muestraListaClientes">
                        <label for="Listaclientes"><p><strong>Lista clientes    :</strong></p></label>
                        <Dropdown id="Listaclientes" v-on:change="getClientePorIdEventChange(cliente_id)" v-model="cliente_id" :options="clientesResumido" optionLabel="text" optionValue="value" placeholder="Select One" required="true" :class="{'p-invalid': !cliente_id}"></Dropdown>
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
                :deshabilitar ="muestraListaClientes && !cambioEvento"
                :CodContrato="codigoNuevoContrato"
                :IdClient="cliente_id"
                :cadena ="contratoDetalles"
                v-on:validacion="metodoValidacion"
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

import ContratoDetalle  from './ContratoDetalle'
import axios from 'axios';
export default {
    components: {
        ContratoDetalle 
    },
    data() {
        return {
            estados: [
				{ value: 'Activo', text: 'Activo' },
				{ value: 'Inactivo', text: 'Inactivo' }
            ],
            cambioEvento: false,
            cliente_id: '',
            cliente: new Cliente(),
            clientes : [],
            clientesResumido:[],

            contrato_id: '',
            muestraListaClientes: false,
            codigoNuevoContrato: '',

            contratoDetalleDialog: false,
            nuevoServicio: false,
            contratoDetalles: [],
  
        }
    },
    created() {

    },
    mounted(){

    },
    methods:{
        metodoValidacion(validacion){
            if (validacion) {
                this.getContratoDetalles()
            }
        },
        async getContratoDetalles(){
			await axios.get('http://localhost:8000/v1/contratodetallexcodigocliente/' + this.cliente_id)
                .then(data => {
                this.contratoDetalles = data.data
                })
        },
        async getClientes(){
            await axios.get('http://localhost:8000/v1/cliente')
			.then(data => {
                this.clientes = data.data
                for (let index = 0; index < this.clientes.length; index++) {
				this.clientesResumido.push({'value': this.clientes[index]._id,'text': this.clientes[index].codigoCliente +'-'+ this.clientes[index].nombreCliente+'-'+ this.clientes[index].apellidoCliente})
				}
			})
        },
        async getCliente(){
            await axios.get('http://localhost:8000/v1/cliente/' + this.cliente_id)
                .then(data => {
                this.cliente = data.data
                });
        },

        async getClientePorIdEventChange(){
            this.cambioEvento = true
            await this.getContratoDetalles()
            await this.getCliente()
            if (this.contratoDetalles.length > 0) {
                this.codigoNuevoContrato = this.contratoDetalles[0].codigoContrato
            }else{
                this.generacionCodigoNuevoContrato()
            }
                
        }, 
        generacionCodigoNuevoContrato(){
           this.codigoNuevoContrato = this.cliente.codigoCliente +'-'+ this.GeneraNuevo() 
        },
        async mostrarListaClientes(){
            this.muestraListaClientes = !this.muestraListaClientes
            this.clientesResumido = []
            this.clientes = []
            this.cliente_id = ''
            this.codigoNuevoContrato = ''
            await this.getClientes()
            if (!this.muestraListaClientes) {    
                this.cambioEvento = false
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
        cambiarHeader(){
			return this.nuevoServicio ? 'Editar' : 'Nuevo'
		},
		cambiarColor(){
			return this.nuevoServicio ? 'p-fluid' : 'p-fluid'
		}
    }

}
</script>

<style scoped>

</style>
