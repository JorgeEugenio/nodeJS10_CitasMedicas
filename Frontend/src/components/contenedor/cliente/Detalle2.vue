<template>
    <div class="p-col-5">
        <div>
            <Toast/>
            
            <DataTable ref="dt" :value="lista" v-model:selection="selectedClientes" dataKey="_id" :paginator="true" :rows="15" :filters="filters"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" :rowsPerPageOptions="[15,75,100]"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
                <Column field="numeroCelular" header="numeroCelular" :sortable="true"></Column>
                <Column field="whatsapp" header="whatsapp" :sortable="true"></Column>
                <Column field="whatsappLink" header="whatsappLink" :sortable="true"></Column>
                <Column field="estadoCelular" header="estadoCelular" :sortable="true"></Column>
                <Column field="parentezco" header="Parentezco" :sortable="true"></Column>
                <Column field="detalles" header="Detalles" :sortable="true"></Column>
                <Column field="idCliente" header="IdCliente" :sortable="true"></Column>
                <Column>
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editSector(slotProps.data)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteSector(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
<script>
class Celular {
  constructor( celular = '',whatsapp = '',whatsappLink = '' ,estadoCelular = '',parentezco = '',detalles = '',idcliente = '') {

    this.celular = celular;
	this.whatsapp = whatsapp;
	this.whatsappLink = whatsappLink;
    this.estadoCelular = estadoCelular;
    this.parentezco = parentezco;
    this.detalles = detalles;
    this.idcliente = idcliente;

  }
}
//import axios from 'axios';
export default {
    name:'Detalle2',
	props:{
		lista: Object
	},
	data() {
		return {
            celular: new Celular(),
			selectedClientes: null,//EN USO
			filters: {},

            celulares: [],
		}
	},
	created() {
        this.Inicializar()
	},
	mounted() {
        //this.getClientes()
		console.log(this.lista);
	},
	methods: {
		async Inicializar(){//en uso
			//console.log('Detalle2',this.valorDetalle2);
		},
		formatCurrency(value) {
			return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
		},
		openNew() {
			this.clienteDialog = true
			
			this.submitted = false;
			this.nuevo = false;
		},
		hideDialog() {
			this.clienteDialog = false;
			this.submitted = false;
		},
		editSector(celular){
            this.celular = celular
			this.nuevo = true
			this.clienteDialog = true
		},

		exportCSV() {
			this.$refs.dt.exportCSV();
		},
		confirmDeleteSelected() {
			this.deleteClientesDialog = true;
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
