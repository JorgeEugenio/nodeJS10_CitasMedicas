<template>
	<div class="p-grid">
		<div class="p-col-12">
			<div class="card">
				<DataTable ref="dt" :value="resultado" dataKey="_id" :paginator="true" :rows="100" :filters="filters1" :loading="loading1"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" :rowsPerPageOptions="[25,50,100]"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} clientes">
					<template #header>
						<div class="table-header">
							<h5 class="p-m-0">Detalles del Boleta</h5>
							<span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters1['global']" placeholder="Search..." />
                            </span>
						</div>
					</template>
				<DataTable>
					<ColumnGroup type="header">
						<Row>
							<Column header="PAGADO" :colspan="2" style="text-align: center;"></Column>
							<Column :header="montoestadistico.mes01.cuentaPagado" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes02.cuentaPagado" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes03.cuentaPagado" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes04.cuentaPagado" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes05.cuentaPagado" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes06.cuentaPagado" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes07.cuentaPagado" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes08.cuentaPagado" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes09.cuentaPagado" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes10.cuentaPagado" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes11.cuentaPagado" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes12.cuentaPagado" :rowspan="1"></Column>
							<Column header="" :rowspan="1"></Column>
							<Column header="" :rowspan="1"></Column>
						</Row>
						<Row>
							<Column header="PENDIENTE" :colspan="2" class="cliente-badge status-pendiente"></Column>
							<Column :header="montoestadistico.mes01.cuentaPendiente" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes02.cuentaPendiente" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes03.cuentaPendiente" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes04.cuentaPendiente" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes05.cuentaPendiente" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes06.cuentaPendiente" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes07.cuentaPendiente" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes08.cuentaPendiente" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes09.cuentaPendiente" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes10.cuentaPendiente" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes11.cuentaPendiente" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes12.cuentaPendiente" :rowspan="1"></Column>
							<Column header="" :rowspan="1"></Column>
							<Column header="" :rowspan="1"></Column>
						</Row>
						<Row>
							<Column header="VACIO" :colspan="2" class="cliente-badge status-Vacio"></Column>
							<Column :header="montoestadistico.mes01.cuentaVacio" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes02.cuentaVacio" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes03.cuentaVacio" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes04.cuentaVacio" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes05.cuentaVacio" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes06.cuentaVacio" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes07.cuentaVacio" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes08.cuentaVacio" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes09.cuentaVacio" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes10.cuentaVacio" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes11.cuentaVacio" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes12.cuentaVacio" :rowspan="1"></Column>
							<Column header="" :rowspan="1"></Column>
							<Column header="" :rowspan="1"></Column>
						</Row>
						<Row>
							<Column header="M Pagado" :colspan="2" class="cliente-badge status-Vacio"></Column>
							<Column :header="montoestadistico.mes01.montoPagado" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes02.montoPagado" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes03.montoPagado" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes04.montoPagado" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes05.montoPagado" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes06.montoPagado" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes07.montoPagado" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes08.montoPagado" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes09.montoPagado" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes10.montoPagado" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes11.montoPagado" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes12.montoPagado" :rowspan="1"></Column>
							<Column :header="montoTotalPagado" ></Column>
							<Column header="" ></Column>
						</Row>
						<Row>
							<Column header="M Pendiente" :colspan="2" class="cliente-badge status-Vacio"></Column>
							<Column :header="montoestadistico.mes01.montoPendiente" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes02.montoPendiente" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes03.montoPendiente" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes04.montoPendiente" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes05.montoPendiente" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes06.montoPendiente" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes07.montoPendiente" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes08.montoPendiente" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes09.montoPendiente" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes10.montoPendiente" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes11.montoPendiente" :rowspan="1"></Column>
							<Column :header="montoestadistico.mes12.montoPendiente" :rowspan="1"></Column>
							<Column :header="montoTotalPendiente" :rowspan="1"></Column>
							<Column header="" :rowspan="1"></Column>
						</Row>
					</ColumnGroup>
				</DataTable>
					
					<Column field="codigoCliente" header="Codigo" :sortable="true"></Column>
					<Column field="nombreCliente" header="Cliente" :sortable="true"></Column>
					<Column field="meses.mes01.statusPago" header="Enero" :sortable="true">
						<template #body="slotProps">
							<span >{{slotProps.data.meses.mes01.monto}}</span><br>
							<span :class="'order-badge order-' + slotProps.data.meses.mes01.statusPago">{{slotProps.data.meses.mes01.statusPago}}</span>
						</template>
					</Column>
					<Column field="meses.mes02.statusPago" header="Febrero" :sortable="true">
						<template #body="slotProps">
							<span >{{slotProps.data.meses.mes02.monto}}</span><br>
							<span :class="'order-badge order-' + slotProps.data.meses.mes02.statusPago">{{slotProps.data.meses.mes02.statusPago}}</span>
						</template></Column>
					<Column field="meses.mes03.statusPago" header="Marzo" :sortable="true">
						<template #body="slotProps">
							<span >{{slotProps.data.meses.mes03.monto}}</span><br>
							<span :class="'order-badge order-' + slotProps.data.meses.mes03.statusPago">{{slotProps.data.meses.mes03.statusPago}}</span>
						</template></Column>
					<Column field="meses.mes04.statusPago" header="Abril" :sortable="true">
						<template #body="slotProps">
							<span >{{slotProps.data.meses.mes04.monto}}</span><br>
							<span :class="'order-badge order-' + slotProps.data.meses.mes04.statusPago">{{slotProps.data.meses.mes04.statusPago}}</span>
						</template></Column>
					<Column field="meses.mes05.statusPago" header="Mayo" :sortable="true">
						<template #body="slotProps">
							<span >{{slotProps.data.meses.mes05.monto}}</span><br>
							<span :class="'order-badge order-' + slotProps.data.meses.mes05.statusPago">{{slotProps.data.meses.mes05.statusPago}}</span>
						</template>
					</Column>
					<Column field="meses.mes06.statusPago" header="Junio" :sortable="true">
						<template #body="slotProps">
							<span >{{slotProps.data.meses.mes06.monto}}</span><br>
							<span :class="'order-badge order-' + slotProps.data.meses.mes06.statusPago">{{slotProps.data.meses.mes06.statusPago}}</span>
						</template>
					</Column>
					<Column field="meses.mes07.statusPago" header="Julio" :sortable="true">
						<template #body="slotProps">
							<span >{{slotProps.data.meses.mes07.monto}}</span><br>
							<span :class="'order-badge order-' + slotProps.data.meses.mes07.statusPago">{{slotProps.data.meses.mes07.statusPago}}</span>
						</template>
					</Column>
					<Column field="meses.mes08.statusPago" header="Agosto"  :sortable="true">
						<template #body="slotProps">
							<span >{{slotProps.data.meses.mes08.monto}}</span><br>
							<span :class="'order-badge order-' + slotProps.data.meses.mes08.statusPago">{{slotProps.data.meses.mes08.statusPago}}</span>
						</template>
					</Column>
					<Column field="meses.mes09.statusPago" header="Setiembre"  :sortable="true">
						<template #body="slotProps">
							<span >{{slotProps.data.meses.mes09.monto}}</span><br>
							<span :class="'order-badge order-' + slotProps.data.meses.mes09.statusPago">{{slotProps.data.meses.mes09.statusPago}}</span>
						</template>
					</Column>
					<Column field="meses.mes10.statusPago" header="Octubre"  :sortable="true">
						<template #body="slotProps">
							<span >{{slotProps.data.meses.mes10.monto}}</span><br>
							<span :class="'order-badge order-' + slotProps.data.meses.mes10.statusPago">{{slotProps.data.meses.mes10.statusPago}}</span>
						</template>
					</Column>
					<Column field="meses.mes11.statusPago" header="Noviembre"  :sortable="true">
						<template #body="slotProps">
							<span >{{slotProps.data.meses.mes11.monto}}</span><br>
							<span :class="'order-badge order-' + slotProps.data.meses.mes11.statusPago">{{slotProps.data.meses.mes11.statusPago}}</span>
						</template>
					</Column>
					<Column field="meses.mes12.statusPago" header="Diciembre" :sortable="true">
						<template #body="slotProps">
							<span >{{slotProps.data.meses.mes12.monto}}</span><br>
							<span :class="'order-badge order-' + slotProps.data.meses.mes12.statusPago">{{slotProps.data.meses.mes12.statusPago}}</span>
						</template>
					</Column>
					<Column field="statusUpdate" header="Actualizado" :sortable="true">
						<template #body="slotProps">
							<span :class="'cliente-badge status-'+ slotProps.data.statusUpdate">{{slotProps.data.statusUpdate}}</span>
						</template>
					</Column>
					<Column>
						<template #body="slotProps">
							<Button label="Detalles" icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="IrAClienteDetalle(slotProps.data)" />
						</template>
					</Column>
				</DataTable>
				
			</div>
		</div>


	</div>
