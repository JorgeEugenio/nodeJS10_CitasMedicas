<template>
	<div class="p-grid button-demo">
		<div class="p-col-12 p-md-12">
            <div class="card">
				<Button @click="CambiarEstadoResumenrBoleta" label="Resumen de Boletas" :class="CambiarEstiloResumenBoleta" />
				<Button @click="CambiarEstadoCreadorBoleta" label="Creador de Boletas" :class="CambiarEstiloCreadorBoleta" />
            </div>
            <BienvenidoBoleta v-if="estadoBienvenidoEdicion"/>
            <div class="card" v-if="estadoCreadorBoleta">
                <CreadorBoleta 
                :dataCliente="dataCliente"
                />
            </div>
            <div class="card" v-if="estadoResumenBoleta">
                <ResumenBoleta 
                v-on:boletacliente="unpack"
                />
            </div>
		</div>
	</div>
</template>
<script>
import CreadorBoleta from '../components/contenedor/boleta/CreadorBoleta'
import BienvenidoBoleta from '../components/contenedor/boleta/BienvenidoBoleta'
import ResumenBoleta from '../components/contenedor/boleta/ResumenBoleta'
export default {
    name:'Resumen',
    components:{
        CreadorBoleta,
        BienvenidoBoleta,
        ResumenBoleta
    },data(){
        return {
            estadoBienvenidoEdicion: true,
            estadoCreadorBoleta: false,
            estadoResumenBoleta: false,
            dataCliente:{}
        }
    },
    created() {
        this.Inicializar()
	},
	mounted() {

	},
    methods:{
        Inicializar(){
            this.dataCliente = {_id: '',codigoCliente:''}
            //console.log(this.dataCliente);
        },
        unpack(data){
            this.estadoResumenBoleta = data.mostrarResumen
            this.estadoCreadorBoleta = data.mostrarCreadorBoleta
            this.dataCliente = data

            //console.log(data.data);
        },
        CambiarEstadoCreadorBoleta(){
            this.estadoBienvenidoEdicion = false
            this.estadoCreadorBoleta = true
            this.estadoResumenBoleta = false
            this.Inicializar()
        },
        CambiarEstadoResumenrBoleta(){
            this.estadoBienvenidoEdicion = false
            this.estadoCreadorBoleta = false
            this.estadoResumenBoleta = true
        },

    },computed:{
        CambiarEstiloCreadorBoleta(){
            return this.estadoCreadorBoleta ? 'p-button-secondary p-mr-2 p-mb-2' :'p-button-outlined p-button-info p-mr-2 p-mb-2'
        },
        CambiarEstiloResumenBoleta(){
            return this.estadoResumenBoleta ? 'p-button-secondary p-mr-2 p-mb-2' :'p-button-outlined p-button-info p-mr-2 p-mb-2'
        },
    }
}
</script>
<style>

</style>