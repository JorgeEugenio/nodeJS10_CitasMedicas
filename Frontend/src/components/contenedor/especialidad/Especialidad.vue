<template>
	<div class="p-grid crud-demo">
		<div class="p-col-12">
			<div>
				<Toast/>
				<Toolbar class="p-mb-4">
					<template v-slot:left>
						<Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
						<Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedEspecialidads || !selectedEspecialidads.length" />
					</template>

					<template v-slot:right>
						<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="p-mr-2 p-d-inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>

				<DataTable ref="dt" :value="especialidades" v-model:selection="selectedEspecialidads" dataKey="_id" :paginator="true" :rows="10" :filters="filters"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
					<template #header>
						<div class="table-header">
							<h5 class="p-m-0">Administrar Especialidades</h5>
							<span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global']" placeholder="Search..." />
                            </span>
						</div>
					</template>

					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
					<Column field="nombreEspecialidad" header="Especialidad" :sortable="true"></Column>
					<Column field="detalleEspecialidad" header="Descripcion" :sortable="true"></Column>
					<Column>
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editEspecialidad(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteEspecialidad(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="especialidadDialog" :style="{width: '450px'}" :header="cambiarHeader" :modal="true" :class="cambiarColor">	
                    <div class="p-field">
                        <label for="nombreEspecialidad">Nombre Especialidad</label>
                        <InputText id="nombreEspecialidad" v-model.trim="especialidad.nombreEspecialidad" required="true" autofocus :class="{'p-invalid': submitted && !especialidad.nombreEspecialidad}" />
                        <small class="p-invalid" v-if="submitted && !especialidad.nombreEspecialidad">El nombre del especialidad es requerido.</small>
                    </div>
                    <div class="p-field">
                        <label for="detalleEspecialidad">Detalle</label>
                        <InputText id="detalleEspecialidad" v-model.trim="especialidad.detalleEspecialidad" required="true" autofocus :class="{'p-invalid': submitted && !especialidad.detalleEspecialidad}" />
						<small class="p-invalid" v-if="submitted && !especialidad.detalleEspecialidad">La detalleEspecialidad es requerida.</small>
                    </div>
					<template #footer>
						<Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveEspecialidad" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteEspecialidadDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="especialidad">Are you sure you want to delete <b>{{especialidad.name}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteEspecialidadDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteEspecialidad(especialidad)" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteEspecialidadsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="especialidad">Are you sure you want to delete the selected products?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteEspecialidadsDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteselectedEspecialidads" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>
class Especialidad {
  constructor( nombreEspecialidad='', detalleEspecialidad = '') {

    this.nombreEspecialidad = nombreEspecialidad;
    this.detalleEspecialidad = detalleEspecialidad;
  }
}

export default {
	data() {
		return {
			especialidad: new Especialidad(),//usar
			especialidades: [],
			especialidadDialog: false,//usar
			nuevo: false,
			deleteEspecialidadDialog: false,
			deleteEspecialidadsDialog: false,
			selectedEspecialidad: null,
			selectedEspecialidads: null,
			filters: {},
			submitted: false
		}
	},
	created() {
		this.getEspecialidades()
	},
	mounted() {

		//this.getEspecialidades()
	},
	methods: {
		getEspecialidades(){
			fetch('http://18.230.199.15:8002/v1/especialidad')
			.then(res => res.json())
			.then(data => {
				this.especialidades = data
			})
		},
		formatCurrency(value) {
			return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
		},
		openNew() {
			this.especialidad = new Especialidad();
			this.especialidadDialog = true
			
			this.submitted = false;
			this.nuevo = false
            
		},
		hideDialog() {
			this.especialidadDialog = false;
			this.submitted = false;
		},
		editEspecialidad(especialidad){
			this.nuevo = true
			this.especialidadDialog = true
			this.especialidad = especialidad
		},
		saveEspecialidad() {//-------------------------------------------------------------
            this.submitted = true
            console.log(this.especialidad);
			const validacion =  !this.especialidad.nombreEspecialidad == '' && 
                                !this.especialidad.detalleEspecialidad == ''
            if (validacion) {
                if(!this.nuevo === true) {
                    fetch('http://18.230.199.15:8002/v1/especialidad', {
                    method: 'POST',
                    body: JSON.stringify(this.especialidad),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(() => {
                        this.getEspecialidades()
                        this.especialidad = new Especialidad();
                        this.especialidadDialog = false

                    });
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Pacient Created', life: 3000});		
                }else {
                    this.getEspecialidad(this.especialidad)
                    fetch('http://18.230.199.15:8002/v1/especialidad/' + this.especialidad._id, {
                    method: 'PUT',
                    body: JSON.stringify(this.especialidad),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(() => {
                        this.getEspecialidades();
                        this.especialidad = new Especialidad();
                        this.especialidadDialog = false
                    });
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
                }
            }else{
                this.especialidadDialog = true
            }
		},
		getEspecialidad(especialidad) {
			this.nuevo = true
			fetch('http://18.230.199.15:8002/v1/especialidad/' + especialidad._id)
				.then(res => res.json())
				.then(data => {
				const { nombreEspecialidad, detalleEspecialidad } = data;
				this.especialidad = new Especialidad( nombreEspecialidad, detalleEspecialidad );
				this.especialidadDialog = true
				});
		},
		deleteEspecialidad() {
			fetch('http://18.230.199.15:8002/v1/especialidad/' + this.especialidad._id, {
				method: 'DELETE',
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				}
				})
				.then(res => res.json())
				.then(() => {
				this.getEspecialidades();
				this.especialidad = new Especialidad();
				});
				this.deleteEspecialidadDialog = false
				this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
		},
		confirmDeleteEspecialidad(especialidad) {
			this.especialidad = especialidad;
			this.deleteEspecialidadDialog = true;
		},
		exportCSV() {
			this.$refs.dt.exportCSV();
		},
		confirmDeleteSelected() {
			this.deleteEspecialidadsDialog = true;
		},
		deleteselectedEspecialidads() {
			for (let step = 0; step < this.selectedEspecialidads.length; step++) {
				fetch('http://18.230.199.15:8002/v1/especialidad/' + this.selectedEspecialidads[step]._id, {
					method: 'DELETE',
					headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
					}
					})
					.then(res => res.json())
					this.getEspecialidades();
			}
			this.deleteEspecialidadsDialog = false;
			this.selectedEspecialidads = null;
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

.especialidad-image {
	width: 100px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .especialidad-image {
	width: 150px;
	margin: 0 auto 2rem auto;
	display: block;
}

.confirmation-content {
	display: flex;
	align-items: center;
	justify-content: center;
}

.especialidad-badge {
	border-radius: 2px;
	padding: .25em .5rem;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 12px;
	letter-spacing: .3px;

	&.dniEspecialidad-instock {
		background: #C8E6C9;
		color: #256029;
	}

	&.dniEspecialidad-outofstock {
		background: #FFCDD2;
		color: #C63737;
	}

	&.dniEspecialidad-lowstock {
		background: #FEEDAF;
		color: #8A5340;
	}
}
</style>
