<template>
<div class="p-grid crud-demo">
    <div class="p-col-7">
			<div>
				<Toast/>
				<Toolbar class="p-mb-4">
					<template v-slot:left>
						<Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
						<Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedClientes || !selectedClientes.length" />
					</template>

					<template v-slot:right>
						<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="p-mr-2 p-d-inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>
				<DataTable ref="dt" :value="clientes" v-model:selection="selectedClientes" dataKey="_id" :paginator="true" :rows="15" :filters="filters" 
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" :rowsPerPageOptions="[15,75,100]"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
					<template #header>
						<div class="table-header">
							<h5 class="p-m-0">Administrar Clientes</h5>
							<span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global']" placeholder="Search..." />

                            </span>
						</div>
					</template>
                        <Column selectionMode="multiple" headerStyle="width: 3rem" ></Column>
                        <Column field="codigoCliente" header="Codigo" :sortable="true">

                        </Column>
                        <Column field="nombreCliente" header="Nombres" :sortable="true"></Column>
                        <Column field="apellidoCliente" header="Apellido" :sortable="true"></Column>
                        <Column field="dniCliente" header="DNI" :sortable="true"></Column>
                        <Column field="direccionCliente.mzlt" header="Mz-Lt" :sortable="true"></Column>
                        <Column field="statusCliente" header="Status" :sortable="true"></Column>
                        <Column field="statusUpdate" header="Update" :sortable="true">
                            <template #body="slotProps">
                                <span :class="'cliente-badge status-'+ slotProps.data.statusUpdate">{{slotProps.data.statusUpdate}}</span>
                            </template>
                        </Column>
                        <Column >
                            <template #body="slotProps" >
                                <Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editSector(slotProps.data)" />
                                <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteSector(slotProps.data)" />
                            </template>
                        </Column>
				</DataTable>

				<Dialog v-model:visible="clienteDialog" :style="{width: '450px'}" :header="cambiarHeader" :modal="true" :class="cambiarColor">	

					<!-- <img :src="'assets/layout/images/product/' + product.image" :alt="product.image" class="product-image" v-if="product.image" /> -->
					<div class="p-field">
						<label for="statusCliente">Status Cliente</label>
						<Dropdown id="statusCliente" v-model="cliente.statusCliente" :options="estados" optionLabel="value" optionValue="text" placeholder="Select One" required="true" :class="{'p-invalid': submitted && !cliente.statusCliente}"></Dropdown>
					</div>
					<div class="p-field">
                        <label for="banco">Banco</label>
						<Dropdown id="banco" v-on:change="ejecutar" v-model="cliente.idCuentaPago" :options="cuentapagos" optionLabel="banco" optionValue="idCuentaPago" placeholder="Select One" required="true" :class="{'p-invalid': submitted && !cliente.idCuentaPago}"></Dropdown>
                        <small class="p-invalid" v-if="submitted && !cliente.idCuentaPago">El nombre del cliente es requerido.</small>
                    </div>
                    <div class="p-field">
                        <label for="codigoCliente">Codigo Cliente</label>
                        <InputText id="codigoCliente" v-model.trim="cliente.codigoCliente" required="true" autofocus :class="{'p-invalid': submitted && !cliente.codigoCliente}" />
                        <small class="p-invalid" v-if="submitted && !cliente.codigoCliente">El nombre del cliente es requerido.</small>
                    </div>
                    <div class="p-field">
                        <label for="nombreCliente">Nombre Cliente</label>
                        <InputText id="nombreCliente" v-model.trim="cliente.nombreCliente" required="true" autofocus :class="{'p-invalid': submitted && !cliente.nombreCliente}" />
						<small class="p-invalid" v-if="submitted && !cliente.nombreCliente">La descripcion es requerida.</small>
                    </div>
                    <div class="p-field">
                        <label for="apellidoCliente">Apellido Cliente</label>
                        <InputText id="apellidoCliente" v-model.trim="cliente.apellidoCliente" required="true" autofocus :class="{'p-invalid': submitted && !cliente.apellidoCliente}" />
						<small class="p-invalid" v-if="submitted && !cliente.apellidoCliente">La descripcion es requerida.</small>
                    </div>
                    <div class="p-field">
                        <label for="dniCliente">DNI Cliente</label>
                        <InputText id="dniCliente" v-model.trim="cliente.dniCliente" required="true" autofocus :class="{'p-invalid': submitted && !cliente.dniCliente}" />
						<small class="p-invalid" v-if="submitted && !cliente.dniCliente">La descripcion es requerida.</small>
                    </div>
                    <div class="p-field">
                        <label for="correoCliente">Correo Cliente</label>
                        <InputText id="correoCliente" v-model.trim="cliente.correoCliente" required="true" autofocus :class="{'p-invalid': submitted && !cliente.correoCliente}" />
						<small class="p-invalid" v-if="submitted && !cliente.correoCliente">La descripcion es requerida.</small>
                    </div>
                    <div class="p-field">
                        <label for="fechaCreacionCliente">Fecha Creacion</label>
                        <InputText id="fechaCreacionCliente" v-model.trim="cliente.fechaCreacionCliente" required="true" autofocus :class="{'p-invalid': submitted && !cliente.fechaCreacionCliente}" />
						<small class="p-invalid" v-if="submitted && !cliente.fechaCreacionCliente">La descripcion es requerida.</small>
                    </div>
                    <div class="p-field">
                        <label for="direccionCliente.programa">Programa</label>
                        <InputText id="direccionCliente.programa" v-model.trim="cliente.direccionCliente.programa" required="true" autofocus :class="{'p-invalid': submitted && !cliente.direccionCliente.programa}" />
						<small class="p-invalid" v-if="submitted && !cliente.direccionCliente.programa">La descripcion es requerida.</small>
                    </div>
                    <div class="p-field">
                        <label for="direccionCliente.mzlt">Mz-Lt</label>
                        <InputText id="direccionCliente.mzlt" v-model.trim="cliente.direccionCliente.mzlt" required="true" autofocus :class="{'p-invalid': submitted && !cliente.direccionCliente.mzlt}" />
						<small class="p-invalid" v-if="submitted && !cliente.direccionCliente.mzlt">La descripcion es requerida.</small>
                    </div>
                    <div class="p-field">
                        <label for="statusUpdate">Estado actualizar</label>
                        <InputText id="statusUpdate" v-model.trim="cliente.statusUpdate" required="true" autofocus :class="{'p-invalid': submitted && !cliente.statusUpdate}" />
						<small class="p-invalid" v-if="submitted && !cliente.statusUpdate">La descripcion es requerida.</small>
                    </div>
					<template #footer>
						<Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveSector" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteClienteDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="cliente">Are you sure you want to delete <b>{{cliente.nameSector}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteClienteDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteCliente(cliente)" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteClientesDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="cliente">Are you sure you want to delete the selected products?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteClientesDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedClientes" />
					</template>
				</Dialog>
			</div>
		</div>
		<Detalle2 :lista="selectedClientes"/>
	</div>
