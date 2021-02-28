<template>
	<div class="p-grid button-demo">
		<div class="p-col-12 p-md-12">
			<div class="card">
				<Button @click="CambiarEstadoPlan" label="Plan" :class="CambiarEstiloBotonPlan" />
				<Button @click="CambiarEstadoSector" label="Sector" :class="CambiarEstiloBotonSector" />
				<Button @click="CambiarEstadoTorre" label="Torre" :class="CambiarEstiloBotonTorre" />
				<Button @click="CambiarEstadoCuentaPago" label="Cuenta de Pago" :class="CambiarEstiloBotonCuentaPago" />
                <Button @click="CambiarEstadoCliente" label="Clientes" :class="CambiarEstiloBotonCliente" />
                <Button @click="CambiarEstadoContrato" label="Contrato" :class="CambiarEstiloBotonContrato" />
                <Button @click="CambiarEstadoContratoDetalle" label="Contratos Detalle" :class="CambiarEstiloBotonContratoDetalle" />
                <Button @click="CambiarEstadoCreadorContrato" label="Creador de Contratos" :class="CambiarEstiloBotonCreadorContrato" />
			</div>
            <div>
                <BienvenidosEdicion v-show="estadoBienvenidoEdicion"/>
            </div>
            <div class="card" v-if="estadoPlan">
                <Plan />
            </div>
            <div class="card" v-if="estadoSector">
                <Sector />
            </div>
            <div class="card" v-if="estadoTorre">
                <Torre />
            </div>
            <div class="card" v-if="estadoCuentaPago">
                <CuentaPago />
            </div>
            <div class="card" v-if="estadoCliente">
                <Cliente />
            </div>
            <div class="card" v-if="estadoContrato">
                <Contrato />
            </div>
            <div class="card" v-if="estadoContratoDetalle">
                <ContratoDetalle />
            </div>
            <div class="card" v-if="estadoCreadorContrato">
                <CreadorContrato />
            </div>
		</div>
	</div>
</template>

