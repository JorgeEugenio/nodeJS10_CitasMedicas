const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pacienteSchema = Schema({
    nombrePaciente: String,
    apellidoPaciente: String,
    dniPaciente: String,

},{
    timestamps: true
})


module.exports = mongoose.model('Paciente', pacienteSchema)