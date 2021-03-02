<template>
	<div class="p-grid crud-demo">
		<div class="p-col-12">
			<div>
				<Toast/>
				<Toolbar class="p-mb-4">
					<template v-slot:left>
						<Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
						<Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedCuentaPagos || !selectedCuentaPagos.length" />
					</template>

					<template v-slot:right>
						<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="p-mr-2 p-d-inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>

				<DataTable ref="dt" :value="cuentapagos" v-model:selection="selectedCuentaPagos" dataKey="_id" :paginator="true" :rows="10" :filters="filters"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
					<template #header>
						<div class="table-header">
							<h5 class="p-m-0">Administrar Cuentas de Pago</h5>
							<span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global']" placeholder="Search..." />
                            </span>
						</div>
					</template>

					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
					<!-- <Column field="_id" header="_id" :sortable="true"></Column> -->
					<Column field="banco" header="Banco" :sortable="true"></Column>
					<Column field="nombreCuentaPago" header="Nombre Cuenta" :sortable="true"></Column>
					<Column field="numeroCuentaPago" header="Numero Cuenta" :sortable="true"></Column>
					<Column field="cciCuentaPago" header="Numero CCI" :sortable="true"></Column>
					<Column field="propietarioCuentaPago" header="Propietario" :sortable="true"></Column>
					<Column field="statusCuentaPago" header="Status" :sortable="true"></Column>
					<Column>
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editCuentaPago(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteCuentaPago(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="cuentapagoDialog" :style="{width: '450px'}" :header="cambiarHeader" :modal="true" :class="cambiarColor">	

					<!-- <img :src="'assets/layout/images/product/' + product.image" :alt="product.image" class="product-image" v-if="product.image" /> -->
					<div class="p-field">
						<label for="statusCuentaPago">Status</label>
						<Dropdown id="statusCuentaPago" v-model="cuentapago.statusCuentaPago" :options="estados" optionLabel="value" optionValue="text" placeholder="Select One" required="true" :class="{'p-invalid': submitted && !cuentapago.statusCuentaPago}"></Dropdown>
					</div>
					<div class="p-field">
                        <label for="banco">Banco</label>
                        <InputText id="banco" v-model.trim="cuentapago.banco" required="true" autofocus :class="{'p-invalid': submitted && !cuentapago.banco}" />
						<small class="p-invalid" v-if="submitted && !cuentapago.banco">El nombre del banco is requerido.</small>
                    </div>
                    <div class="p-field">
                        <label for="nombreCuentaPago">Nombre Cuenta</label>
                        <InputText id="nombreCuentaPago" v-model.trim="cuentapago.nombreCuentaPago" required="true" autofocus :class="{'p-invalid': submitted && !cuentapago.nombreCuentaPago}" />
                        <small class="p-invalid" v-if="submitted && !cuentapago.nombreCuentaPago">El nombre de la cuenta is requerido.</small>
                    </div>
                    <div class="p-field">
                        <label for="numeroCuentaPago">Numero Cuenta</label>
                        <InputText id="numeroCuentaPago" v-model.trim="cuentapago.numeroCuentaPago" required="true" autofocus :class="{'p-invalid': submitted && !cuentapago.numeroCuentaPago}" />
                        <small class="p-invalid" v-if="submitted && !cuentapago.numeroCuentaPago">El numero de cuenta es requerido.</small>
                    </div>
					<div class="p-field">
                        <label for="cciCuentaPago">Numero Cuenta</label>
                        <InputText id="cciCuentaPago" v-model.trim="cuentapago.cciCuentaPago" required="true" autofocus :class="{'p-invalid': submitted && !cuentapago.cciCuentaPago}" />
                        <small class="p-invalid" v-if="submitted && !cuentapago.cciCuentaPago">El numero de cuenta es requerido.</small>
                    </div>
                    <div class="p-field">
                        <label for="propietarioCuentaPago">propietarioCuentaPago</label>
                        <InputText id="propietarioCuentaPago" v-model.trim="cuentapago.propietarioCuentaPago" required="true" autofocus :class="{'p-invalid': submitted && !cuentapago.propietarioCuentaPago}" />
                        <small class="p-invalid" v-if="submitted && !cuentapago.propietarioCuentaPago">El nombre del propietarioCuentaPago es requerido.</small>
                    </div>
					<template #footer>
						<Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveCuentaPago" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteCuentaPagoDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="cuentapago">Are you sure you want to delete <b>{{cuentapago.name}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteCuentaPagoDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteCuentaPago(cuentapago)" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteCuentaPagosDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="cuentapago">Are you sure you want to delete the selected products?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteCuentaPagosDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedCuentaPagos" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>
class CuentaPago {
  constructor(banco = '', nombreCuentaPago='', numeroCuentaPago = '', cciCuentaPago = '', propietarioCuentaPago = '', statusCuentaPago = null) {

    this.banco = banco;
    this.nombreCuentaPago = nombreCuentaPago;
	this.numeroCuentaPago = numeroCuentaPago;
	this.cciCuentaPago = cciCuentaPago;
    this.propietarioCuentaPago = propietarioCuentaPago;
    this.statusCuentaPago = statusCuentaPago;
  }
}

export default {
	data() {
		return {
			statusCuentaPago:null,
			estados: [
				{ value: 'Activo', text: 'Activo' },
				{ value: 'Inactivo', text: 'Inactivo' }
			],
			cuentapago: new CuentaPago(),//usar
			cuentapagos: [],
			cuentapagoDialog: false,//usar
			nuevo: false,
			deleteCuentaPagoDialog: false,
			deleteCuentaPagosDialog: false,
			selectedCuentaPago: null,
			selectedCuentaPagos: null,
			filters: {},
			submitted: false
		}
	},
	created() {
		this.getCuentaPagos()
	},
	mounted() {
		//this.getCuentaPagos()
	},
	methods: {
		getCuentaPagos(){
			fetch('http://localhost:8000/v1/cuentapago')
			.then(res => res.json())
			.then(data => {
				this.cuentapagos = data
			})
		},
		formatCurrency(value) {
			return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
		},
		openNew() {
			this.cuentapago = {};
			this.cuentapagoDialog = true
			
			this.submitted = false;
			this.nuevo = false
		},
		hideDialog() {
			this.cuentapagoDialog = false;
			this.submitted = false;
		},
		editCuentaPago(cuentapago){
			this.nuevo = true
			this.cuentapagoDialog = true
			this.cuentapago = cuentapago
		},
		saveCuentaPago() {//-------------------------------------------------------------
            this.submitted = true
            const validacion =  !this.cuentapago.banco == '' && 
                                !this.cuentapago.nombreCuentaPago == '' && 
								!this.cuentapago.numeroCuentaPago == '' && 
								!this.cuentapago.cciCuentaPago == '' && 
                                !this.cuentapago.propietarioCuentaPago == '' && 
                                !this.cuentapago.statusCuentaPago == ''
            if (validacion) {
                if(!this.nuevo === true) {
                    fetch('http://localhost:8000/v1/cuentapago', {
                    method: 'POST',
                    body: JSON.stringify(this.cuentapago),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(() => {
                        this.getCuentaPagos()
                        this.cuentapago = new CuentaPago();
                        this.cuentapagoDialog = false

                    });
                    console.log('pase por post');
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
			}
			else {
				fetch('http://localhost:8000/v1/cuentapago/' + this.cuentapago._id, {
				method: 'PUT',
				body: JSON.stringify(this.cuentapago),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
				})
				.then(res => res.json())
				.then(() => {
					this.getCuentaPagos();
					this.cuentapago = new CuentaPago();
					this.cuentapagoDialog = false
				});
				console.log('pase por put');
				this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
			}
            }
            else{
                this.cuentapagoDialog = true
					console.log('pase por else de post'); 
            }
		},
		getCuentaPago(cuentapago) {
			this.nuevo = true
			fetch('http://localhost:8000/v1/cuentapago/' + cuentapago._id)
				.then(res => res.json())
				.then(data => {
				const { banco, nombreCuentaPago, numeroCuentaPago, cciCuentaPago, propietarioCuentaPago, statusCuentaPago } = data;
				this.cuentapago = new CuentaPago(banco, nombreCuentaPago, numeroCuentaPago, cciCuentaPago, propietarioCuentaPago, statusCuentaPago );
				this.cuentapagoDialog = true
				});
		},
		deleteCuentaPago() {
			fetch('http://localhost:8000/v1/cuentapago/' + this.cuentapago._id, {
				method: 'DELETE',
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				}
				})
				.then(res => res.json())
				.then(() => {
				this.getCuentaPagos();
				this.cuentapago = new CuentaPago();
				});
				this.deleteCuentaPagoDialog = false
				this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
		},
		confirmDeleteCuentaPago(cuentapago) {
			this.cuentapago = cuentapago;
			this.deleteCuentaPagoDialog = true;
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
			this.deleteCuentaPagosDialog = true;
		},
		deleteSelectedCuentaPagos() {
			for (let step = 0; step < this.selectedCuentaPagos.length; step++) {
				fetch('http://localhost:8000/v1/cuentapago/' + this.selectedCuentaPagos[step]._id, {
					method: 'DELETE',
					headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
					}
					})
					.then(res => res.json())
					this.getCuentaPagos();
			}
			this.deleteCuentaPagosDialog = false;
			this.selectedCuentaPagos = null;
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

.cuentapago-image {
	width: 100px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .cuentapago-image {
	width: 150px;
	margin: 0 auto 2rem auto;
	display: block;
}

.confirmation-content {
	display: flex;
	align-items: center;
	justify-content: center;
}

.cuentapago-badge {
	border-radius: 2px;
	padding: .25em .5rem;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 12px;
	letter-spacing: .3px;

	&.statusCuentaPago-instock {
		background: #C8E6C9;
		color: #256029;
	}

	&.statusCuentaPago-outofstock {
		background: #FFCDD2;
		color: #C63737;
	}

	&.statusCuentaPago-lowstock {
		background: #FEEDAF;
		color: #8A5340;
	}
}
</style>
