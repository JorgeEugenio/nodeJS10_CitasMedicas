<template>
	<div class="p-grid crud-demo">
		<div class="p-col-12">
			<div>
				<Toast/>
				<Toolbar class="p-mb-4">
					<template v-slot:left>
						<Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
						<Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedQuerys || !selectedQuerys.length" />
					</template>

					<template v-slot:right>
						<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="p-mr-2 p-d-inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>

				<DataTable ref="dt" :value="querys" v-model:selection="selectedQuerys" dataKey="_id" :paginator="true" :rows="10" :filters="filters"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
					<template #header>
						<div class="table-header">
							<h5 class="p-m-0">Administrar Querys</h5>
							<span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global']" placeholder="Search..." />
                            </span>
						</div>
					</template>

					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
					<Column field="project" header="Proyecto" :sortable="true"></Column>
                    <Column field="query" header="Coleccion" :sortable="true"></Column>
                    <Column field="rutaQuery" header="Url" :sortable="true"></Column>
					<Column field="tipoQuery" header="Tipo" :sortable="true"></Column>
					<Column>
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editQuery(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteQuery(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="queryDialog" :style="{width: '450px'}" :header="cambiarHeader" :modal="true" :class="cambiarColor">	
                    <div class="p-field">
                        <label for="project">Nombre Query</label>
                        <InputText id="project" v-model.trim="query.project" required="true" autofocus :class="{'p-invalid': submitted && !query.project}" />
                        <small class="p-invalid" v-if="submitted && !query.project">El nombre del query es requerido.</small>
                    </div>
                    <div class="p-field">
                        <label for="query">Tipo</label>
                        <InputText id="query" v-model.trim="query.query" required="true" autofocus :class="{'p-invalid': submitted && !query.query}" />
						<small class="p-invalid" v-if="submitted && !query.query">La query es requerida.</small>
                    </div>
                    <div class="p-field">
                        <label for="rutaQuery">Query</label>
                        <InputText id="rutaQuery" v-model.trim="query.rutaQuery" required="true" autofocus :class="{'p-invalid': submitted && !query.rutaQuery}" >
                            <template >
                                <a ref="rutaQuery">{{rutaQuery}}</a>
                            </template>
                        </InputText>/>
                        <small class="p-invalid" v-if="submitted && !query.rutaQuery">El nombre del query es requerido.</small>
                    </div>
                    <div class="p-field">
                        <label for="tipoQuery">Tipo</label>
                        <InputText id="tipoQuery" v-model.trim="query.tipoQuery" required="true" autofocus :class="{'p-invalid': submitted && !query.tipoQuery}" />
						<small class="p-invalid" v-if="submitted && !query.tipoQuery">La tipoQuery es requerida.</small>
                    </div>
					<template #footer>
						<Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveQuery" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteQueryDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="query">Are you sure you want to delete <b>{{query.name}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteQueryDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteQuery(query)" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteQuerysDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="query">Are you sure you want to delete the selected products?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteQuerysDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteselectedQuerys" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>
class Query {
  constructor( project ='', query = '', rutaQuery ='', tipoQuery = '' ) {

    this.project = project;
    this.query = query;
    this.rutaQuery = rutaQuery;
    this.tipoQuery = tipoQuery;
  }
}

export default {
	data() {
		return {
			query: new Query(),//usar
			querys: [],
			queryDialog: false,//usar
			nuevo: false,
			deleteQueryDialog: false,
			deleteQuerysDialog: false,
			selectedQuery: null,
			selectedQuerys: null,
			filters: {},
			submitted: false
		}
	},
	created() {
		this.getQuerys()
	},
	mounted() {

		//this.getQuerys()
	},
	methods: {
		getQuerys(){
			fetch('http://18.230.199.15:8002/v1/query')
			.then(res => res.json())
			.then(data => {
				this.querys = data

			})
		},
		formatCurrency(value) {
			return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
		},
		openNew() {
			this.query = new Query();
			this.queryDialog = true
			
			this.submitted = false;
			this.nuevo = false
		},
		hideDialog() {
			this.queryDialog = false;
			this.submitted = false;
		},
		editQuery(query){
			this.nuevo = true
			this.queryDialog = true
			this.query = query
		},
		saveQuery() {//-------------------------------------------------------------
            this.submitted = true
			const validacion =  !this.query.project == '' && 
                                !this.query.query == '' && 
								!this.query.rutaQuery == '' && 
                                !this.query.tipoQuery == '' 
            if (validacion) {
                if(!this.nuevo === true) {
                    fetch('http://18.230.199.15:8002/v1/query', {
                    method: 'POST',
                    body: JSON.stringify(this.query),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(() => {
                        this.getQuerys()
                        this.query = new Query();
                        this.queryDialog = false

                    });
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Pacient Created', life: 3000});		
                }else {
                    this.getQuery(this.query)
                    fetch('http://18.230.199.15:8002/v1/query/' + this.query._id, {
                    method: 'PUT',
                    body: JSON.stringify(this.query),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(() => {
                        this.getQuerys();
                        this.query = new Query();
                        this.queryDialog = false
                    });
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
                }
            }else{
                this.queryDialog = true
            }
		},
		getQuery(query) {
			this.nuevo = true
			fetch('http://18.230.199.15:8002/v1/query/' + query._id)
				.then(res => res.json())
				.then(data => {
				const { project, query , rutaQuery, tipoQuery } = data;
				this.query = new Query( project, query , rutaQuery, tipoQuery );
				this.queryDialog = true
				});
		},
		deleteQuery() {
			fetch('http://18.230.199.15:8002/v1/query/' + this.query._id, {
				method: 'DELETE',
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				}
				})
				.then(res => res.json())
				.then(() => {
				this.getQuerys();
				this.query = new Query();
				});
				this.deleteQueryDialog = false
				this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
		},
		confirmDeleteQuery(query) {
			this.query = query;
			this.deleteQueryDialog = true;
		},
		exportCSV() {
			this.$refs.dt.exportCSV();
		},
		confirmDeleteSelected() {
			this.deleteQuerysDialog = true;
		},
		deleteselectedQuerys() {
			for (let step = 0; step < this.selectedQuerys.length; step++) {
				fetch('http://18.230.199.15:8002/v1/query/' + this.selectedQuerys[step]._id, {
					method: 'DELETE',
					headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
					}
					})
					.then(res => res.json())
			}
			this.deleteQuerysDialog = false;
			this.selectedQuerys = null;
			this.getQuerys();
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

.query-image {
	width: 100px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .query-image {
	width: 150px;
	margin: 0 auto 2rem auto;
	display: block;
}

.confirmation-content {
	display: flex;
	align-items: center;
	justify-content: center;
}

.query-badge {
	border-radius: 2px;
	padding: .25em .5rem;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 12px;
	letter-spacing: .3px;

	&.correoQuery-instock {
		background: #C8E6C9;
		color: #256029;
	}

	&.correoQuery-outofstock {
		background: #FFCDD2;
		color: #C63737;
	}

	&.correoQuery-lowstock {
		background: #FEEDAF;
		color: #8A5340;
	}
}
</style>