</template>
<script>

class Cliente {
  constructor( statusCliente = '',codigoCliente = '',nombreCliente = '' ,apellidoCliente = '',dniCliente = '',correoCliente = '',fechaCreacionCliente = '', statusUpdate = '', idCuentaPago = '' ,direccionCliente = {departamento : '',provincia : '',distrito : '',programa : '',mzlt : ''}) {

    this.statusCliente = statusCliente;
	this.codigoCliente = codigoCliente;
	this.nombreCliente = nombreCliente;
    this.apellidoCliente = apellidoCliente;
    this.dniCliente = dniCliente;
    this.correoCliente = correoCliente;
    this.fechaCreacionCliente = fechaCreacionCliente;
	this.direccionCliente = direccionCliente;
	this.statusUpdate = statusUpdate;
	this.idCuentaPago = idCuentaPago;
  }
}
import axios from 'axios';
import Detalle2 from './Detalle2'
export default {
    name:'Detalle1',
	components:{
		Detalle2
	},
    props:{

    },
	data() {
		return {
			mensaje: false,
			status:null,
			estados: [
				{ value: 'Activo', text: 'Activo' },
				{ value: 'Inactivo', text: 'Inactivo' }
			],
			cliente: new Cliente(),//usar
            clientes: [],
			clienteDialog: false,//SE QUEDA
			nuevo: false,
			deleteClienteDialog: false,
			deleteClientesDialog: false,
			selectedSector: null,
			selectedClientes: null,
			filters: {},
			submitted: false,

			cuentapagos: [],
			cuentapagosres: [],

			torres:[],
			torresResumido: [],
            celulares: [],
            checked: true
		}
	},
	created() {
        this.Inicializar()
	},
	mounted() {
        //this.getClientes()
	},
	methods: {
		async Inicializar(){//SE QUEDA
			await this.getClientes()
			await this.getCuentaPagos()
		},
		async getClientes(){//SE QUEDA
			await axios.get('http://18.230.199.15:8000/v1/cliente')
			.then(data => {
				this.clientes = data.data
			})
		},
		async getCuentaPagos(){//SE QUEDA
			await axios.get('http://18.230.199.15:8000/v1/cuentapago')
			.then(data => {
				this.cuentapagosres = data.data
				for (let index = 0; index < this.cuentapagosres.length; index++) {
					this.cuentapagos.push({'idCuentaPago': this.cuentapagosres[index]._id, 'banco':  this.cuentapagosres[index].nombreCuentaPago +'//'+ this.cuentapagosres[index].numeroCuentaPago})
					
				}
				//console.log(this.cuentapagosres);
			})
		},
		eventopersonalizado(){
			console.log(this.selectedClientes);
			
		},
		ejecutar(){
			console.log(this.cliente);
		},
		formatCurrency(value) {
			return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
		},
		openNew() {//SE QUEDA
			this.cliente = new Cliente();
			this.clienteDialog = true
			
			this.submitted = false;
			this.nuevo = false;
		},
		hideDialog() {
			this.clienteDialog = false;
			this.submitted = false;
		},
		editSector(cliente){//SE QUEDA
            this.cliente = cliente
			this.nuevo = true
			this.clienteDialog = true
		},
		saveSector() {//-------------------------------------------------------------
			this.submitted = true
			//console.log(this.cliente);
			const validacion =  !this.cliente.statusCliente == '' && 
								!this.cliente.codigoCliente == '' && 
                                !this.cliente.nombreCliente == '' &&
                                !this.cliente.apellidoCliente == '' &&
								!this.cliente.dniCliente == '' &&
								!this.cliente.idCuentaPago == '' &&
                                !this.cliente.correoCliente == '' && 
                                !this.cliente.fechaCreacionCliente == '' && 
                                !this.cliente.direccionCliente.departamento == '' &&
                                !this.cliente.direccionCliente.provincia == '' &&
                                !this.cliente.direccionCliente.distrito == '' &&
                                !this.cliente.direccionCliente.programa == '' &&
								!this.cliente.direccionCliente.mzlt == ''  &&
								!this.cliente.statusUpdate == '' 
            
			if (validacion) {
                if(!this.nuevo === true) {
                    fetch('http://18.230.199.15:8000/v1/cliente', {
                    method: 'POST',
                    body: JSON.stringify(this.cliente),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(() => {
                        this.getClientes()
                        this.cliente = new Cliente();
                        this.clienteDialog = false
					
					});
					console.log('estoy en post');
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});		
                }else {
                    fetch('http://18.230.199.15:8000/v1/cliente/' + this.cliente._id, {
                    method: 'PUT',
                    body: JSON.stringify(this.cliente),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(() => {
                        this.getClientes();
                        this.clienteDialog = false
					});
					console.log('estoy en put');
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
                }
            }else{
				console.log('estoy en else ');
                this.clienteDialog = true
            }
		},
		deleteCliente() {
			fetch('http://18.230.199.15:8000/v1/cliente/' + this.cliente._id, {
				method: 'DELETE',
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				}
				})
				.then(res => res.json())
				.then(() => {
				this.getClientes();
				this.cliente = new Cliente();
				});
				this.deleteClienteDialog = false
				this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
		},
		confirmDeleteSector(cliente) {//SE QUEDA
			this.cliente = cliente;
			this.deleteClienteDialog = true;
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
		exportCSV() {//SE QUEDA
			this.$refs.dt.exportCSV();
		},
		confirmDeleteSelected() {//SE QUEDA
			this.deleteClientesDialog = true;
		},
		deleteSelectedClientes() {//SE QUEDA
			for (let step = 0; step < this.selectedClientes.length; step++) {
				fetch('http://18.230.199.15:8000/v1/cliente/' + this.selectedClientes[step]._id, {
					method: 'DELETE',
					headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
					}
					})
					.then(res => res.json())
					this.getClientes();
			}
			this.deleteClientesDialog = false;
			this.selectedClientes = null;
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

.cliente-image {
	width: 100px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .cliente-image {
	width: 150px;
	margin: 0 auto 2rem auto;
	display: block;
}

.confirmation-content {
	display: flex;
	align-items: center;
	justify-content: center;
}

.cliente-badge {
	border-radius: 2px;
	padding: .25em .5rem;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 12px;
	letter-spacing: .3px;

	&.status-Actualizado {
		background: #C8E6C9;
		color: #256029;
	}

	&.status-Conflicto {
		background: #FFCDD2;
		color: #C63737;
	}

	&.status-Pendiente {
		background: #FEEDAF;
		color: #8A5340;
	}
}
</style>
