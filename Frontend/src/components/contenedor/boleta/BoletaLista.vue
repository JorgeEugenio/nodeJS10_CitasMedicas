<template>
	<div class="p-grid crud-demo">
		<div class="p-col-12">
			<div>
				<Toast/>
				<Toolbar class="p-mb-4">
					<template v-slot:left>
						<Button label="Generar nueva boleta" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" :disabled="deshabilitar"/>
					</template>

					<template v-slot:right>
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>
				<DataTable ref="dt" :value="boletas" dataKey="_id" :paginator="true" :rows="5" :filters="filters"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" :rowsPerPageOptions="[5,24,48]"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
					<template #header>
						<div class="table-header">
							<h5 class="p-m-0">Detalles del Boleta</h5>
							<span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global']" placeholder="Search..." />
                            </span>
						</div>
					</template>
					<Column field="codigoBoleta" header="codigo Boleta" :sortable="true"></Column>
					<Column field="codigoCliente" header="codigoCliente" :sortable="true"></Column>
					<Column field="fechaAnio" header="Año" :sortable="true"></Column>
					<Column field="fechaMes" header="Mes" :sortable="true"></Column>
					<Column field="monto" header="Monto" :sortable="true"></Column>
					<Column field="tiempoPago" header="tiempoPago" :sortable="true"></Column>
					<Column field="statusBoleta" header="statusBoleta" :sortable="true"></Column>
					<Column field="statusPago" header="StatusPago" :sortable="true">
						<template #body="slotProps">
							<span :class="'order-badge order-'+ slotProps.data.statusPago">{{slotProps.data.statusPago}}</span>
						</template>
					</Column>
					<Column>
						<template #body="slotProps">
							<Button label="Pagar" icon="pi pi-dollar" class="p-button-rounded p-button-primary p-mr-2" @click="pagarBoleta(slotProps.data)" />
						</template>
					</Column>
					<Column>
						<template #body="slotProps">
							<Button label="Editar" icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="editarBoleta(slotProps.data)" />
						</template>
					</Column>
					<Column>
						<template #body="slotProps">
							<Button label="Detalles" icon="pi pi-bars" class="p-button-rounded p-button-success p-mr-2" @click="editBoletaDetalle(slotProps.data)" />
							<Button label="Eliminar" icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteSector(slotProps.data)" />
						</template>
					</Column>
				</DataTable>
				<Dialog v-model:visible="boletaDialog" :style="{width: '450px'}" header="Nueva Boleta" :modal="true" class="p-fluid">	

					<div class="p-field">
                        <label for="codigoBoleta">Codigo BoletaDetalle</label>
                        <InputText id="codigoBoleta" :value="NuevoCodigoBoleta" required="true" autofocus :class="{'p-invalid': submitted && !NuevoCodigoBoleta}" :disabled="true"/>
                    </div>
					<div class="p-field">
                        <label for="tiempoPago">Adelantado/Vencido</label>
						<Dropdown id="tiempoPago" v-model="tiempoPago" :options="opciones" optionValue="value" optionLabel="text" placeholder="Select One" required="true" :class="{'p-invalid': submitted && !tiempoPago}" :disabled="false"></Dropdown>
                    </div>
					<div class="p-field">
                        <label for="fechaAnio">Anio</label>
						<InputText id="fechaAnio" v-model.trim="fechaAnio" required="true" autofocus :class="{'p-invalid': submitted && !fechaAnio}" :disabled="false" />
                    </div>
					<div class="p-field">
                        <label for="anioMes">Mes</label>
						<Dropdown id="anioMes" v-model="anioMes" v-on:change="rellenarMes"  :options="meses" optionValue="value" optionLabel="text" placeholder="Select One" required="true" :class="{'p-invalid': submitted && !mes}" :disabled="false"></Dropdown>
                    </div>
					<div class="p-field">
                        <label for="fechaMes">Mes</label>
						<InputText id="fechaMes" v-model.trim="fechaMes" required="true" autofocus :class="{'p-invalid': submitted && !fechaMes}" disabled="true" />
                    </div>
					<div class="p-field">
                        <label for="codigoCliente">Codigo Cliente</label>
                        <InputText id="codigoCliente" :value="cliente.codigoCliente" required="true" autofocus :class="{'p-invalid': submitted && !cliente.codigoBoleta}" :disabled="true"/>
                    </div>
                    <div class="p-field">
                        <label for="nombreCliente">Nombre</label>
                        <InputText id="nombreCliente" :value="cliente.nombreCliente" required="true" autofocus :class="{'p-invalid': submitted && !cliente.nombreCliente}" :disabled="true"/>
                    </div>
					<div class="p-field">
                        <label for="apellidoCliente">Apelllido</label>
                        <InputText id="apellidoCliente" :value="cliente.apellidoCliente" required="true" autofocus :class="{'p-invalid': submitted && !cliente.apellidoCliente}" :disabled="true"/>
                    </div>
                    <template #footer>
						<Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveBoleta" />
					</template>
				</Dialog>
				<Dialog v-model:visible="deleteBoletaDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="boletaDetalle">Are you sure you want to delete <b>{{boletaDetalle.nameSector}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteBoletaDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteBoletaDetalle(boletaDetalle)" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>