</template>

<script>
class DMeses{
	constructor(mes01 = {'monto':'', 'statusPago':''}, mes02 = {'monto':'', 'statusPago':''}, mes03 = {'monto':'', 'statusPago':''}, mes04 = {'monto':'', 'statusPago':''}, mes05 = {'monto':'', 'statusPago':''}, mes06 = {'monto':'', 'statusPago':''}, mes07 = {'monto':'', 'statusPago':''}, mes08 = {'monto':'', 'statusPago':''}, mes09 = {'monto':'', 'statusPago':''}, mes10 = {'monto':'', 'statusPago':''}, mes11 = {'monto':'', 'statusPago':''}, mes12 = {'monto':'', 'statusPago':''}){
		this.mes01 = mes01
		this.mes02 = mes02
		this.mes03 = mes03
		this.mes04 = mes04
		this.mes05 = mes05
		this.mes06 = mes06
		this.mes07 = mes07
		this.mes08 = mes08
		this.mes09 = mes09
		this.mes10 = mes10
		this.mes11 = mes11
		this.mes12 = mes12
	}
}
class MontosEstadistico{
constructor(mes01 = {'cuentaPagado':0, 'cuentaPendiente':0, 'cuentaVacio':0, 'montoPagado':0, 'montoPendiente':0}, mes02 = {'cuentaPagado':0, 'cuentaPendiente':0, 'cuentaVacio':0, 'montoPagado':0, 'montoPendiente':0}, mes03 = {'cuentaPagado':0, 'cuentaPendiente':0, 'cuentaVacio':0, 'montoPagado':0, 'montoPendiente':0}, mes04 = {'cuentaPagado':0, 'cuentaPendiente':0, 'cuentaVacio':0, 'montoPagado':0, 'montoPendiente':0}, mes05 = {'cuentaPagado':0, 'cuentaPendiente':0, 'cuentaVacio':0, 'montoPagado':0, 'montoPendiente':0}, mes06 = {'cuentaPagado':0, 'cuentaPendiente':0, 'cuentaVacio':0, 'montoPagado':0, 'montoPendiente':0}, mes07 = {'cuentaPagado':0, 'cuentaPendiente':0, 'cuentaVacio':0, 'montoPagado':0, 'montoPendiente':0}, mes08 = {'cuentaPagado':0, 'cuentaPendiente':0, 'cuentaVacio':0, 'montoPagado':0, 'montoPendiente':0}, mes09 = {'cuentaPagado':0, 'cuentaPendiente':0, 'cuentaVacio':0, 'montoPagado':0, 'montoPendiente':0}, mes10 = {'cuentaPagado':0, 'cuentaPendiente':0, 'cuentaVacio':0, 'montoPagado':0, 'montoPendiente':0}, mes11 = {'cuentaPagado':0, 'cuentaPendiente':0, 'cuentaVacio':0, 'montoPagado':0, 'montoPendiente':0}, mes12 = {'cuentaPagado':0, 'cuentaPendiente':0, 'cuentaVacio':0, 'montoPagado':0, 'montoPendiente':0}){
		this.mes01 = mes01
		this.mes02 = mes02
		this.mes03 = mes03
		this.mes04 = mes04
		this.mes05 = mes05
		this.mes06 = mes06
		this.mes07 = mes07
		this.mes08 = mes08
		this.mes09 = mes09
		this.mes10 = mes10
		this.mes11 = mes11
		this.mes12 = mes12
	}
		
}


	import CustomerService from "../../../service/CustomerService";
	import ProductService from '../../../service/ProductService';
	import axios from 'axios';
	export default {
		data() {
			return {
				customer1: null,
				customer2: null,
				customer3: null,
				selectedCustomers1: null,
				selectedCustomers2: null,
				filters1: {},
				filters2: {},
				loading1: true,
				loading2: true,
				products: null,
				expandedRows: [],
				clientes: [],
				boletas: [],
				resultado:[],
				detalleMeses : new DMeses(),
				montosestadisticos: [],
				montoestadistico: new MontosEstadistico(),
				montoTotalPagado: 0,
				montoTotalPendiente: 0,
			}
		},
		customerService: null,
		productService: null,
		created() {
			this.customerService = new CustomerService();
			this.productService = new ProductService();
			this.Inicializar()
		},
		mounted() {
			this.productService.getProductsWithOrdersSmall().then(data => this.products = data);
			this.customerService.getCustomersMedium().then(data => this.customer1 = data);
			this.customerService.getCustomersLarge().then(data => this.customer2 = data);
			this.customerService.getCustomersMedium().then(data => this.customer3 = data);
			this.loading1 = false;
			this.loading2 = false;
		},
		methods: {
			async Inicializar(){
				await this.getClientes()
				await this.getBoletas()
				await this.crearArreglo()
				
			},
			onRowExpand(event) {
				this.$toast.add({severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000});
			},
			onRowCollapse(event) {
				this.$toast.add({severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000});
			},
			expandAll() {
				this.expandedRows = this.products.filter(p => p.id);
				this.$toast.add({severity: 'success', summary: 'All Rows Expanded', life: 3000});
			},
			collapseAll() {
				this.expandedRows = null;
				this.$toast.add({severity: 'success', summary: 'All Rows Collapsed', life: 3000});
			},
			formatCurrency(value) {
				return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
			},
			calculateCustomerTotal(name) {
				let total = 0;

				if (this.customer3) {
					for (let customer of this.customer3) {
						if (customer.representative.name === name) {
							total++;
						}
					}
				}

				return total;
			},
			async getClientes(){
			await axios.get('http://localhost:8000/v1/cliente')
                .then(data => {
                this.clientes = data.data
                })
			},
			async getBoletas(){
			await axios.get('http://localhost:8000/v1/boleta')
				.then(data => {
				this.boletas = data.data
				})
			},
			async crearArreglo(){
				let resultado = []
				this.montoestadistico = new MontosEstadistico()
				for (let index1 = 0; index1 < this.clientes.length; index1++) {
					this.detalleMeses = new DMeses()
					for (let index2 = 0; index2 < this.boletas.length; index2++) {
						if (this.clientes[index1]._id == this.boletas[index2].idCliente && this.boletas[index2].fechaMes == '01') {
							if (this.boletas[index2].statusPago == 'pagado'){
								this.montoestadistico.mes01.montoPagado += this.boletas[index2].monto
								this.montoestadistico.mes01.cuentaPagado += 1
							}else if(this.boletas[index2].statusPago == 'pendiente'){
								this.montoestadistico.mes01.cuentaPendiente += 1 
								this.montoestadistico.mes01.montoPendiente += this.boletas[index2].monto
							}else if(this.boletas[index2].statusPago == ''){
								this.montoestadistico.mes01.cuentaVacio += 1
							}
							this.detalleMeses.mes01.monto = this.boletas[index2].monto
							this.detalleMeses.mes01.statusPago = this.boletas[index2].statusPago
							this.montoestadistico.mes01.cuentaVacio = this.clientes.length - this.montoestadistico.mes01.cuentaPagado - this.montoestadistico.mes01.cuentaPendiente
						}else if(this.clientes[index1]._id == this.boletas[index2].idCliente && this.boletas[index2].fechaMes == '02'){
							if (this.boletas[index2].statusPago == 'pagado'){
								this.montoestadistico.mes02.montoPagado += this.boletas[index2].monto
								this.montoestadistico.mes02.cuentaPagado += 1
							}else if(this.boletas[index2].statusPago == 'pendiente'){
								this.montoestadistico.mes02.cuentaPendiente += 1 
								this.montoestadistico.mes02.montoPendiente += this.boletas[index2].monto
							}else if(this.boletas[index2].statusPago == ''){
								this.montoestadistico.mes02.cuentaVacio += 1
							}
							this.detalleMeses.mes02.monto = this.boletas[index2].monto
							this.detalleMeses.mes02.statusPago = this.boletas[index2].statusPago
							this.montoestadistico.mes02.cuentaVacio = this.clientes.length - this.montoestadistico.mes02.cuentaPagado - this.montoestadistico.mes02.cuentaPendiente
						}else if(this.clientes[index1]._id == this.boletas[index2].idCliente && this.boletas[index2].fechaMes == '03'){
							if (this.boletas[index2].statusPago == 'pagado'){
								this.montoestadistico.mes03.montoPagado += this.boletas[index2].monto
								this.montoestadistico.mes03.cuentaPagado += 1
							}else if(this.boletas[index2].statusPago == 'pendiente'){
								this.montoestadistico.mes03.cuentaPendiente += 1 
								this.montoestadistico.mes03.montoPendiente += this.boletas[index2].monto
							}else if(this.boletas[index2].statusPago == ''){
								this.montoestadistico.mes03.cuentaVacio += 1
							}
							this.detalleMeses.mes03.monto = this.boletas[index2].monto
							this.detalleMeses.mes03.statusPago = this.boletas[index2].statusPago
							this.montoestadistico.mes03.cuentaVacio = this.clientes.length - this.montoestadistico.mes03.cuentaPagado - this.montoestadistico.mes03.cuentaPendiente
						}else if(this.clientes[index1]._id == this.boletas[index2].idCliente && this.boletas[index2].fechaMes == '04'){
							if (this.boletas[index2].statusPago == 'pagado'){
								this.montoestadistico.mes04.montoPagado += this.boletas[index2].monto
								this.montoestadistico.mes04.cuentaPagado += 1
							}else if(this.boletas[index2].statusPago == 'pendiente'){
								this.montoestadistico.mes04.cuentaPendiente += 1 
								this.montoestadistico.mes04.montoPendiente += this.boletas[index2].monto
							}else if(this.boletas[index2].statusPago == ''){
								this.montoestadistico.mes04.cuentaVacio += 1
							}
							this.detalleMeses.mes04.monto = this.boletas[index2].monto
							this.detalleMeses.mes04.statusPago = this.boletas[index2].statusPago
							this.montoestadistico.mes04.cuentaVacio = this.clientes.length - this.montoestadistico.mes04.cuentaPagado - this.montoestadistico.mes04.cuentaPendiente
						}else if(this.clientes[index1]._id == this.boletas[index2].idCliente && this.boletas[index2].fechaMes == '05'){
							if (this.boletas[index2].statusPago == 'pagado'){
								this.montoestadistico.mes05.montoPagado += this.boletas[index2].monto
								this.montoestadistico.mes05.cuentaPagado += 1
							}else if(this.boletas[index2].statusPago == 'pendiente'){
								this.montoestadistico.mes05.cuentaPendiente += 1 
								this.montoestadistico.mes05.montoPendiente += this.boletas[index2].monto
							}else if(this.boletas[index2].statusPago == ''){
								this.montoestadistico.mes05.cuentaVacio += 1
							}
							this.detalleMeses.mes05.monto = this.boletas[index2].monto
							this.detalleMeses.mes05.statusPago = this.boletas[index2].statusPago
							this.montoestadistico.mes05.cuentaVacio = this.clientes.length - this.montoestadistico.mes05.cuentaPagado - this.montoestadistico.mes05.cuentaPendiente
						}else if(this.clientes[index1]._id == this.boletas[index2].idCliente && this.boletas[index2].fechaMes == '06'){
							if (this.boletas[index2].statusPago == 'pagado'){
								this.montoestadistico.mes06.montoPagado += this.boletas[index2].monto
								this.montoestadistico.mes06.cuentaPagado += 1
							}else if(this.boletas[index2].statusPago == 'pendiente'){
								this.montoestadistico.mes06.cuentaPendiente += 1 
								this.montoestadistico.mes06.montoPendiente += this.boletas[index2].monto
							}else if(this.boletas[index2].statusPago == ''){
								this.montoestadistico.mes06.cuentaVacio += 1
							}
							this.detalleMeses.mes06.monto = this.boletas[index2].monto
							this.detalleMeses.mes06.statusPago = this.boletas[index2].statusPago
							this.montoestadistico.mes06.cuentaVacio = this.clientes.length - this.montoestadistico.mes06.cuentaPagado - this.montoestadistico.mes06.cuentaPendiente
						}else if(this.clientes[index1]._id == this.boletas[index2].idCliente && this.boletas[index2].fechaMes == '07'){
							if (this.boletas[index2].statusPago == 'pagado'){
								this.montoestadistico.mes07.montoPagado += this.boletas[index2].monto
								this.montoestadistico.mes07.cuentaPagado += 1
							}else if(this.boletas[index2].statusPago == 'pendiente'){
								this.montoestadistico.mes07.cuentaPendiente += 1 
								this.montoestadistico.mes07.montoPendiente += this.boletas[index2].monto
							}else if(this.boletas[index2].statusPago == ''){
								this.montoestadistico.mes07.cuentaVacio += 1
							}
							this.detalleMeses.mes07.monto = this.boletas[index2].monto
							this.detalleMeses.mes07.statusPago = this.boletas[index2].statusPago
							this.montoestadistico.mes07.cuentaVacio = this.clientes.length - this.montoestadistico.mes07.cuentaPagado - this.montoestadistico.mes07.cuentaPendiente
						}else if(this.clientes[index1]._id == this.boletas[index2].idCliente && this.boletas[index2].fechaMes == '08'){
							if (this.boletas[index2].statusPago == 'pagado'){
								this.montoestadistico.mes08.montoPagado += this.boletas[index2].monto
								this.montoestadistico.mes08.cuentaPagado += 1
							}else if(this.boletas[index2].statusPago == 'pendiente'){
								this.montoestadistico.mes08.cuentaPendiente += 1 
								this.montoestadistico.mes08.montoPendiente += this.boletas[index2].monto
							}else if(this.boletas[index2].statusPago == ''){
								this.montoestadistico.mes08.cuentaVacio += 1
							}
							this.detalleMeses.mes08.monto = this.boletas[index2].monto
							this.detalleMeses.mes08.statusPago = this.boletas[index2].statusPago
							this.montoestadistico.mes08.cuentaVacio = this.clientes.length - this.montoestadistico.mes08.cuentaPagado - this.montoestadistico.mes08.cuentaPendiente
						}else if(this.clientes[index1]._id == this.boletas[index2].idCliente && this.boletas[index2].fechaMes == '09'){
							if (this.boletas[index2].statusPago == 'pagado'){
								this.montoestadistico.mes09.montoPagado += this.boletas[index2].monto
								this.montoestadistico.mes09.cuentaPagado += 1
							}else if(this.boletas[index2].statusPago == 'pendiente'){
								this.montoestadistico.mes09.cuentaPendiente += 1 
								this.montoestadistico.mes09.montoPendiente += this.boletas[index2].monto
							}else if(this.boletas[index2].statusPago == ''){
								this.montoestadistico.mes09.cuentaVacio += 1
							}
							this.detalleMeses.mes09.monto = this.boletas[index2].monto
							this.detalleMeses.mes09.statusPago = this.boletas[index2].statusPago
							this.montoestadistico.mes09.cuentaVacio = this.clientes.length - this.montoestadistico.mes09.cuentaPagado - this.montoestadistico.mes09.cuentaPendiente
						}else if(this.clientes[index1]._id == this.boletas[index2].idCliente && this.boletas[index2].fechaMes == '10'){
							if (this.boletas[index2].statusPago == 'pagado'){
								this.montoestadistico.mes10.montoPagado += this.boletas[index2].monto
								this.montoestadistico.mes10.cuentaPagado += 1
							}else if(this.boletas[index2].statusPago == 'pendiente'){
								this.montoestadistico.mes10.cuentaPendiente += 1 
								this.montoestadistico.mes10.montoPendiente += this.boletas[index2].monto
							}else if(this.boletas[index2].statusPago == ''){
								this.montoestadistico.mes10.cuentaVacio += 1
							}
							this.detalleMeses.mes10.monto = this.boletas[index2].monto
							this.detalleMeses.mes10.statusPago = this.boletas[index2].statusPago
							this.montoestadistico.mes10.cuentaVacio = this.clientes.length - this.montoestadistico.mes10.cuentaPagado - this.montoestadistico.mes10.cuentaPendiente
						}else if(this.clientes[index1]._id == this.boletas[index2].idCliente && this.boletas[index2].fechaMes == '11'){
							if (this.boletas[index2].statusPago == 'pagado'){
								this.montoestadistico.mes11.montoPagado += this.boletas[index2].monto
								this.montoestadistico.mes11.cuentaPagado += 1
							}else if(this.boletas[index2].statusPago == 'pendiente'){
								this.montoestadistico.mes11.cuentaPendiente += 1 
								this.montoestadistico.mes11.montoPendiente += this.boletas[index2].monto
							}else if(this.boletas[index2].statusPago == ''){
								this.montoestadistico.mes11.cuentaVacio += 1
							}
							this.detalleMeses.mes11.monto = this.boletas[index2].monto
							this.detalleMeses.mes11.statusPago = this.boletas[index2].statusPago
							this.montoestadistico.mes11.cuentaVacio = this.clientes.length - this.montoestadistico.mes11.cuentaPagado - this.montoestadistico.mes11.cuentaPendiente
						}else if(this.clientes[index1]._id == this.boletas[index2].idCliente && this.boletas[index2].fechaMes == '12'){
							if (this.boletas[index2].statusPago == 'pagado'){
								this.montoestadistico.mes12.montoPagado += this.boletas[index2].monto
								this.montoestadistico.mes12.cuentaPagado += 1
							}else if(this.boletas[index2].statusPago == 'pendiente'){
								this.montoestadistico.mes12.cuentaPendiente += 1 
								this.montoestadistico.mes12.montoPendiente += this.boletas[index2].monto
							}else if(this.boletas[index2].statusPago == ''){
								this.montoestadistico.mes12.cuentaVacio += 1
							}
							this.detalleMeses.mes12.monto = this.boletas[index2].monto
							this.detalleMeses.mes12.statusPago = this.boletas[index2].statusPago
							this.montoestadistico.mes12.cuentaVacio = this.clientes.length - this.montoestadistico.mes12.cuentaPagado - this.montoestadistico.mes12.cuentaPendiente
						}

					}
					resultado.push({
						_id: this.clientes[index1]._id,
						'codigoCliente': this.clientes[index1].codigoCliente,
						'nombreCliente' : this.clientes[index1].nombreCliente + '-' + this.clientes[index1].apellidoCliente,
						'statusUpdate': this.clientes[index1].statusUpdate,
						'meses': this.detalleMeses 
					})
				}
				this.montoTotalPagado = this.montoestadistico.mes01.montoPagado +
										this.montoestadistico.mes02.montoPagado +
										this.montoestadistico.mes03.montoPagado +
										this.montoestadistico.mes04.montoPagado +
										this.montoestadistico.mes05.montoPagado +
										this.montoestadistico.mes06.montoPagado +
										this.montoestadistico.mes07.montoPagado +
										this.montoestadistico.mes08.montoPagado +
										this.montoestadistico.mes09.montoPagado +
										this.montoestadistico.mes10.montoPagado +
										this.montoestadistico.mes11.montoPagado +
										this.montoestadistico.mes12.montoPagado

				this.montoTotalPendiente = this.montoestadistico.mes01.montoPendiente +
										this.montoestadistico.mes02.montoPendiente +
										this.montoestadistico.mes03.montoPendiente +
										this.montoestadistico.mes04.montoPendiente +
										this.montoestadistico.mes05.montoPendiente +
										this.montoestadistico.mes06.montoPendiente +
										this.montoestadistico.mes07.montoPendiente +
										this.montoestadistico.mes08.montoPendiente +
										this.montoestadistico.mes09.montoPendiente +
										this.montoestadistico.mes10.montoPendiente +
										this.montoestadistico.mes11.montoPendiente +
										this.montoestadistico.mes12.montoPendiente
				this.montosestadisticos.push(this.montoestadistico)
				//console.log(this.montosestadisticos);
				//console.log('-------------------------------');
				this.resultado = resultado
				console.log(this.resultado);

			},
			IrAClienteDetalle(data){
				this.$emit('boletacliente',{data:data, mostrarResumen: false, mostrarCreadorBoleta:true})
			}
		},
		computed:{

		}
	}
