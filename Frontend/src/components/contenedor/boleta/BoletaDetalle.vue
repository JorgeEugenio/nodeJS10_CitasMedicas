<template>
	<div class="p-grid crud-demo">
		<div class="p-col-12">
			<div>
				<Toast/>
				<Toolbar class="p-mb-4">
					<template v-slot:left>
						<Button label="Nuevo servicio" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" :disabled="deshabilitar"/>
					</template>

					<template v-slot:right>
						<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="p-mr-2 p-d-inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>

				<DataTable ref="dt" :value="boletaDetalles" v-model:selection="selectedBoletas" dataKey="_id" :paginator="true" :rows="12" :filters="filters"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" :rowsPerPageOptions="[12,24,48]"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
					<template #header>
						<div class="table-header">
							<h5 class="p-m-0">Detalle de boleta</h5>
							<span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global']" placeholder="Search..." />
                            </span>
						</div>
					</template>

					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
					<!-- <Column field="_id" header="_id" :sortable="true"></Column> -->
					<Column field="codigoBoleta" header="codigo BoletaDetalle" :sortable="true"></Column>
					<Column field="fechaAnio" header="Año" :sortable="true"></Column>
					<Column field="fechaMes" header="Mes" :sortable="true"></Column>
					<Column field="serviciosContratados.nombreServicio" header="Servicio" :sortable="true"></Column>
					<Column field="serviciosContratados.detalleServicio" header="Detalle" :sortable="true"></Column>
					<Column field="serviciosContratados.costoServicio" header="Costo" :sortable="true"></Column>
					<!-- <Column type=date field="createdAt" header="Fecha de creacion" :sortable="true"></Column>
                    <Column type="date" field="updatedAt" header="fecha de actualizacion" :sortable="true"></Column> -->
					<Column field="statusBoletaDetalle" header="Status" :sortable="true"></Column>
					<Column>
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editBoletaDetalle(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteSector(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="boletaDetalleDialog" :style="{width: '450px'}" :header="cambiarHeader" :modal="true" :class="cambiarColor">	

					<!-- <img :src="'assets/layout/images/product/' + product.image" :alt="product.image" class="product-image" v-if="product.image" /> -->
					<div class="p-field">
						<label for="statusBoletaDetalle">Status BoletaDetalle</label>
						<Dropdown id="statusBoletaDetalle" v-model="boletaDetalle.statusBoletaDetalle" :options="estados" optionValue="value" optionLabel="text" placeholder="Select One" required="true" :class="{'p-invalid': submitted && !boletaDetalle.statusBoletaDetalle}"></Dropdown>
					</div>
                    <div class="p-field">
                        <label for="codigoBoleta">Codigo BoletaDetalle</label>
                        <InputText id="codigoBoleta" v-model.trim="boletaDetalle.codigoBoleta" required="true" autofocus :class="{'p-invalid': submitted && !boletaDetalle.codigoBoleta}" :disabled="true"/>
                        <small class="p-invalid" v-if="submitted && !boletaDetalle.codigoBoleta">El nombre del boletaDetalle es requerido.</small>
                    </div>
					<div class="p-field">
                        <label for="anio"></label>
						<Dropdown id="anio" v-model="variablesLocales.anioMes" v-on:change="rellenarMes" :options="meses" optionValue="value" optionLabel="text" placeholder="Select One" required="true" :class="{'p-invalid': submitted && !variablesLocales.anioMes}" :disabled="variablesLocales.bloquearAnioMes"></Dropdown>
                    </div>
					<div class="p-field">
                        <label for="anio">Anio</label>
						<InputText id="anio" v-model.trim="variablesLocales.fechaAnio" required="true" autofocus :class="{'p-invalid': submitted && !variablesLocales.fechaAnio}" disabled="true" />
                    </div>
					<div class="p-field">
                        <label for="mes">Mes</label>
						<InputText id="mes" v-model.trim="variablesLocales.fechaMes" required="true" autofocus :class="{'p-invalid': submitted && !variablesLocales.fechaMes}" disabled="true" />
                    </div>
					<div class="p-field">
                        <label for="variablesLocales.servicio_id">Servicio</label>
						<Dropdown id="variablesLocales.servicio_id" v-on:change="getServicioEventChange()" v-model="variablesLocales.servicio_id" :options="planesResumido" optionValue="value" optionLabel="text" placeholder="Select One" required="true" :class="{'p-invalid': submitted && !variablesLocales.servicio_id}" ></Dropdown>
                    </div>
                    <div class="p-field">
                        <label for="plan.nombrePlan">Servicio</label>
						<InputText id="plan.nombrePlan" v-model.trim="plan.nombrePlan" required="true" autofocus :class="{'p-invalid': submitted && !plan.nombrePlan}" disabled="true" />
                    </div>
                    <div class="p-field">
                        <label for="plan.descripcion">Detalle</label>
                        <InputText id="plan.descripcion" v-model.trim="plan.descripcion" required="true" autofocus :class="{'p-invalid': submitted && !plan.descripcion}" :disabled="false" />
                    </div>
					<div class="p-field">
                        <label for="plan.costo">Costo</label>
                        <InputText id="plan.costo" v-model.trim="plan.costo" required="true" autofocus :class="{'p-invalid': submitted && !plan.costo}" :disabled="false" />
                    </div>
                    <template #footer>
						<Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveBoletaDetalle" />
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

				<Dialog v-model:visible="deleteBoletasDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="boletaDetalle">Are you sure you want to delete the selected products?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteBoletasDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedBoletas" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>
import axios from 'axios';
class Boleta {
  constructor( codigoBoleta = '', idCliente = '',fechaAnio = '', fechaMes = '', codigoCliente = '', monto = '') {

	this.codigoBoleta = codigoBoleta;
    this.idCliente = idCliente;
	this.codigoCliente = codigoCliente;
	this.fechaAnio = fechaAnio;
	this.fechaMes = fechaMes;
	this.monto = monto;

  }
}
class BoletaDetalle {
  constructor( statusBoletaDetalle = '',codigoBoleta = '', idCliente = '',serviciosContratados = {idServicio: '', nombreServicio : '', detalleServicio : '', costoServicio:''}, fechaAnio ='', fechaMes = '') {

	this.idCliente = idCliente;
    this.statusBoletaDetalle = statusBoletaDetalle;
	this.codigoBoleta = codigoBoleta;
	this.serviciosContratados = serviciosContratados;
	this.fechaAnio = fechaAnio;
	this.fechaMes = fechaMes;

  }
}
class Plan {
  constructor( nombrePlan='', descripcion = '', status = null, costo = null) {

    this.nombrePlan = nombrePlan;
    this.descripcion = descripcion;
    this.costo = costo;
    this.status = status;
  }
}
class Local {
  constructor( anioMes = '', fechaAnio = '', fechaMes = '', servicio_id = '', bloquearAnioMes = false) {
    this.anioMes = anioMes;
    this.fechaAnio = fechaAnio;
	this.fechaMes = fechaMes;
	this.servicio_id = servicio_id;
	this.bloquearAnioMes = bloquearAnioMes;
  }
}

export default {
	props:{
		editar: Boolean,
		deshabilitar:Boolean,
		boleta: Object,
	},
	data() {
		return {
			status:null,
			estados: [
				{ value: 'Activo', text: 'Activo' },
				{ value: 'Inactivo', text: 'Inactivo' }
			],
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
			boletaDetalle: new BoletaDetalle(),//usar
            boletaDetalles: [],
			boletaDetalleDialog: false,//usar
			nuevo: false,
			deleteBoletaDialog: false,
			deleteBoletasDialog: false,
			selectedSector: null,
			selectedBoletas: null,
			filters: {},
			submitted: false,
			planes: [],
			planesResumido: [],
			plan: new Plan(),
			variablesLocales: new Local(),
			boletaNueva : new Boleta(),
			busquedaBoleta: [],

		}
	},
	created() {
		this.Inicializar()
		//console.log(this.boleta);
	},
	mounted() {
        //this.getBoletas()
	},
	methods: {
		async Inicializar(){//en uso
			await this.getBoletaDetalles()
		},
		actualizar(){
			this.$emit('validacion',!this.boletaDetalleDialog)
		},
		getServicioEventChange(){
			this.getPlan()
		},
		async getBoletaDetalles(){//en uso
			await axios.get('http://18.230.199.15:8000/v1/boletadetallexcodigoboleta/'+this.boleta.codigoBoleta)
			.then(data => {
				this.boletaDetalles = data.data
				//console.log(this.boletaDetalles);
				this.nuevoMonto = 0
				for (let index = 0; index < this.boletaDetalles.length; index++) {
					this.nuevoMonto += this.boletaDetalles[index].serviciosContratados.costoServicio
				}
			//console.log(this.boletaDetalles);
			})
		},
		async getBoletaxCodigo(){//se usa
			await axios.get('http://18.230.199.15:8000/v1/boletaxcodigoboleta/' + this.boleta.codigoBoleta)
                .then(data => {
				this.busquedaBoleta = data.data
                })
		},
		async existenciaBoleta(){
			await this.getBoletaxCodigo()
			if (this.busquedaBoleta.length > 0) {
					return true	
				}else{
					return false
				}	
		},
		async getPlanes(){
			await axios.get('http://18.230.199.15:8000/v1/plan')
			.then(data => {
				this.planes = data.data
				for (let index = 0; index < this.planes.length; index++) {
				this.planesResumido.push({'value': this.planes[index]._id,'text': this.planes[index].nombrePlan +'-'+ this.planes[index].costo+'-'+ this.planes[index].status})
				}
			})
		},
		async getPlan(){
			await axios.get('http://18.230.199.15:8000/v1/plan/'+ this.variablesLocales.servicio_id)
			.then(data => {
				this.plan = data.data
			})
		},
		formatCurrency(value) {
			return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
		},
		openNew() {//en uso
			this.boletaDetalle = new BoletaDetalle();
			this.plan = new Plan()
			this.rellenarMesInicial()
			this.variablesLocales = new Local(this.variablesLocales.anioMes,this.boleta.fechaAnio,this.boleta.fechaMes,'',true)
			this.boletaDetalle.idCliente = this.boleta.idCliente
			this.boletaDetalle.codigoBoleta = this.boleta.codigoBoleta
			this.boletaDetalle.fechaAnio = this.boleta.fechaAnio
			this.boletaDetalle.fechaMes = this.boleta.fechaMes
			this.boletaDetalle.statusBoletaDetalle = 'Activo' 
			this.submitted = false;
			this.nuevo = true;
			this.getPlanes()
			this.boletaDetalleDialog = true
		},
		hideDialog() {
			this.boletaDetalleDialog = false;
			this.submitted = false;
			this.boletaDetalle = new BoletaDetalle();
		},
		editBoletaDetalle(boletaDetalle){
			this.boletaDetalleDialog = true;
			this.boletaDetalle = boletaDetalle
			this.variablesLocales = new Local(this.variablesLocales.anioMes,this.boleta.fechaAnio,this.boleta.fechaMes,'',true)
			this.rellenarMesInicial()
			this.variablesLocales.servicio_id = this.plan.nombrePlan + '-'+ this.plan.costo + '-' + this.plan.status;

			this.submitted = false;
			this.nuevo = false;
			this.getPlanes()

		},
		async saveBoletaDetalle() {//-------------------------------------------------------------
			this.boletaDetalle.serviciosContratados.idServicio = this.plan._id
			this.boletaDetalle.serviciosContratados.nombreServicio = this.plan.nombrePlan
			this.boletaDetalle.serviciosContratados.detalleServicio = this.plan.descripcion
			this.boletaDetalle.serviciosContratados.costoServicio = this.plan.costo
			
			this.submitted = true

			const validacion =  !this.boletaDetalle.statusBoletaDetalle == '' && 
								!this.boletaDetalle.codigoBoleta == '' &&
								!this.boletaDetalle.idCliente == '' &&
								!this.boletaDetalle.fechaAnio == '' &&
								!this.boletaDetalle.fechaMes == '' &&
								!this.plan.nombrePlan == '' &&
								!this.plan.descripcion == '' &&
								!this.plan.costo == ''
			if (validacion) {
                if(this.nuevo === true) {
					await axios.post('http://18.230.199.15:8000/v1/boletadetalle', this.boletaDetalle)
					await this.getBoletaDetalles()
					this.boletaNueva = this.boleta
					console.log(this.boletaNueva);
					this.boletaNueva.monto = this.nuevoMonto
					if (! await this.existenciaBoleta()) {
						await axios.post('http://18.230.199.15:8000/v1/boleta/', this.boletaNueva)
					}else{
						await axios.put('http://18.230.199.15:8000/v1/boletaxcodigoboleta/'+this.boletaNueva.codigoBoleta, this.boletaNueva)	
					}
					this.boletaDetalleDialog = false
					this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
                }else {
					await axios.put('http://18.230.199.15:8000/v1/boletadetalle/'+this.boletaDetalle._id, this.boletaDetalle)
					await this.getBoletaDetalles()
					this.boletaNueva = this.boleta
					this.boletaNueva.monto = this.nuevoMonto
					await axios.put('http://18.230.199.15:8000/v1/boletaxcodigoboleta/'+this.boletaNueva.codigoBoleta, this.boletaNueva)
					this.boletaDetalleDialog = false
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
                }
            }else{
                this.boletaDetalleDialog = true
            }
		},
		async deleteBoletaDetalle() {
			await axios.delete('http://18.230.199.15:8000/v1/boletadetalle/'+this.boletaDetalle._id)
			await this.getBoletaDetalles()
			this.boletaNueva = this.boleta
			this.boletaNueva.monto = this.nuevoMonto
			await axios.put('http://18.230.199.15:8000/v1/boletaxcodigoboleta/'+this.boletaNueva.codigoBoleta, this.boletaNueva)
			this.deleteBoletaDialog = false
			this.actualizar()
			this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
		},
		confirmDeleteSector(boletaDetalle) {
			this.boletaDetalle = boletaDetalle;
			this.deleteBoletaDialog = true;
		},
		findIndexById(id) {
			let index = -1;
			for (let i = 0; i < this.products.length; i++) {
				if (this.products[i].id === id) {
					index = i;
					break;
				}
			}

			return index;
		},
		exportCSV() {
			this.$refs.dt.exportCSV();
		},
		rellenarMes(){//en uso
			this.variablesLocales.fechaMes = this.meses.find((data)=>{
				if (data.value == this.anioMes){
					return data
				} 
			}).mes

		},
		rellenarMesInicial(){
			this.variablesLocales.anioMes = this.meses.find((data)=>{
				if(data.mes == this.boleta.fechaMes){
					return data
				}
			}).value
		},
		
	}, 
	computed:{
		cambiarHeader(){
			return this.editar ? 'Editar' : 'Nuevo'
		},
		cambiarColor(){
			return this.nuevo ? 'p-fluid' : 'p-fluid'
		},		
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

</style>
