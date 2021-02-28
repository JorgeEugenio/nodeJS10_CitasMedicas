<template>
	<div class="p-grid button-demo">
		<div class="p-col-12 p-md-12">
			<div class="card">
				<Button @click="CambiarestadoPaciente" label="Paciente" :class="CambiarEstiloBotonPlan" />
				<Button @click="CambiarEstadoUsuario" label="Usuario" :class="CambiarEstiloBotonUsuario" />
                <Button @click="CambiarEstadoEspecialidad" label="Especialidad" :class="CambiarEstiloBotonEspecialidad" />
				<Button @click="CambiarEstadoDoctor" label="Doctor" :class="CambiarEstiloBotonDoctor" />
                <Button @click="CambiarEstadoCliente" label="Clientes" :class="CambiarEstiloBotonCliente" />
                <Button @click="CambiarEstadoContrato" label="Contrato" :class="CambiarEstiloBotonContrato" />
                <Button @click="CambiarEstadoContratoDetalle" label="Contratos Detalle" :class="CambiarEstiloBotonContratoDetalle" />
                <Button @click="CambiarEstadoCreadorContrato" label="Creador de Contratos" :class="CambiarEstiloBotonCreadorContrato" />
			</div>
            <div>
                <BienvenidosEdicion v-show="estadoBienvenidoEdicion"/>
            </div>
            <div class="card" v-if="estadoPaciente">
                <Paciente />
            </div>
            <div class="card" v-if="estadoUsuario">
                <Usuario />
            </div>
            <div class="card" v-if="estadoDoctor">
                <Doctor />
            </div>
            <div class="card" v-if="estadoEspecialidad">
                <Especialidad />
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
import Paciente from '../components/contenedor/paciente/Paciente'
import Usuario from '../components/contenedor/usuario/Usuario'
import Doctor from '../components/contenedor/doctor/Doctor'
import Especialidad from '../components/contenedor/especialidad/Especialidad'
import Cliente from '../components/contenedor/cliente/Cliente'
import ContratoDetalle from '../components/contenedor/contrato/ContratoDetalle'
import CreadorContrato from '../components/contenedor/contrato/CreadorContrato'
import Contrato from '../components/contenedor/contrato/Contrato'
export default {
    components: {
        BienvenidosEdicion,
        Paciente,
        Usuario,
        Doctor,
        Especialidad,
        Cliente,
        ContratoDetalle,
        CreadorContrato,
        Contrato
    },
    data() {
        return {
            estadoBienvenidoEdicion: true,
            estadoPaciente : false,
            estadoUsuario : false,
            estadoDoctor : false,
            estadoEspecialidad : false,
            estadoCliente : false,
            estadoContrato : false,
            estadoContratoDetalle : false,
            estadoCreadorContrato : false,
            
        }
    },
    created(){

    },
    methods: {
        CambiarestadoPaciente(){
            this.estadoBienvenidoEdicion = false
            this.estadoPaciente = true
            this.estadoUsuario = false
            this.estadoDoctor = false
            this.estadoEspecialidad = false
            this.estadoCliente = false
            this.estadoCreadorContrato = false
            this.estadoContrato = false
        },
        CambiarEstadoUsuario(){
            this.estadoBienvenidoEdicion = false
            this.estadoPaciente = false
            this.estadoUsuario = true
            this.estadoDoctor = false
            this.estadoEspecialidad = false
            this.estadoCliente = false
            this.estadoContratoDetalle = false
            this.estadoCreadorContrato = false
            this.estadoContrato = false
        },
        CambiarEstadoDoctor(){
            this.estadoBienvenidoEdicion = false
            this.estadoPaciente = false
            this.estadoUsuario = false
            this.estadoDoctor = true
            this.estadoEspecialidad = false
            this.estadoCliente = false
            this.estadoContratoDetalle = false
            this.estadoCreadorContrato = false
            this.estadoContrato = false
        },
        CambiarEstadoEspecialidad(){
            this.estadoBienvenidoEdicion = false
            this.estadoPaciente = false
            this.estadoUsuario = false
            this.estadoDoctor = false
            this.estadoEspecialidad = true
            this.estadoCliente = false
            this.estadoContratoDetalle = false
            this.estadoCreadorContrato = false
            this.estadoContrato = false
        },
        CambiarEstadoCliente(){
            this.estadoBienvenidoEdicion = false
            this.estadoPaciente = false
            this.estadoUsuario = false
            this.estadoDoctor = false
            this.estadoEspecialidad = false
            this.estadoCliente = true
            this.estadoContratoDetalle = false
            this.estadoCreadorContrato = false
            this.estadoContrato = false
            
        },
        CambiarEstadoContrato(){
            this.estadoBienvenidoEdicion = false
            this.estadoPaciente = false
            this.estadoUsuario = false
            this.estadoDoctor = false
            this.estadoEspecialidad = false
            this.estadoCliente = false
            this.estadoContratoDetalle = false
            this.estadoCreadorContrato = false
            this.estadoContrato = true
            
        },
        CambiarEstadoContratoDetalle(){
            this.estadoBienvenidoEdicion = false
            this.estadoPaciente = false
            this.estadoUsuario = false
            this.estadoDoctor = false
            this.estadoEspecialidad = false
            this.estadoCliente = false
            this.estadoContratoDetalle = true
            this.estadoCreadorContrato = false
            this.estadoContrato = false
            
        },
        CambiarEstadoCreadorContrato(){
            this.estadoBienvenidoEdicion = false
            this.estadoPaciente = false
            this.estadoUsuario = false
            this.estadoDoctor = false
            this.estadoEspecialidad = false
            this.estadoCliente = false
            this.estadoContratoDetalle = false
            this.estadoCreadorContrato = true
            this.estadoContrato = false
            
        },
    },
    computed:{
        CambiarEstiloBotonPlan(){
            return this.estadoPaciente ? 'p-button-secondary p-mr-2 p-mb-2' :'p-button-outlined p-button-info p-mr-2 p-mb-2'
        },
        CambiarEstiloBotonUsuario(){
            return this.estadoUsuario ? 'p-button-secondary p-mr-2 p-mb-2' :'p-button-outlined p-button-info p-mr-2 p-mb-2'
        },
        CambiarEstiloBotonDoctor(){
            return this.estadoDoctor ? 'p-button-secondary p-mr-2 p-mb-2' :'p-button-outlined p-button-info p-mr-2 p-mb-2'
        },
        CambiarEstiloBotonEspecialidad(){
            return this.estadoEspecialidad ? 'p-button-secondary p-mr-2 p-mb-2' :'p-button-outlined p-button-info p-mr-2 p-mb-2'
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
