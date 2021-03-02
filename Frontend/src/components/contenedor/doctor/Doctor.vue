<template>
	<div class="p-grid crud-demo">
		<div class="p-col-12">
			<div>
				<Toast/>
				<Toolbar class="p-mb-4">
					<template v-slot:left>
						<Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
						<Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedDoctors || !selectedDoctors.length" />
					</template>

					<template v-slot:right>
						<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="p-mr-2 p-d-inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>

				<DataTable ref="dt" :value="doctores" v-model:selection="selectedDoctors" dataKey="_id" :paginator="true" :rows="15" :filters="filters"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" :rowsPerPageOptions="[15,75,100]"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
					<template #header>
						<div class="table-header">
							<h5 class="p-m-0">Administrar Doctors</h5>
							<span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global']" placeholder="Search..." />
                            </span>
						</div>
					</template>

					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
					<Column field="nombreDoctor" header="Nombres" :sortable="true"></Column>
                    <Column field="apellidoDoctor" header="Apellido" :sortable="true"></Column>
					<Column field="estadoDoctor" header="Status" :sortable="true"></Column>
                    <Column field="nombreEspecialidad" header="Especialidad" :sortable="true"></Column>
					<Column>
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editDoctor(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteSector(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="doctorDialog" :style="{width: '450px'}" :header="cambiarHeader" :modal="true" :class="cambiarColor">	

					<!-- <img :src="'assets/layout/images/product/' + product.image" :alt="product.image" class="product-image" v-if="product.image" /> -->
					<div class="p-field">
						<label for="estadoDoctor">Status Doctor</label>
						<Dropdown id="estadoDoctor" v-model="doctor.estadoDoctor" :options="estados" optionLabel="value" optionValue="text" placeholder="Select One" required="true" :class="{'p-invalid': submitted && !doctor.estadoDoctor}"></Dropdown>
					</div>
					<div class="p-field">
                        <label for="Especialidad">Especialidad</label>
						<Dropdown id="Especialidad" v-model="doctor.idEspecialidad" :options="especialidades" optionLabel="Especialidad" optionValue="idEspecialidad" placeholder="Select One" required="true" :class="{'p-invalid': submitted && !doctor.idCuentaPago}"></Dropdown>
                        <small class="p-invalid" v-if="submitted && !doctor.idEspecialidad">La especialidad es requerido.</small>
                    </div>
                    <div class="p-field">
                        <label for="nombreDoctor">Nombre Doctor</label>
                        <InputText id="nombreDoctor" v-model.trim="doctor.nombreDoctor" required="true" autofocus :class="{'p-invalid': submitted && !doctor.nombreDoctor}" />
						<small class="p-invalid" v-if="submitted && !doctor.nombreDoctor">La descripcion es requerida.</small>
                    </div>
					<div class="p-field">
                        <label for="apellidoDoctor">Apellido Doctor</label>
                        <InputText id="apellidoDoctor" v-model.trim="doctor.apellidoDoctor" required="true" autofocus :class="{'p-invalid': submitted && !doctor.apellidoDoctor}" />
                        <small class="p-invalid" v-if="submitted && !doctor.apellidoDoctor">El nombre del doctor es requerido.</small>
                    </div>

                    
<!-- 					<div class="p-field">
						<label for="idTorre">Doctor</label>
						<Dropdown id="idTorre" v-model="doctoresDetalle.idTorre" :options="torresResumido" optionLabel="text" optionValue="value" placeholder="Select One" required="true" :class="{'p-invalid': submitted && !doctoresDetalle.idTorre}"></Dropdown>
					</div> -->
					<template #footer>
						<Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveDoctor" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteDoctorDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="doctor">Are you sure you want to delete <b>{{doctor.nameSector}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteDoctorDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteDoctor(doctor)" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteDoctorsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="doctor">Are you sure you want to delete the selected products?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteDoctorsDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedDoctors" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>

class Doctor {
  constructor( nombreDoctor = '',apellidoDoctor = '',estadoDoctor = '' ,nombreEspecialidad = '', idEspecialidad = '') {

    this.nombreDoctor = nombreDoctor;
	this.apellidoDoctor = apellidoDoctor;
	this.estadoDoctor = estadoDoctor;
    this.nombreEspecialidad = nombreEspecialidad;
	this.idEspecialidad = idEspecialidad;
  }
}

class Especialidad {
  constructor( nombreEspecialidad = '',detalleEspecialidad = '') {

    this.nombreEspecialidad = nombreEspecialidad;
	this.detalleEspecialidad = detalleEspecialidad;
	
  }
}
import axios from 'axios';
export default {
	data() {
		return {
			status:null,
			estados: [
				{ value: 'Activo', text: 'Activo' },
				{ value: 'Inactivo', text: 'Inactivo' }
			],
			doctor: new Doctor(),//usar
            doctores: [],
			doctorDialog: false,//usar
			nuevo: false,
			deleteDoctorDialog: false,
			deleteDoctorsDialog: false,
			selectedSector: null,
			selectedDoctors: null,
			filters: {},
			submitted: false,

			especialidad: new Especialidad(),
			especialidades: [],
			especialidadesres: [],

			torres:[],
			torresResumido: [],
		}
	},
	created() {
        this.Inicializar()
	},
	mounted() {
        //this.getDoctores()
	},
	methods: {
		async Inicializar(){//en uso
			await this.getDoctores()
			await this.getEspecialidades()
		},
		async getDoctores(){
			await axios.get('http://localhost:8002/v1/doctoresdetalles')
			.then(data => {
				this.doctores = data.data
			})
		},
		async getEspecialidades(){
			await axios.get('http://localhost:8002/v1/especialidad')
			.then(data => {
				this.especialidadesres = data.data
				for (let index = 0; index < this.especialidadesres.length; index++) {
					this.especialidades.push({'idEspecialidad': this.especialidadesres[index]._id, 'Especialidad':  this.especialidadesres[index].nombreEspecialidad })	
				}
			})
		},
		formatCurrency(value) {
			return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
		},
		openNew() {
			this.doctor = new Doctor();
			this.doctorDialog = true
			
			this.submitted = false;
			this.nuevo = false;
		},
		hideDialog() {
			this.doctorDialog = false;
			this.submitted = false;
		},
		editDoctor(doctor){
            this.doctor = doctor
			this.nuevo = true
			this.doctorDialog = true
			console.log(this.doctor);
		},
		saveDoctor() {//-------------------------------------------------------------
			this.submitted = true
			//console.log(this.doctor);
			const validacion =  !this.doctor.estadoDoctor == '' && 
                                !this.doctor.nombreDoctor == '' &&
                                !this.doctor.apellidoDoctor == '' &&
								!this.doctor.idEspecialidad == '' 
            
			if (validacion) {
                if(!this.nuevo === true) {
                    fetch('http://localhost:8002/v1/doctor', {
                    method: 'POST',
                    body: JSON.stringify(this.doctor),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(() => {
                        this.getDoctores()
                        this.doctor = new Doctor();
                        this.doctorDialog = false
					
					});
					console.log('estoy en post');
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});		
                }else {
                    fetch('http://localhost:8002/v1/doctor/' + this.doctor._id, {
                    method: 'PUT',
                    body: JSON.stringify(this.doctor),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(() => {
                        this.getDoctores();
                        this.doctorDialog = false
					});
					console.log('estoy en put');
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
                }
            }else{
				console.log('estoy en else ');
                this.doctorDialog = true
            }
		},
		deleteDoctor() {
			fetch('http://localhost:8002/v1/doctor/' + this.doctor._id, {
				method: 'DELETE',
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				}
				})
				.then(res => res.json())
				.then(() => {
				this.getDoctores();
				this.doctor = new Doctor();
				});
				this.deleteDoctorDialog = false
				this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
		},
		confirmDeleteSector(doctor) {
			this.doctor = doctor;
			this.deleteDoctorDialog = true;
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
			this.deleteDoctorsDialog = true;
		},
		deleteSelectedDoctors() {
			for (let step = 0; step < this.selectedDoctors.length; step++) {
				fetch('http://localhost:8002/v1/doctor/' + this.selectedDoctors[step]._id, {
					method: 'DELETE',
					headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
					}
					})
					.then(res => res.json())
					this.getDoctores();
			}
			this.deleteDoctorsDialog = false;
			this.selectedDoctors = null;
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

.doctor-image {
	width: 100px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .doctor-image {
	width: 150px;
	margin: 0 auto 2rem auto;
	display: block;
}

.confirmation-content {
	display: flex;
	align-items: center;
	justify-content: center;
}

.doctor-badge {
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
