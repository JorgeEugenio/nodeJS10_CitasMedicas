<template>
	<div class="p-grid crud-demo">
		<div class="p-col-12">
			<div>
				<Toast/>
				

				<Toolbar class="p-mb-4">
					<template v-slot:left>
						<Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" :disabled="deshabilitar"/>
						<Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedContratos || !selectedContratos.length" />
					</template>

					<template v-slot:right>
						<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="p-mr-2 p-d-inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>

				<DataTable ref="dt" :value="cadena" v-model:selection="selectedContratos" dataKey="_id" :paginator="true" :rows="10" :filters="filters"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
					<template #header>
						<div class="table-header">
							<h5 class="p-m-0">Detalles del Contrato</h5>
							<span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global']" placeholder="Search..." />
                            </span>
						</div>
					</template>

					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
					<!-- <Column field="_id" header="_id" :sortable="true"></Column> -->
					<Column field="codigoContrato" header="codigo ContratoDetalle" :sortable="true"></Column>
					<Column field="serviciosContratados.nombreServicio" header="Servicio" :sortable="true"></Column>
					<Column field="serviciosContratados.detalleServicio" header="Detalle" :sortable="true"></Column>
					<Column field="serviciosContratados.costoServicio" header="Costo" :sortable="true"></Column>
					<!-- <Column type=date field="createdAt" header="Fecha de creacion" :sortable="true"></Column>
                    <Column type="date" field="updatedAt" header="fecha de actualizacion" :sortable="true"></Column> -->
					<Column field="statusContratoDetalle" header="Status" :sortable="true"></Column>
					<Column>
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editContratoDetalle(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteSector(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="contratoDetalleDialog" :style="{width: '450px'}" :header="cambiarHeader" :modal="true" :class="cambiarColor">	

					<!-- <img :src="'assets/layout/images/product/' + product.image" :alt="product.image" class="product-image" v-if="product.image" /> -->
					<div class="p-field">
						<label for="statusContratoDetalle">Status ContratoDetalle</label>
						<Dropdown id="statusContratoDetalle" v-model="contratoDetalle.statusContratoDetalle" :options="estados" optionLabel="value" optionValue="text" placeholder="Select One" required="true" :class="{'p-invalid': submitted && !contratoDetalle.statusContratoDetalle}"></Dropdown>
					</div>
                    <div class="p-field">
                        <label for="codigoContrato">Codigo ContratoDetalle</label>
                        <InputText id="codigoContrato" v-model.trim="contratoDetalle.codigoContrato" required="true" autofocus :class="{'p-invalid': submitted && !contratoDetalle.codigoContrato}" :disabled="true"/>
                        <small class="p-invalid" v-if="submitted && !contratoDetalle.codigoContrato">El nombre del contratoDetalle es requerido.</small>
                    </div>
                    <div class="p-field">
                        <label for="serviciosContratados.nombreServicio">Servicio</label>
						<Dropdown id="statusContratoDetalle" v-on:change="getServicioEventChange(servicio_id)" v-model="servicio_id" :options="planesResumido" optionValue="value" optionLabel="text" placeholder="Select One" required="true" :class="{'p-invalid': submitted && !servicio_id}"></Dropdown>
                    </div>
					<div class="p-field">
                        <label for="serviciosContratados.nombreServicio">Servicio</label>
						<InputText id="serviciosContratados.nombreServicio" v-model.trim="plan.nombrePlan" required="true" autofocus :class="{'p-invalid': submitted && !plan.nombrePlan}" disabled="true" />
						<small class="p-invalid" v-if="submitted && !plan.nombrePlan">La descripcion es requerida.</small>
                    </div>
                    <div class="p-field">
                        <label for="serviciosContratados.detalleServicio">Detalle</label>
                        <InputText id="serviciosContratados.detalleServicio" v-model.trim="plan.descripcion" required="true" autofocus :class="{'p-invalid': submitted && !plan.descripcion}" :disabled="false" />
                    </div>
					<div class="p-field">
                        <label for="serviciosContratados.costoServicio">Detalle</label>
                        <InputText id="serviciosContratados.costoServicio" v-model.trim="plan.costo" required="true" autofocus :class="{'p-invalid': submitted && !plan.costo}" :disabled="false" />
                    </div>
                    <template #footer>
						<Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveContratoDetalle" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteContratoDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="contratoDetalle">Are you sure you want to delete <b>{{contratoDetalle.nameSector}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteContratoDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteContratoDetalle(contratoDetalle)" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteContratosDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="contratoDetalle">Are you sure you want to delete the selected products?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteContratosDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedContratos" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>
import axios from 'axios';

class ContratoDetalle {
  constructor( statusContratoDetalle = '',codigoContrato = '', idCliente = '',serviciosContratados = { nombreServicio : '', detalleServicio : '', costoServicio :  ''}) {

	this.idCliente = idCliente;
    this.statusContratoDetalle = statusContratoDetalle;
	this.codigoContrato = codigoContrato;
	this.serviciosContratados = serviciosContratados;
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
export default {
	props:{
		deshabilitar:Boolean,
		CodContrato: String,
		IdClient: String,
		cadena: Array
	},
	data() {
		return {
			status:null,
			estados: [
				{ value: 'Activo', text: 'Activo' },
				{ value: 'Inactivo', text: 'Inactivo' }
			],
			contratoDetalle: new ContratoDetalle(),//usar
            contratoDetalles: [],
			contratoDetalleDialog: false,//usar
			nuevo: false,
			deleteContratoDialog: false,
			deleteContratosDialog: false,
			selectedSector: null,
			selectedContratos: null,
			filters: {},
			submitted: false,
			validacion: false,
			planes: [],
			planesResumido: [],
			servicio_id: '',
			plan: new Plan(),

		}
	},
	created() {
        //this.getContratoDetalles()
	},
	mounted() {
        //this.getContratos()
	},
	methods: {
		actualizar(){
			this.$emit('validacion',!this.contratoDetalleDialog)
		},
		getServicioEventChange(){
			this.getPlan()
		},
		async getContratoDetalles(){
			await axios.get('http://localhost:8000/v1/contratodetallexcodigocliente/'+ this.IdClient)
			.then(data => {
				this.contratoDetalles = data.data
				//console.log(this.contratoDetalles);
			})
		},
		async getPlanes(){
			await axios.get('http://localhost:8000/v1/plan')
			.then(data => {
				this.planes = data.data
				for (let index = 0; index < this.planes.length; index++) {
				this.planesResumido.push({'value': this.planes[index]._id,'text': this.planes[index].nombrePlan +'-'+ this.planes[index].costo+'-'+ this.planes[index].status})
				//console.log(this.planesResumido);
				}
			})
		},
		async getPlan(){
			await axios.get('http://localhost:8000/v1/plan/'+ this.servicio_id)
			.then(data => {
				this.plan = data.data
			})
        },
		formatCurrency(value) {
			return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
		},
		openNew() {
			this.contratoDetalle = new ContratoDetalle();
			this.plan = new Plan()
			this.contratoDetalleDialog = true
			this.contratoDetalle.codigoContrato = this.CodContrato
			this.contratoDetalle.statusContratoDetalle = 'Activo' 
			this.submitted = false;
			this.nuevo = false;
			this.getPlanes()
		},
		hideDialog() {
			this.contratoDetalleDialog = false;
			this.submitted = false;
		},
		editContratoDetalle(contratoDetalle){
            this.contratoDetalle = contratoDetalle
			this.nuevo = true
			this.contratoDetalleDialog = true
		},
		saveContratoDetalle() {//-------------------------------------------------------------
			this.submitted = true
			const validacion =  !this.contratoDetalle.statusContratoDetalle == '' && 
								!this.contratoDetalle.codigoContrato == '' &&
								!this.servicio_id == ''
			this.contratoDetalle.idCliente = this.IdClient
			this.contratoDetalle.serviciosContratados.nombreServicio = this.plan.nombrePlan
			this.contratoDetalle.serviciosContratados.detalleServicio = this.plan.descripcion
			this.contratoDetalle.serviciosContratados.costoServicio = this.plan.costo
			if (validacion) {
                if(!this.nuevo === true) {
                    fetch('http://localhost:8000/v1/contratodetalle', {
                    method: 'POST',
                    body: JSON.stringify(this.contratoDetalle),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(() => {
                        this.getContratoDetalles()
                        this.contratoDetalle = new ContratoDetalle();
						this.contratoDetalleDialog = false
						this.actualizar()
					
					});
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});		
                }else {
                    fetch('http://localhost:8000/v1/contratodetalle/' + this.contratoDetalle._id, {
                    method: 'PUT',
                    body: JSON.stringify(this.contratoDetalle),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(() => {
                        this.getContratoDetalles();
                        this.contratoDetalleDialog = false
					});
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
                }
            }else{
				console.log('estoy en else');
                this.contratoDetalleDialog = true
            }
		},
		deleteContratoDetalle() {
			fetch('http://localhost:8000/v1/contratodetalle/' + this.contratoDetalle._id, {
				method: 'DELETE',
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				}
				})
				.then(res => res.json())
				.then(() => {
				this.getContratoDetalles()
				});
				this.deleteContratoDialog = false
				this.actualizar()
				this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
		},
		confirmDeleteSector(contratoDetalle) {
			this.contratoDetalle = contratoDetalle;
			this.deleteContratoDialog = true;
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
		confirmDeleteSelected() {
			this.deleteContratosDialog = true;
		},
		deleteSelectedContratos() {
			for (let step = 0; step < this.selectedContratos.length; step++) {
				fetch('http://localhost:8000/v1/contratodetalle/' + this.selectedContratos[step]._id, {
					method: 'DELETE',
					headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
					}
					})
					.then(res => res.json())
			}
			this.deleteContratosDialog = false;
			this.selectedContratos = null;
			this.$toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
		},
	}, computed:{
		cambiarHeader(){
			return this.nuevo ? 'Editar' : 'Nuevo'
		},
		cambiarColor(){
			return this.nuevo ? 'p-fluid' : 'p-fluid'
		}
	}
}
</script>

<style scoped lang="scss">
.table-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.contratoDetalle-image {
	width: 100px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .contratoDetalle-image {
	width: 150px;
	margin: 0 auto 2rem auto;
	display: block;
}

.confirmation-content {
	display: flex;
	align-items: center;
	justify-content: center;
}

.contratoDetalle-badge {
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
