<template>
	<div class="p-grid crud-demo">
		<div class="p-col-12">
			<div>
				<Toast/>
				<Toolbar class="p-mb-4">
					<template v-slot:left>
						<Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
						<Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedUsuarios || !selectedUsuarios.length" />
					</template>

					<template v-slot:right>
						<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="p-mr-2 p-d-inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>

				<DataTable ref="dt" :value="usuarios" v-model:selection="selectedUsuarios" dataKey="_id" :paginator="true" :rows="10" :filters="filters"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
					<template #header>
						<div class="table-header">
							<h5 class="p-m-0">Administrar Usuarios</h5>
							<span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global']" placeholder="Search..." />
                            </span>
						</div>
					</template>

					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
					<Column field="nombreUsuario" header="Nombre Usuario" :sortable="true"></Column>
                    <Column field="apellidoUsuario" header="Apellido Usuario" :sortable="true"></Column>
					<Column field="user" header="User" :sortable="true"></Column>
                    <Column field="pass" header="Pass" :sortable="true"></Column>
                    <Column field="correoUsuario" header="Correo" :sortable="true"></Column>
					<Column>
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editUsuario(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteUsuario(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="usuarioDialog" :style="{width: '450px'}" :header="cambiarHeader" :modal="true" :class="cambiarColor">	
                    <div class="p-field">
                        <label for="nombreUsuario">Nombre Usuario</label>
                        <InputText id="nombreUsuario" v-model.trim="usuario.nombreUsuario" required="true" autofocus :class="{'p-invalid': submitted && !usuario.nombreUsuario}" />
                        <small class="p-invalid" v-if="submitted && !usuario.nombreUsuario">El nombre del usuario es requerido.</small>
                    </div>
                    <div class="p-field">
                        <label for="apellidoUsuario">Apellido Usuario</label>
                        <InputText id="apellidoUsuario" v-model.trim="usuario.apellidoUsuario" required="true" autofocus :class="{'p-invalid': submitted && !usuario.apellidoUsuario}" />
                        <small class="p-invalid" v-if="submitted && !usuario.apellidoUsuario">El nombre del usuario es requerido.</small>
                    </div>
                    <div class="p-field">
                        <label for="user">User</label>
                        <InputText id="user" v-model.trim="usuario.user" required="true" autofocus :class="{'p-invalid': submitted && !usuario.user}" />
						<small class="p-invalid" v-if="submitted && !usuario.user">La user es requerida.</small>
                    </div>
                    <div class="p-field">
                        <label for="pass">Pass</label>
                        <InputText id="pass" v-model.trim="usuario.pass" required="true" autofocus :class="{'p-invalid': submitted && !usuario.pass}" />
						<small class="p-invalid" v-if="submitted && !usuario.pass">La pass es requerida.</small>
                    </div>
					<div class="p-field">
                        <label for="correoUsuario">Correo Usuario</label>
                        <InputText id="correoUsuario" v-model.trim="usuario.correoUsuario" required="true" autofocus :class="{'p-invalid': submitted && !usuario.correoUsuario}" />
						<small class="p-invalid" v-if="submitted && !usuario.user">El correo es requerida.</small>
                    </div>
					<template #footer>
						<Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveUsuario" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteUsuarioDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="usuario">Are you sure you want to delete <b>{{usuario.name}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteUsuarioDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteUsuario(usuario)" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteUsuariosDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="usuario">Are you sure you want to delete the selected products?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteUsuariosDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteselectedUsuarios" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>
class Usuario {
  constructor( nombreUsuario ='', apellidoUsuario ='', user = '', pass = '', correoUsuario = '') {

    this.nombreUsuario = nombreUsuario;
    this.apellidoUsuario = apellidoUsuario;
    this.user = user;
    this.pass = pass;
    this.correoUsuario = correoUsuario;
  }
}

export default {
	data() {
		return {
			usuario: new Usuario(),//usar
			usuarios: [],
			usuarioDialog: false,//usar
			nuevo: false,
			deleteUsuarioDialog: false,
			deleteUsuariosDialog: false,
			selectedUsuario: null,
			selectedUsuarios: null,
			filters: {},
			submitted: false
		}
	},
	created() {
		this.getUsuarios()
	},
	mounted() {

		//this.getUsuarios()
	},
	methods: {
		getUsuarios(){
			fetch('http://localhost:8002/v1/usuario')
			.then(res => res.json())
			.then(data => {
				this.usuarios = data

			})
		},
		formatCurrency(value) {
			return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
		},
		openNew() {
			this.usuario = new Usuario();
			this.usuarioDialog = true
			
			this.submitted = false;
			this.nuevo = false
		},
		hideDialog() {
			this.usuarioDialog = false;
			this.submitted = false;
		},
		editUsuario(usuario){
			this.nuevo = true
			this.usuarioDialog = true
			this.usuario = usuario
		},
		saveUsuario() {//-------------------------------------------------------------
            this.submitted = true
			const validacion =  !this.usuario.correoUsuario == '' && 
								!this.usuario.nombreUsuario == '' && 
                                !this.usuario.apellidoUsuario == '' && 
                                !this.usuario.user == '' &&
                                !this.usuario.pass == '' 
            if (validacion) {
                if(!this.nuevo === true) {
                    fetch('http://localhost:8002/v1/usuario', {
                    method: 'POST',
                    body: JSON.stringify(this.usuario),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(() => {
                        this.getUsuarios()
                        this.usuario = new Usuario();
                        this.usuarioDialog = false

                    });
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Pacient Created', life: 3000});		
                }else {
                    this.getUsuario(this.usuario)
                    fetch('http://localhost:8002/v1/usuario/' + this.usuario._id, {
                    method: 'PUT',
                    body: JSON.stringify(this.usuario),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(() => {
                        this.getUsuarios();
                        this.usuario = new Usuario();
                        this.usuarioDialog = false
                    });
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
                }
            }else{
                this.usuarioDialog = true
            }
		},
		getUsuario(usuario) {
			this.nuevo = true
			fetch('http://localhost:8002/v1/usuario/' + usuario._id)
				.then(res => res.json())
				.then(data => {
				const { nombreUsuario, user, pass, correoUsuario } = data;
				this.usuario = new Usuario( nombreUsuario, nombreUsuario, user, pass, correoUsuario );
				this.usuarioDialog = true
				});
		},
		deleteUsuario() {
			fetch('http://localhost:8002/v1/usuario/' + this.usuario._id, {
				method: 'DELETE',
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				}
				})
				.then(res => res.json())
				.then(() => {
				this.getUsuarios();
				this.usuario = new Usuario();
				});
				this.deleteUsuarioDialog = false
				this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
		},
		confirmDeleteUsuario(usuario) {
			this.usuario = usuario;
			this.deleteUsuarioDialog = true;
		},
		exportCSV() {
			this.$refs.dt.exportCSV();
		},
		confirmDeleteSelected() {
			this.deleteUsuariosDialog = true;
		},
		deleteselectedUsuarios() {
			for (let step = 0; step < this.selectedUsuarios.length; step++) {
				fetch('http://localhost:8002/v1/usuario/' + this.selectedUsuarios[step]._id, {
					method: 'DELETE',
					headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
					}
					})
					.then(res => res.json())
			}
			this.deleteUsuariosDialog = false;
			this.selectedUsuarios = null;
			this.getUsuarios();
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

.usuario-image {
	width: 100px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .usuario-image {
	width: 150px;
	margin: 0 auto 2rem auto;
	display: block;
}

.confirmation-content {
	display: flex;
	align-items: center;
	justify-content: center;
}

.usuario-badge {
	border-radius: 2px;
	padding: .25em .5rem;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 12px;
	letter-spacing: .3px;

	&.correoUsuario-instock {
		background: #C8E6C9;
		color: #256029;
	}

	&.correoUsuario-outofstock {
		background: #FFCDD2;
		color: #C63737;
	}

	&.correoUsuario-lowstock {
		background: #FEEDAF;
		color: #8A5340;
	}
}
</style>
