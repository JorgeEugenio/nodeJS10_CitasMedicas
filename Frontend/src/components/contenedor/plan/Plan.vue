<template>
	<div class="p-grid crud-demo">
		<div class="p-col-12">
			<div>
				<Toast/>
				<Toolbar class="p-mb-4">
					<template v-slot:left>
						<Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
						<Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedPlans || !selectedPlans.length" />
					</template>

					<template v-slot:right>
						<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="p-mr-2 p-d-inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>

				<DataTable ref="dt" :value="planes" v-model:selection="selectedPlans" dataKey="_id" :paginator="true" :rows="10" :filters="filters"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
					<template #header>
						<div class="table-header">
							<h5 class="p-m-0">Administrar Planes</h5>
							<span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global']" placeholder="Search..." />
                            </span>
						</div>
					</template>

					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
					<!-- <Column field="_id" header="_id" :sortable="true"></Column> -->
					<Column field="nombrePlan" header="Nombre Plan" :sortable="true"></Column>
					<Column field="descripcion" header="Descripcion" :sortable="true"></Column>
					<Column modelValue:number field="costo" header="Costo" :sortable="true"></Column>
                    <Column field="status" header="Status" :sortable="true"></Column>
					<Column>
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editPlan(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeletePlan(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="planDialog" :style="{width: '450px'}" :header="cambiarHeader" :modal="true" :class="cambiarColor">	

					<!-- <img :src="'assets/layout/images/product/' + product.image" :alt="product.image" class="product-image" v-if="product.image" /> -->
					<div class="p-field">
						<label for="status">Status</label>
						<Dropdown id="status" v-model="plan.status" :options="estados" optionLabel="value" optionValue="text" placeholder="Select One" required="true" :class="{'p-invalid': submitted && !plan.status}"></Dropdown>
					</div>
                    <div class="p-field">
                        <label for="nombrePlan">Nombre Plan</label>
                        <InputText id="nombrePlan" v-model.trim="plan.nombrePlan" required="true" autofocus :class="{'p-invalid': submitted && !plan.nombrePlan}" />
                        <small class="p-invalid" v-if="submitted && !plan.nombrePlan">El nombre del plan es requerido.</small>
                    </div>
                    <div class="p-field">
                        <label for="descripcion">Descripcion</label>
                        <InputText id="descripcion" v-model.trim="plan.descripcion" required="true" autofocus :class="{'p-invalid': submitted && !plan.descripcion}" />
						<small class="p-invalid" v-if="submitted && !plan.descripcion">La descripcion es requerida.</small>
                    </div>
					<div class="p-field">
                        <label for="costo">Costo</label>
                        <InputNumber id="costo" v-model="plan.costo" required="false" autofocus  mode="currency" currency="Sol" locale="PEN" />
						
                    </div>
					<template #footer>
						<Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Save" icon="pi pi-check" class="p-button-text" @click="savePlan" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deletePlanDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="plan">Are you sure you want to delete <b>{{plan.name}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deletePlanDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deletePlan(plan)" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deletePlansDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="plan">Are you sure you want to delete the selected products?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deletePlansDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedPlans" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>
class Plan {
  constructor( nombrePlan='', descripcion = '', status = null, costo = null) {

    this.nombrePlan = nombrePlan;
    this.descripcion = descripcion;
    this.costo = costo;
    this.status = status;
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
			plan: new Plan(),//usar
			planes: [],
			planDialog: false,//usar
			nuevo: false,
			deletePlanDialog: false,
			deletePlansDialog: false,
			selectedPlan: null,
			selectedPlans: null,
			filters: {},
			submitted: false
		}
	},
	created() {
		this.getPlanes()
	},
	mounted() {

		//this.getPlanes()
	},
	methods: {
		getPlanes(){
			fetch('http://localhost:8000/v1/plan')
			.then(res => res.json())
			.then(data => {
				this.planes = data
			})
		},
		formatCurrency(value) {
			return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
		},
		openNew() {
			this.plan = new Plan();
			this.planDialog = true
			
			this.submitted = false;
			this.nuevo = false
		},
		hideDialog() {
			this.planDialog = false;
			this.submitted = false;
		},
		editPlan(plan){
			this.nuevo = true
			this.planDialog = true
			this.plan = plan
			//console.log(this.plan);
		},
		savePlan() {//-------------------------------------------------------------
            this.submitted = true
			const validacion =  !this.plan.status == '' && 
								!this.plan.nombrePlan == '' && 
                                !this.plan.descripcion == ''
            if (validacion) {
                if(!this.nuevo === true) {
                    fetch('http://localhost:8000/v1/plan', {
                    method: 'POST',
                    body: JSON.stringify(this.plan),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(() => {
                        this.getPlanes()
                        this.plan = new Plan();
                        this.planDialog = false

                    });
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});		
                }else {
                    this.getPlan(this.plan)
                    fetch('http://localhost:8000/v1/plan/' + this.plan._id, {
                    method: 'PUT',
                    body: JSON.stringify(this.plan),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(() => {
                        this.getPlanes();
                        this.plan = new Plan();
                        this.planDialog = false
                    });
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
                }
            }else{
                this.planDialog = true
            }
		},
		getPlan(plan) {
			this.nuevo = true
			fetch('http://localhost:8000/v1/plan/' + plan._id)
				.then(res => res.json())
				.then(data => {
				const { TipoPlan, nombrePlan, descripcion, status, direccion } = data;
				this.plan = new Plan(TipoPlan, nombrePlan, descripcion, status, direccion );
				this.planDialog = true
				});
		},
		deletePlan() {
			fetch('http://localhost:8000/v1/plan/' + this.plan._id, {
				method: 'DELETE',
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				}
				})
				.then(res => res.json())
				.then(() => {
				this.getPlanes();
				this.plan = new Plan();
				});
				this.deletePlanDialog = false
				this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
		},
		confirmDeletePlan(plan) {
			this.plan = plan;
			this.deletePlanDialog = true;
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
			this.deletePlansDialog = true;
		},
		deleteSelectedPlans() {
			for (let step = 0; step < this.selectedPlans.length; step++) {
				fetch('http://localhost:8000/v1/plan/' + this.selectedPlans[step]._id, {
					method: 'DELETE',
					headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
					}
					})
					.then(res => res.json())
					this.getPlanes();
			}
			this.deletePlansDialog = false;
			this.selectedPlans = null;
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

.plan-image {
	width: 100px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .plan-image {
	width: 150px;
	margin: 0 auto 2rem auto;
	display: block;
}

.confirmation-content {
	display: flex;
	align-items: center;
	justify-content: center;
}

.plan-badge {
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
