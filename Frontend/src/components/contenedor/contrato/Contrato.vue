<template>
	<div class="p-grid">
		<div class="p-col-12">
			<div class="card">
				<DataTable ref="dt" :value="contratos" v-model:selection="selectedProducts" dataKey="id" :paginator="true" :rows="100" :filters="filters"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" :rowsPerPageOptions="[150,175,200]"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
					<template #header>
						<div class="table-header">
							<h5 class="p-m-0">Contratos</h5>
							<span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global']" placeholder="Search..." />
                            </span>
						</div>
					</template>
					<Column field="codigoBoleta" header="Code" :sortable="true"></Column>
					<Column field="fechaAnio" header="Año" :sortable="true"></Column>
					<Column field="fechaMes" header="Mes" :sortable="true"></Column>
                    <Column field="serviciosContratados.nombreServicio" header="Servicio" :sortable="true"></Column>
                    <Column field="serviciosContratados.costoServicio" header="Costo" :sortable="true"></Column>

				</DataTable>

			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
            return {
                products: null,
                productDialog: false,
                deleteProductDialog: false,
                deleteProductsDialog: false,
                product: {},
                selectedProducts: null,
                filters: {},
                submitted: false,
                contratos: []
            }
        },
        created() {
            this.getContratos()
        },
        mounted() {
            
        },
        methods: {
            async getContratos(){
                await axios.get('http://localhost:8000/v1/boletadetalle/')
                .then(data => {
                this.contratos = data.data
                //console.log(this.contratos);
                });
            }
        }
    
}
</script>

<style scoped>

</style>