import axios from 'axios';
class Boleta {
  constructor( codigoBoleta = '', idCliente = '',fechaAnio = '', fechaMes = '', codigoCliente = '', monto = '', tiempoPago = '', statusBoleta = 'Activo', statusPago = 'pendiente') {

	this.codigoBoleta = codigoBoleta;
    this.idCliente = idCliente;
	this.codigoCliente = codigoCliente;
	this.fechaAnio = fechaAnio;
	this.fechaMes = fechaMes;
	this.monto = monto;
	this.tiempoPago = tiempoPago;
	this.statusBoleta = statusBoleta;
	this.statusPago = statusPago;

  }
}

export default {
	props:{
		boletas: Array,
		deshabilitar: Boolean,
		cliente: Object,
	},
	data() {
		return {
			status:null,
			boleta: new Boleta(),//usar
			deleteBoletaDialog: false,
			filters: {},
			editar: false,
			boletaDialog: false,
			submitted: false,
			NuevoCodigoBoleta: '',
			meses: [ 
				{ value: 'Enero', text: 'Enero', mes: '01'},
				{ value: 'Febrero', text: 'Febrero', mes: '02'},
				{ value: 'Marzo', text: 'Marzo', mes: '03'},
				{ value: 'Abril', text: 'Abril', mes: '04'},
				{ value: 'Mayo', text: 'Mayo', mes: '05'},
				{ value: 'Junio', text: 'Junio', mes: '06'},
				{ value: 'Julio', text: 'Julio', mes: '07'},
				{ value: 'Agosto', text: 'Agosto', mes: '08'},
				{ value: 'Setiembre', text: 'Setiembre', mes: '09'},
				{ value: 'Octubre', text: 'Octubre' ,mes: '10'},
				{ value: 'Noviembre', text: 'Noviembre' ,mes: '11'},
				{ value: 'Diciembre', text: 'Diciembre' ,mes: '12'}
			],
			opciones:[
				{value: 'Vencido', text: 'Vencido'},
				{value: 'Adelantado', text: 'Adelantado'},
				{value: 'actualizar', text: 'actualizar'}
			],
			anioMes:'',
			fechaAnio:2020,
			fechaMes:'',
			tiempoPago:'',

		}
	},
	created() {

	},
	mounted() {

	},
	methods: {
		getServicioEventChange(){
			this.getPlan()
		},
		openNew(){
			this.boletaDialog = true
			this.boleta = new Boleta()
			this.anioMes = ''
			this.fechaMes = ''
			this.NuevoCodigoBoleta = this.generarCodigo(this.cliente.codigoCliente, 2020, this.fechaMes)
			//falta la funcion de verificacion de no repeticion de las boletas// boleta existente
		},
		hideDialog() {
			this.boletaDialog = false;
			this.submitted = false;
		},
		async saveBoleta(){
			this.boletaDialog = false;
			this.boleta = new Boleta(this.NuevoCodigoBoleta, this.cliente._id, this.fechaAnio, this.fechaMes, this.cliente.codigoCliente, 0, this.tiempoPago,'Activo', 'pendiente')
			if (this.editar) {
				await axios.put('http://18.230.199.15:8000/v1/boletaxcodigoboleta/'+this.boleta.codigoBoleta, this.boleta)
			}else{
				this.$emit('boleta',{boleta : this.boleta, editar : false} )
			}
			
			
		},
		async pagarBoleta(boleta){
			this.boleta = boleta
			this.boleta.statusPago = 'pagado'
			await axios.put('http://18.230.199.15:8000/v1/boletaxcodigoboleta/'+this.boleta.codigoBoleta, this.boleta)
			
		},
		editarBoleta(data){
			this.editar = true
			this.boletaDialog = true
			this.boleta = data
			this.NuevoCodigoBoleta = this.boleta.codigoBoleta
			this.tiempoPago = this.boleta.tiempoPago
			this.fechaAnio = this.boleta.fechaAnio
			this.anioMes = (this.meses.find((data)=>{
				if (data.mes == this.boleta.fechaMes ){
					return data
				}})).value
			this.fechaMes = this.boleta.fechaMes
		},
		editBoletaDetalle(boleta){
			this.$emit('boleta',{boleta : boleta, editar : true} )
		},
		deleteBoletaDetalle() {//pendiente implementacion
				axios.delete('http://18.230.199.15:8000/v1/boletadetalle/' + this.boletaDetalle._id)
				this.deleteBoletaDialog = false
				this.actualizar()
				this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
		},
		confirmDeleteSector(boletaDetalle) {//pendiente edicion
			this.boletaDetalle = boletaDetalle;
			this.boletaDialog = true;

		},
		exportCSV() {
			this.$refs.dt.exportCSV();
		},
		generarCodigo(codigoCliente= null, anio = null, mes = null){
			const fecha = (new Date())
			anio == null ? anio = new Date(fecha).getUTCFullYear(): ''
			mes == null ? (new Date(fecha).getMonth() < 9 ? '0'+(new Date(fecha).getMonth()+1): new Date(fecha).getMonth()+1) : ''
			const dia = (new Date(fecha).getUTCDate() < 9? '0'+(new Date(fecha).getUTCDate()): new Date(fecha).getUTCDate())
			const hora = (new Date(fecha).getHours() < 9? '0'+(new Date(fecha).getHours()): new Date(fecha).getHours())
			const minuto = new Date(fecha).getMinutes()
            const segundo = (new Date(fecha).getUTCSeconds() < 10? '0'+(new Date(fecha).getUTCSeconds()): new Date(fecha).getUTCSeconds())

            return codigoCliente + '-' + anio +''+ mes +''+ dia + '-' + hora +''+ minuto + '' + segundo;
		},
		rellenarMes(){//en uso
			this.fechaMes = this.meses.find((data)=>{
				if (data.value == this.anioMes){
					return data
				} 
			}).mes	
			this.NuevoCodigoBoleta = this.generarCodigo(this.cliente.codigoCliente, null, this.fechaMes)
		}
	}, 
	computed:{
		
	}
}
</script>

<style scoped lang="scss">
.table-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.boletaDetalle-image {
	width: 100px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .boletaDetalle-image {
	width: 150px;
	margin: 0 auto 2rem auto;
	display: block;
}

.confirmation-content {
	display: flex;
	align-items: center;
	justify-content: center;
}

.boletaDetalle-badge {
	border-radius: 2px;
	padding: .25em .5rem;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 12px;
	letter-spacing: .3px;

	&.status-instock {
		background: #C8E6C9;
		color: #256029;
	}

	&.status-outofstock {
		background: #FFCDD2;
		color: #C63737;
	}

	&.status-lowstock {
		background: #FEEDAF;
		color: #8A5340;
	}
}
.order-badge {
	border-radius: 2px;
	padding: .25em .5rem;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 12px;
	letter-spacing: .3px;

	&.order-pagado {
		background: #C8E6C9;
		color: #256029;
	}

	&.order-cancelled {
		background: #FFCDD2;
		color: #C63737;
	}

	&.order-pendiente {
		background: #FEEDAF;
		color: #8A5340;
	}

	&.order-returned {
		background: #ECCFFF;
		color: #694382;
	}
}
</style>
