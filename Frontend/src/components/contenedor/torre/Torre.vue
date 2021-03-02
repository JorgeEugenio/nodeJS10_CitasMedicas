<template>
	<div class="p-grid crud-demo">
		<div class="p-col-12">
			<div>
				<Toast/>
				<Toolbar class="p-mb-4">
					<template v-slot:left>
						<Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
						<Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedTorres || !selectedTorres.length" />
					</template>

					<template v-slot:right>
						<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="p-mr-2 p-d-inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>

				<DataTable ref="dt" :value="torres" v-model:selection="selectedTorres" dataKey="_id" :paginator="true" :rows="10" :filters="filters"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
					<template #header>
						<div class="table-header">
							<h5 class="p-m-0">Administrar Torres</h5>
							<span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global']" placeholder="Search..." />
                            </span>
						</div>
					</template>

					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
					<!-- <Column field="_id" header="_id" :sortable="true"></Column> -->
					<Column field="TipoTorre" header="Tipo Torre" :sortable="true"></Column>
					<Column field="nombreTorre" header="Nombre Torre" :sortable="true"></Column>
					<Column field="descripcionTorre" header="Descripcion" :sortable="true"></Column>
					<Column field="direccionTorre.departamento" header="Departamento" :sortable="true"></Column>
                    <Column field="direccionTorre.provincia" header="Provincia" :sortable="true"></Column>
                    <Column field="direccionTorre.distrito" header="Distrito" :sortable="true"></Column>
                    <Column field="direccionTorre.programa" header="Programa" :sortable="true"></Column>
                    <Column field="direccionTorre.mzlt" header="Mz Lt" :sortable="true"></Column>
                    <Column field="statusTorre" header="Status" :sortable="true"></Column>
					<Column>
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editTorre(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteTorre(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="torreDialog" :style="{width: '450px'}" :header="cambiarHeader" :modal="true" :class="cambiarColor">	

					<!-- <img :src="'assets/layout/images/product/' + product.image" :alt="product.image" class="product-image" v-if="product.image" /> -->
					<div class="p-field">
						<label for="statusTorre">Status</label>
						<Dropdown id="statusTorre" v-model="torre.statusTorre" :options="estados" optionLabel="value" optionValue="text" placeholder="Select One" required="true" :class="{'p-invalid': submitted && !torre.statusTorre}"></Dropdown>
					</div>
                    <div class="p-field">
                        <label for="nombreTorre">Tipo Torre</label>
                        <InputText id="nombreTorre" v-model.trim="torre.TipoTorre" required="true" autofocus :class="{'p-invalid': submitted && !torre.nombreTorre}" />
                        <small class="p-invalid" v-if="submitted && !torre.TipoTorre">El  tipo de torre es requerido.</small>
                    </div>
                    <div class="p-field">
                        <label for="nombreTorre">Nombre Torre</label>
                        <InputText id="nombreTorre" v-model.trim="torre.nombreTorre" required="true" autofocus :class="{'p-invalid': submitted && !torre.nombreTorre}" />
                        <small class="p-invalid" v-if="submitted && !torre.nombreTorre">El nombre de la torre es requerido.</small>
                    </div>
                    <div class="p-field">
                        <label for="descripcionTorre">Descripcion</label>
                        <InputText id="descripcionTorre" v-model.trim="torre.descripcionTorre" required="true" autofocus :class="{'p-invalid': submitted && !torre.descripcionTorre}" />
						<small class="p-invalid" v-if="submitted && !torre.descripcionTorre">La descripcionTorre es requerida.</small>
                    </div>
                    <div class="p-field">
                        <label for="departamento">Departamento</label>
                        <InputText id="departamento" v-model.trim="torre.direccionTorre.departamento" required="true" autofocus :class="{'p-invalid': submitted && !torre.direccionTorre.departamento}" />
						<small class="p-invalid" v-if="submitted && !torre.direccionTorre.departamento">El departamento es requerido.</small>
                    </div>
                    <div class="p-field">
                        <label for="provincia">Provincia</label>
                        <InputText id="provincia" v-model.trim="torre.direccionTorre.provincia" required="true" autofocus :class="{'p-invalid': submitted && !torre.direccionTorre.provincia}" />
						<small class="p-invalid" v-if="submitted && !torre.direccionTorre.provincia">La provincia es requerida.</small>
                    </div>
                    <div class="p-field">
                        <label for="distrito">Distrito</label>
                        <InputText id="distrito" v-model.trim="torre.direccionTorre.distrito" required="true" autofocus :class="{'p-invalid': submitted && !torre.direccionTorre.distrito}" />
						<small class="p-invalid" v-if="submitted && !torre.direccionTorre.distrito">El distrito es requerido.</small>
                    </div>
                    <div class="p-field">
                        <label for="programa">Programa</label>
                        <InputText id="programa" v-model.trim="torre.direccionTorre.programa" required="true" autofocus :class="{'p-invalid': submitted && !torre.direccionTorre.programa}" />
						<small class="p-invalid" v-if="submitted && !torre.direccionTorre.programa">El programa es requerido.</small>
                    </div>
                    <div class="p-field">
                        <label for="propietario">Mz Lt</label>
                        <InputText id="propietario" v-model.trim="torre.direccionTorre.mzlt" required="true" autofocus :class="{'p-invalid': submitted && !torre.direccionTorre.mzlt}" />
						<small class="p-invalid" v-if="submitted && !torre.direccionTorre.mzlt">La Mz-Lt es requerida.</small>
                    </div>
					<template #footer>
						<Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveTorre" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteTorreDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="torre">Are you sure you want to delete <b>{{torre.name}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteTorreDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteTorre(torre)" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteTorresDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="torre">Are you sure you want to delete the selected products?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteTorresDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedTorres" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>
class Torre {
  constructor(TipoTorre = '', nombreTorre='', descripcionTorre = '', statusTorre = '', direccionTorre = { departamento : '', provincia : '', distrito : '' , programa : '', mzlt : ''}) {

    this.TipoTorre = TipoTorre;
    this.nombreTorre = nombreTorre;
    this.descripcionTorre = descripcionTorre;
    this.direccionTorre = direccionTorre;
    this.statusTorre = statusTorre;
  }
}

export default {
	data() {
		return {
			statusTorre: null,
			estados: [
				{ value: 'Activo', text: 'Activo' },
				{ value: 'Inactivo', text: 'Inactivo' }
			],
			torre: new Torre(),//usar
			torres: [],
			torreDialog: false,//usar
			nuevo: false,
			deleteTorreDialog: false,
			deleteTorresDialog: false,
			selectedTorre: null,
			selectedTorres: null,
			filters: {},
			submitted: false,
			vista1:[]
		}
	},
	created() {
		this.getTorres()
		this.getVista1()
	},
	mounted() {

		//this.getTorres()
	},
	methods: {
		getTorres(){
			fetch('http://localhost:8000/v1/torre')
			.then(res => res.json())
			.then(data => {
				this.torres = data
				//console.log(this.torres);
			})
		},
		getVista1(){
			fetch('http://localhost:8001/v1/vista1')
			.then(res => res.json())
			.then(data => {
				this.vista1 = data
				console.log(this.vista1);
			})
		},
		formatCurrency(value) {
			return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
		},
		openNew() {
			this.torre = new Torre();
			this.torreDialog = true
			
			this.submitted = false;
			this.nuevo = false
		},
		hideDialog() {
			this.torreDialog = false;
			this.submitted = false;
		},
		editTorre(torre){
			this.nuevo = true
			this.torreDialog = true
			this.torre = torre
		},
		saveTorre() {//-------------------------------------------------------------
            this.submitted = true
			const validacion =  !this.torre.statusTorre == '' && 
								!this.torre.TipoTorre == '' && 
                                !this.torre.nombreTorre == ''&&
                                !this.torre.descripcionTorre == '' && 
                                !this.torre.direccionTorre.departamento == '' && 
                                !this.torre.direccionTorre.provincia == '' && 
                                !this.torre.direccionTorre.distrito == '' && 
                                !this.torre.direccionTorre.provincia == '' && 
                                !this.torre.direccionTorre.distrito == '' && 
                                !this.torre.direccionTorre.programa == '' && 
                                !this.torre.direccionTorre.mzlt == ''
            if (validacion) {
                if(!this.nuevo === true) {
                    fetch('http://localhost:8000/v1/torre', {
                    method: 'POST',
                    body: JSON.stringify(this.torre),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(() => {
                        this.getTorres()
                        this.torre = new Torre();
                        this.torreDialog = false

                    });
                    console.log('pase por post');
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});		
                }else {
					
                    fetch('http://localhost:8000/v1/torre/' + this.torre._id, {
                    method: 'PUT',
                    body: JSON.stringify(this.torre),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(() => {
                        this.getTorres();
                        this.torre = new Torre();
                        this.torreDialog = false
                    });
                    console.log('pase por put');
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
                }
            }else{
                this.torreDialog = true
                console.log('pase por else de post');
            }
		},
		getTorre(torre) {
			this.nuevo = true
			fetch('http://localhost:8000/v1/torre/' + torre._id)
				.then(res => res.json())
				.then(data => {
				const { TipoTorre, nombreTorre, descripcionTorre, statusTorre, direccionTorre } = data;
				this.torre = new Torre(TipoTorre, nombreTorre, descripcionTorre, statusTorre, direccionTorre );
				this.torreDialog = true
				});
		},
		deleteTorre() {
			fetch('http://localhost:8000/v1/torre/' + this.torre._id, {
				method: 'DELETE',
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				}
				})
				.then(res => res.json())
				.then(() => {
				this.getTorres();
				this.torre = new Torre();
				});
				this.deleteTorreDialog = false
				this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
		},
		confirmDeleteTorre(torre) {
			this.torre = torre;
			this.deleteTorreDialog = true;
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
			this.deleteTorresDialog = true;
		},
		deleteSelectedTorres() {
			for (let step = 0; step < this.selectedTorres.length; step++) {
				fetch('http://localhost:8000/v1/torre/' + this.selectedTorres[step]._id, {
					method: 'DELETE',
					headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
					}
					})
					.then(res => res.json())
					this.getTorres();
			}
			this.deleteTorresDialog = false;
			this.selectedTorres = null;
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

.torre-image {
	width: 100px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .torre-image {
	width: 150px;
	margin: 0 auto 2rem auto;
	display: block;
}

.confirmation-content {
	display: flex;
	align-items: center;
	justify-content: center;
}

.torre-badge {
	border-radius: 2px;
	padding: .25em .5rem;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 12px;
	letter-spacing: .3px;

	&.statusTorre-instock {
		background: #C8E6C9;
		color: #256029;
	}

	&.statusTorre-outofstock {
		background: #FFCDD2;
		color: #C63737;
	}

	&.statusTorre-lowstock {
		background: #FEEDAF;
		color: #8A5340;
	}
}
</style>