<script>
import BienvenidosEdicion from '../components/contenedor/BienvenidosEdicion'
import Plan from '../components/contenedor/plan/Plan'
import Sector from '../components/contenedor/sector/Sector'
import Torre from '../components/contenedor/torre/Torre'
import CuentaPago from '../components/contenedor/cuentapago/CuentaPago'
import Cliente from '../components/contenedor/cliente/Cliente'
import ContratoDetalle from '../components/contenedor/contrato/ContratoDetalle'
import CreadorContrato from '../components/contenedor/contrato/CreadorContrato'
import Contrato from '../components/contenedor/contrato/Contrato'
export default {
    components: {
        BienvenidosEdicion,
        Plan,
        Sector,
        Torre,
        CuentaPago,
        Cliente,
        ContratoDetalle,
        CreadorContrato,
        Contrato
    },
    data() {
        return {
            estadoBienvenidoEdicion: true,
            estadoPlan : false,
            estadoSector : false,
            estadoTorre : false,
            estadoCuentaPago : false,
            estadoCliente : false,
            estadoContrato : false,
            estadoContratoDetalle : false,
            estadoCreadorContrato : false,
            
        }
    },
    created(){

    },
    methods: {
        CambiarEstadoPlan(){
            this.estadoBienvenidoEdicion = false
            this.estadoPlan = true
            this.estadoSector = false
            this.estadoTorre = false
            this.estadoCuentaPago = false
            this.estadoCliente = false
            this.estadoCreadorContrato = false
            this.estadoContrato = false
        },
        CambiarEstadoSector(){
            this.estadoBienvenidoEdicion = false
            this.estadoPlan = false
            this.estadoSector = true
            this.estadoTorre = false
            this.estadoCuentaPago = false
            this.estadoCliente = false
            this.estadoContratoDetalle = false
            this.estadoCreadorContrato = false
            this.estadoContrato = false
        },
        CambiarEstadoTorre(){
            this.estadoBienvenidoEdicion = false
            this.estadoPlan = false
            this.estadoSector = false
            this.estadoTorre = true
            this.estadoCuentaPago = false
            this.estadoCliente = false
            this.estadoContratoDetalle = false
            this.estadoCreadorContrato = false
            this.estadoContrato = false
        },
        CambiarEstadoCuentaPago(){
            this.estadoBienvenidoEdicion = false
            this.estadoPlan = false
            this.estadoSector = false
            this.estadoTorre = false
            this.estadoCuentaPago = true
            this.estadoCliente = false
            this.estadoContratoDetalle = false
            this.estadoCreadorContrato = false
            this.estadoContrato = false
        },
        CambiarEstadoCliente(){
            this.estadoBienvenidoEdicion = false
            this.estadoPlan = false
            this.estadoSector = false
            this.estadoTorre = false
            this.estadoCuentaPago = false
            this.estadoCliente = true
            this.estadoContratoDetalle = false
            this.estadoCreadorContrato = false
            this.estadoContrato = false
            
        },
        CambiarEstadoContrato(){
            this.estadoBienvenidoEdicion = false
            this.estadoPlan = false
            this.estadoSector = false
            this.estadoTorre = false
            this.estadoCuentaPago = false
            this.estadoCliente = false
            this.estadoContratoDetalle = false
            this.estadoCreadorContrato = false
            this.estadoContrato = true
            
        },
        CambiarEstadoContratoDetalle(){
            this.estadoBienvenidoEdicion = false
            this.estadoPlan = false
            this.estadoSector = false
            this.estadoTorre = false
            this.estadoCuentaPago = false
            this.estadoCliente = false
            this.estadoContratoDetalle = true
            this.estadoCreadorContrato = false
            this.estadoContrato = false
            
        },
        CambiarEstadoCreadorContrato(){
            this.estadoBienvenidoEdicion = false
            this.estadoPlan = false
            this.estadoSector = false
            this.estadoTorre = false
            this.estadoCuentaPago = false
            this.estadoCliente = false
            this.estadoContratoDetalle = false
            this.estadoCreadorContrato = true
            this.estadoContrato = false
            
        },
    },
    computed:{
        CambiarEstiloBotonPlan(){
            return this.estadoPlan ? 'p-button-secondary p-mr-2 p-mb-2' :'p-button-outlined p-button-info p-mr-2 p-mb-2'
        },
        CambiarEstiloBotonSector(){
            return this.estadoSector ? 'p-button-secondary p-mr-2 p-mb-2' :'p-button-outlined p-button-info p-mr-2 p-mb-2'
        },
        CambiarEstiloBotonTorre(){
            return this.estadoTorre ? 'p-button-secondary p-mr-2 p-mb-2' :'p-button-outlined p-button-info p-mr-2 p-mb-2'
        },
        CambiarEstiloBotonCuentaPago(){
            return this.estadoCuentaPago ? 'p-button-secondary p-mr-2 p-mb-2' :'p-button-outlined p-button-info p-mr-2 p-mb-2'
        },
        CambiarEstiloBotonCliente(){
            return this.estadoCliente ? 'p-button-secondary p-mr-2 p-mb-2' :'p-button-outlined p-button-info p-mr-2 p-mb-2'
        },
        CambiarEstiloBotonContratoDetalle(){
            return this.estadoContratoDetalle ? 'p-button-secondary p-mr-2 p-mb-2' :'p-button-outlined p-button-info p-mr-2 p-mb-2'
        },
        CambiarEstiloBotonCreadorContrato(){
            return this.estadoCreadorContrato ? 'p-button-secondary p-mr-2 p-mb-2' :'p-button-outlined p-button-info p-mr-2 p-mb-2'
        },
        CambiarEstiloBotonContrato(){
            return this.estadoContrato ? 'p-button-secondary p-mr-2 p-mb-2' :'p-button-outlined p-button-info p-mr-2 p-mb-2'
        }
       
       
    }
}
</script>

<style scoped>

</style>