</script>

<style scoped lang="scss">
::v-deep(.p-progressbar) {
	height: .5rem;
	background-color: #D8DADC;

	.p-progressbar-value {
		background-color: #607D8B;
	}
}

.p-datatable .p-column-filter {
	display: none;
}

.table-header {
	display: flex;
	justify-content: space-between;
}

::v-deep(.p-datatable.p-datatable-customers) {
	.p-datatable-header {
		padding: 1rem;
		text-align: left;
		font-size: 1.5rem;
	}

	.p-paginator {
		padding: 1rem;
	}

	.p-datatable-thead > tr > th {
		text-align: left;
	}

	.p-datatable-tbody > tr > td {
		cursor: auto;
	}

	.p-dropdown-label:not(.p-placeholder) {
		text-transform: uppercase;
	}
}

/* Responsive */
.p-datatable-customers .p-datatable-tbody > tr > td .p-column-title {
	display: none;
}

.customer-badge {
	border-radius: 2px;
	padding: .25em .5rem;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 12px;
	letter-spacing: .3px;

	&.status-qualified {
		background: #C8E6C9;
		color: #256029;
	}

	&.status-unqualified {
		background: #FFCDD2;
		color: #C63737;
	}

	&.status-negotiation {
		background: #FEEDAF;
		color: #8A5340;
	}

	&.status-new {
		background: #B3E5FC;
		color: #23547B;
	}

	&.status-renewal {
		background: #ECCFFF;
		color: #694382;
	}

	&.status-proposal {
		background: #FFD8B2;
		color: #805B36;
	}
}

