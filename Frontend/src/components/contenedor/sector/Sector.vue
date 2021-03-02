<template>
	<div class="p-grid crud-demo">
		<div class="p-col-12">
			<div>
				<Toast/>
				<Toolbar class="p-mb-4">
					<template v-slot:left>
						<Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
						<Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedSectors || !selectedSectors.length" />
					</template>

					<template v-slot:right>
						<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="p-mr-2 p-d-inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>

				<DataTable ref="dt" :value="sectoresDetalles" v-model:selection="selectedSectors" dataKey="_id" :paginator="true" :rows="10" :filters="filters"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
					<template #header>
						<div class="table-header">
							<h5 class="p-m-0">Administrar Sectores</h5>
							<span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global']" placeholder="Search..." />
                            </span>
						</div>
					</template>

					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
					<!-- <Column field="_id" header="_id" :sortable="true"></Column> -->
                    <Column field="sectoresDetalles.nombreSector" header="Nombre Sector" :sortable="true"></Column>
					<Column field="sectoresDetalles.descripcionSector" header="Descripcion" :sortable="true"></Column>
                    <Column field="sectoresDetalles.TipoTorre" header="Tipo Torre" :sortable="true"></Column>
					<Column field="sectoresDetalles.descripcionTorre" header="Descripcion Torre" :sortable="true"></Column>
                    <Column field="sectoresDetalles.nombreTorre" header="Nombre Torre" :sortable="true"></Column>
                    <Column field="sectoresDetalles.direccionTorre.departamento" header="Departamento" :sortable="true"></Column>
                    <Column field="sectoresDetalles.direccionTorre.provincia" header="Provincia" :sortable="true"></Column>
                    <Column field="sectoresDetalles.direccionTorre.distrito" header="Distrito" :sortable="true"></Column>
                    <Column field="sectoresDetalles.statusSector" header="Status" :sortable="true"></Column>
					<Column>
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editSector(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteSector(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="sectorDialog" :style="{width: '450px'}" :header="cambiarHeader" :modal="true" :class="cambiarColor">	

					<!-- <img :src="'assets/layout/images/product/' + product.image" :alt="product.image" class="product-image" v-if="product.image" /> -->
					<div class="p-field">
						<label for="statusSector">Status Sector</label>
						<Dropdown id="statusSector" v-model="sectoresDetalle.statusSector" :options="estados" optionLabel="value" optionValue="text" placeholder="Select One" required="true" :class="{'p-invalid': submitted && !sectoresDetalle.statusSector}"></Dropdown>
					</div>
                    <div class="p-field">
                        <label for="nombreSector">Nombre Sector</label>
                        <InputText id="nombreSector" v-model.trim="sectoresDetalle.nombreSector" required="true" autofocus :class="{'p-invalid': submitted && !sectoresDetalle.nombreSector}" />
                        <small class="p-invalid" v-if="submitted && !sectoresDetalle.nombreSector">El nombre del sectoresDetalle es requerido.</small>
                    </div>
                    <div class="p-field">
                        <label for="descripcionSector">Descripcion</label>
                        <InputText id="descripcionSector" v-model.trim="sectoresDetalle.descripcionSector" required="true" autofocus :class="{'p-invalid': submitted && !sectoresDetalle.descripcionSector}" />
						<small class="p-invalid" v-if="submitted && !sectoresDetalle.descripcionSector">La descripcion es requerida.</small>
                    </div>
					<div class="p-field">
						<label for="idTorre">Sector</label>
						<Dropdown id="idTorre" v-model="sectoresDetalle.idTorre" :options="torresResumido" optionLabel="text" optionValue="value" placeholder="Select One" required="true" :class="{'p-invalid': submitted && !sectoresDetalle.idTorre}"></Dropdown>
					</div>
					<template #footer>
						<Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveSector" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteSectorDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="sector">Are you sure you want to delete <b>{{sector.nameSector}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteSectorDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSector(sector)" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteSectorsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="sector">Are you sure you want to delete the selected products?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteSectorsDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedSectors" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>

class Sector {
  constructor( nombreSector = '',statusSector = '',descripcionSector = '' ,idTorre = '') {

    this.nombreSector = nombreSector;
	this.statusSector = statusSector;
	this.descripcionSector = descripcionSector;
	this.idTorre = idTorre;
	
  }
}
class SectoresDetalle {
	constructor( direccionTorre = {departamento : '', provincia : '', distrito : '',programa : '',mzlt :''}, TipoTorre = '',nombreTorre ='', descripcionTorre = '', statusTorre = '', nombreSector = '', statusSector = '', descripcionSector = '' ){
		this.direccionTorre = direccionTorre
		this.TipoTorre = TipoTorre
		this.nombreTorre = nombreTorre
		this.descripcionTorre = descripcionTorre
		this.statusTorre = statusTorre
		this.nombreSector = nombreSector
		this.statusSector = statusSector
		this.descripcionSector = descripcionSector

	}
	
}

export default {
	data() {
		return {
			status:null,
			estados: [
				{ value: 'Activo', text: 'Activo' },
				{ value: 'Inactivo', text: 'Inactivo' }
			],
			sector: new Sector(),//usar
			sectoresDetalle: new SectoresDetalle(),
            sectores: [],
            sectoresDetalles: [],
			sectorDialog: false,//usar
			nuevo: false,
			deleteSectorDialog: false,
			deleteSectorsDialog: false,
			selectedSector: null,
			selectedSectors: null,
			filters: {},
			submitted: false,

			torres:[],
			torresResumido: []
		}
	},
	created() {
        //this.getSectores()
	},
	mounted() {
        this.getSectores()
		this.getSectoresDetalles()
		this.getTorres()
	},
	methods: {
		getSectores(){
			fetch('http://localhost:8000/v1/sector')
			.then(res => res.json())
			.then(data => {
				this.sectores = data
			})
        },
        getSectoresDetalles(){
			fetch('http://localhost:8000/v1/sectoresdetalles')
			.then(res => res.json())
			.then(data => {
				this.sectoresDetalles = data
			})
		},
		formatCurrency(value) {
			return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
		},
		openNew() {
			this.sector = new Sector();
			this.sectorDialog = true
			
			this.submitted = false;
			this.nuevo = false;
		},
		hideDialog() {
			this.sectorDialog = false;
			this.submitted = false;
		},
		editSector(sectoresDetalle){
			this.sectoresDetalle = sectoresDetalle.sectoresDetalles
			this.nuevo = true
			this.sectorDialog = true
		},
		saveSector() {//-------------------------------------------------------------
			this.submitted = true

			const validacion =  !this.sectoresDetalle.statusSector == '' && 
								!this.sectoresDetalle.nombreSector == '' && 
                                !this.sectoresDetalle.descripcionSector == ''&&
								!this.sectoresDetalle.idTorre == '' 

			if (validacion) {
                if(!this.nuevo === true) {
                    fetch('http://localhost:8000/v1/sector', {
                    method: 'POST',
                    body: JSON.stringify(this.sector),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(() => {
                        this.getSectoresDetalles()
                        this.sector = new Sector();
                        this.sectorDialog = false
					
					});
					console.log('estoy en post');
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});		
                }else {
                    fetch('http://localhost:8000/v1/sector/' + this.sectoresDetalle._id, {
                    method: 'PUT',
                    body: JSON.stringify(this.sectoresDetalle),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(() => {
                        this.getSectoresDetalles();
                        this.sectorDialog = false
					});
					console.log('estoy en put');
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
                }
            }else{
				console.log('estoy en else ');
                this.sectorDialog = true
            }
		},getTorres() {
			fetch('http://localhost:8000/v1/torre')
			.then(res => res.json())
			.then(data => {
				this.torres = data

				for (let index = 0; index < this.torres.length; index++) {
				this.torresResumido.push({'value': this.torres[index]._id,'text': this.torres[index].TipoTorre +'-'+ this.torres[index].nombreTorre+'-'+ this.torres[index].descripcionTorre})
				}
			})
		},
		getSector(sector) {
			this.nuevo = true
			fetch('http://localhost:8000/v1/sector/' + sector._id)
				.then(res => res.json())
				.then(data => {
				const { nombreSector, statusSector, descripcionSector, idTorre } = data;
				this.sector = new Sector(nombreSector, statusSector, descripcionSector, idTorre );
				this.sectorDialog = true
				});
		},
		deleteSector() {
			fetch('http://localhost:8000/v1/sector/' + this.sectoresDetalle.sectoresDetalles._id, {
				method: 'DELETE',
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				}
				})
				.then(res => res.json())
				.then(() => {
				this.getSectoresDetalles();
				this.sector = new Sector();
				});
				this.deleteSectorDialog = false
				this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
		},
		confirmDeleteSector(sectoresDetalle) {
			this.sectoresDetalle = sectoresDetalle;
			this.deleteSectorDialog = true;
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
		createId() {
			let id = '';
			var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			for ( var i = 0; i < 5; i++ ) {
				id += chars.charAt(Math.floor(Math.random() * chars.length));
			}
			return id;
		},
		exportCSV() {
			this.$refs.dt.exportCSV();
		},
		confirmDeleteSelected() {
			this.deleteSectorsDialog = true;
		},
		deleteSelectedSectors() {
			for (let step = 0; step < this.selectedSectors.length; step++) {
				fetch('http://localhost:8000/v1/sector/' + this.selectedSectors[step]._id, {
					method: 'DELETE',
					headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
					}
					})
					.then(res => res.json())
					this.getSectores();
			}
			this.deleteSectorsDialog = false;
			this.selectedSectors = null;
			this.$toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
		},
		deleteSelectedProducts() {
			this.products = this.products.filter(val => !this.selectedProducts.includes(val));
			this.deleteProductsDialog = false;
			this.selectedProducts = null;
			this.$toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
		}
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

.sector-image {
	width: 100px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .sector-image {
	width: 150px;
	margin: 0 auto 2rem auto;
	display: block;
}

.confirmation-content {
	display: flex;
	align-items: center;
	justify-content: center;
}

.sector-badge {
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
