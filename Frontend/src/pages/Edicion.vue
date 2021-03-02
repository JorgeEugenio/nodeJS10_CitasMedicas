<template>
	<div class="p-grid button-demo">
		<div class="p-col-12 p-md-12">
			<div class="card">
				<Button @click="CambiarestadoPaciente" label="Paciente" :class="CambiarEstiloBotonPlan" />
				<Button @click="CambiarEstadoUsuario" label="Usuario" :class="CambiarEstiloBotonUsuario" />
                <Button @click="CambiarEstadoEspecialidad" label="Especialidad" :class="CambiarEstiloBotonEspecialidad" />
				<Button @click="CambiarEstadoDoctor" label="Doctor" :class="CambiarEstiloBotonDoctor" />
                <Button @click="CambiarEstadoQuery" label="Querys" :class="CambiarEstiloBotonQuery" />
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
            <div class="card" v-if="estadoQuery">
                <Query />
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
import Query from '../components/contenedor/query/Query'

export default {
    components: {
        BienvenidosEdicion,
        Paciente,
        Usuario,
        Doctor,
        Especialidad,
        Query,
    },
    data() {
        return {
            estadoBienvenidoEdicion: true,
            estadoPaciente : false,
            estadoUsuario : false,
            estadoDoctor : false,
            estadoEspecialidad : false,
            estadoQuery : false,
            
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
            this.estadoQuery = false
        },
        CambiarEstadoUsuario(){
            this.estadoBienvenidoEdicion = false
            this.estadoPaciente = false
            this.estadoUsuario = true
            this.estadoDoctor = false
            this.estadoEspecialidad = false
            this.estadoQuery = false

        },
        CambiarEstadoDoctor(){
            this.estadoBienvenidoEdicion = false
            this.estadoPaciente = false
            this.estadoUsuario = false
            this.estadoDoctor = true
            this.estadoEspecialidad = false
            this.estadoQuery = false
        },
        CambiarEstadoEspecialidad(){
            this.estadoBienvenidoEdicion = false
            this.estadoPaciente = false
            this.estadoUsuario = false
            this.estadoDoctor = false
            this.estadoEspecialidad = true
            this.estadoQuery = false
        },
        CambiarEstadoQuery(){
            this.estadoBienvenidoEdicion = false
            this.estadoPaciente = false
            this.estadoUsuario = false
            this.estadoDoctor = false
            this.estadoEspecialidad = false
            this.estadoQuery = true
            
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
        CambiarEstiloBotonQuery(){
            return this.estadoQuery ? 'p-button-secondary p-mr-2 p-mb-2' :'p-button-outlined p-button-info p-mr-2 p-mb-2'
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