.p-progressbar-value.ui-widget-header {
	background: #607d8b;
}

@media (max-width: 640px) {
	.p-progressbar {
		margin-top: .5rem;
	}
}

.product-image {
	width: 100px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
}

.orders-subtable {
	padding: 1rem;
}

.order-badge {
	border-radius: 2px;
	padding: .25em .5rem;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 12px;
	letter-spacing: .3px;

	&.order-pagado {
		background: #C8E6C9;
		color: #256029;
	}

	&.order-outofstock {
		background: #FFCDD2;
		color: #C63737;
	}

	&.order-pendiente {
		background: #FEEDAF;
		color: #8A5340;
	}
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

	&.status-Vacio {
		background: #e8ebec;
		color: #408a84;
	}
}

@media screen and (max-width: 960px) {
	::v-deep(.p-datatable) {
		&.p-datatable-customers {
			.p-datatable-thead > tr > th,
			.p-datatable-tfoot > tr > td {
				display: none !important;
			}

			.p-datatable-tbody > tr {
				> td {
					text-align: left;
					display: block;
					border: 0 none !important;
					width: 100% !important;
					float: left;
					clear: left;
					border: 0 none;

					.p-column-title {
						padding: .4rem;
						min-width: 30%;
						display: inline-block;
						margin: -.4rem 1rem -.4rem -.4rem;
						font-weight: bold;
					}

					.p-progressbar {
						margin-top: .5rem;
					}
				}
			}
		}
	}
}
</style>
