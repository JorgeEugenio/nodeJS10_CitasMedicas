<template>
	<div class="p-grid crud-demo">
		<div class="p-col-12">
			<div>
				<Toast/>
				<Toolbar class="p-mb-4">
					<template v-slot:left>
						<Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
						<Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedPacientes || !selectedPacientes.length" />
					</template>

					<template v-slot:right>
						<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="p-mr-2 p-d-inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>

				<DataTable ref="dt" :value="pacientes" v-model:selection="selectedPacientes" dataKey="_id" :paginator="true" :rows="10" :filters="filters"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
					<template #header>
						<div class="table-header">
							<h5 class="p-m-0">Administrar Pacientes</h5>
							<span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global']" placeholder="Search..." />
                            </span>
						</div>
					</template>

					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
					<Column field="nombrePaciente" header="Nombre Paciente" :sortable="true"></Column>
					<Column field="apellidoPaciente" header="Descripcion" :sortable="true"></Column>
                    <Column field="dniPaciente" header="Status" :sortable="true"></Column>
					<Column>
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editPaciente(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeletePaciente(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="pacienteDialog" :style="{width: '450px'}" :header="cambiarHeader" :modal="true" :class="cambiarColor">	
                    <div class="p-field">
                        <label for="nombrePaciente">Nombre Paciente</label>
                        <InputText id="nombrePaciente" v-model.trim="paciente.nombrePaciente" required="true" autofocus :class="{'p-invalid': submitted && !paciente.nombrePaciente}" />
                        <small class="p-invalid" v-if="submitted && !paciente.nombrePaciente">El nombre del paciente es requerido.</small>
                    </div>
                    <div class="p-field">
                        <label for="apellidoPaciente">Apellido</label>
                        <InputText id="apellidoPaciente" v-model.trim="paciente.apellidoPaciente" required="true" autofocus :class="{'p-invalid': submitted && !paciente.apellidoPaciente}" />
						<small class="p-invalid" v-if="submitted && !paciente.apellidoPaciente">La apellidoPaciente es requerida.</small>
                    </div>
					<div class="p-field">
                        <label for="dniPaciente">DNI Paciente</label>
                        <InputText id="dniPaciente" v-model.trim="paciente.dniPaciente" required="true" autofocus :class="{'p-invalid': submitted && !paciente.dniPaciente}" />
						<small class="p-invalid" v-if="submitted && !paciente.apellidoPaciente">La apellidoPaciente es requerida.</small>
                    </div>
					<template #footer>
						<Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Save" icon="pi pi-check" class="p-button-text" @click="savePaciente" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deletePacienteDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="paciente">Are you sure you want to delete <b>{{paciente.name}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deletePacienteDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deletePaciente(paciente)" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deletePacientesDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="paciente">Are you sure you want to delete the selected products?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deletePacientesDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteselectedPacientes" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>
class Paciente {
  constructor( nombrePaciente='', apellidoPaciente = '', dniPaciente = '') {

    this.nombrePaciente = nombrePaciente;
    this.apellidoPaciente = apellidoPaciente;
    this.dniPaciente = dniPaciente;
  }
}

export default {
	data() {
		return {
			paciente: new Paciente(),//usar
			pacientes: [],
			pacienteDialog: false,//usar
			nuevo: false,
			deletePacienteDialog: false,
			deletePacientesDialog: false,
			selectedPaciente: null,
			selectedPacientes: null,
			filters: {},
			submitted: false
		}
	},
	created() {
		this.getPacientes()
	},
	mounted() {

		//this.getPacientes()
	},
	methods: {
		getPacientes(){
			fetch('http://localhost:8002/v1/paciente')
			.then(res => res.json())
			.then(data => {
				this.pacientes = data
				console.log(this.pacientes);
			})
		},
		formatCurrency(value) {
			return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
		},
		openNew() {
			this.paciente = new Paciente();
			this.pacienteDialog = true
			
			this.submitted = false;
			this.nuevo = false
		},
		hideDialog() {
			this.pacienteDialog = false;
			this.submitted = false;
		},
		editPaciente(paciente){
			this.nuevo = true
			this.pacienteDialog = true
			this.paciente = paciente
			//console.log(this.paciente);
		},
		savePaciente() {//-------------------------------------------------------------
            this.submitted = true
			const validacion =  !this.paciente.dniPaciente == '' && 
								!this.paciente.nombrePaciente == '' && 
                                !this.paciente.apellidoPaciente == ''
            if (validacion) {
                if(!this.nuevo === true) {
                    fetch('http://localhost:8002/v1/paciente', {
                    method: 'POST',
                    body: JSON.stringify(this.paciente),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(() => {
                        this.getPacientes()
                        this.paciente = new Paciente();
                        this.pacienteDialog = false

                    });
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Pacient Created', life: 3000});		
                }else {
                    this.getPaciente(this.paciente)
                    fetch('http://localhost:8002/v1/paciente/' + this.paciente._id, {
                    method: 'PUT',
                    body: JSON.stringify(this.paciente),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(() => {
                        this.getPacientes();
                        this.paciente = new Paciente();
                        this.pacienteDialog = false
                    });
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
                }
            }else{
                this.pacienteDialog = true
            }
		},
		getPaciente(paciente) {
			this.nuevo = true
			fetch('http://localhost:8002/v1/paciente/' + paciente._id)
				.then(res => res.json())
				.then(data => {
				const { TipoPaciente, nombrePaciente, apellidoPaciente, dniPaciente, direccion } = data;
				this.paciente = new Paciente(TipoPaciente, nombrePaciente, apellidoPaciente, dniPaciente, direccion );
				this.pacienteDialog = true
				});
		},
		deletePaciente() {
			fetch('http://localhost:8002/v1/paciente/' + this.paciente._id, {
				method: 'DELETE',
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				}
				})
				.then(res => res.json())
				.then(() => {
				this.getPacientes();
				this.paciente = new Paciente();
				});
				this.deletePacienteDialog = false
				this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
		},
		confirmDeletePaciente(paciente) {
			this.paciente = paciente;
			this.deletePacienteDialog = true;
		},
		exportCSV() {
			this.$refs.dt.exportCSV();
		},
		confirmDeleteSelected() {
			this.deletePacientesDialog = true;
		},
		deleteselectedPacientes() {
			for (let step = 0; step < this.selectedPacientes.length; step++) {
				fetch('http://localhost:8002/v1/paciente/' + this.selectedPacientes[step]._id, {
					method: 'DELETE',
					headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
					}
					})
					.then(res => res.json())
					this.getPacientes();
			}
			this.deletePacientesDialog = false;
			this.selectedPacientes = null;
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

.paciente-image {
	width: 100px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .paciente-image {
	width: 150px;
	margin: 0 auto 2rem auto;
	display: block;
}

.confirmation-content {
	display: flex;
	align-items: center;
	justify-content: center;
}

.paciente-badge {
	border-radius: 2px;
	padding: .25em .5rem;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 12px;
	letter-spacing: .3px;

	&.dniPaciente-instock {
		background: #C8E6C9;
		color: #256029;
	}

	&.dniPaciente-outofstock {
		background: #FFCDD2;
		color: #C63737;
	}

	&.dniPaciente-lowstock {
		background: #FEEDAF;
		color: #8A5340;
	}
}
</style>
