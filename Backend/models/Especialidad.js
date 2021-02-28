const mongoose = require('mongoose')

const Schema = mongoose.Schema

const especialidadSchema = Schema({
    nombreEspecialidad: String,
    detalleEspecialidad: String
},{
    timestamps: true
})


module.exports = mongoose.model('Especialidad', especialidadSchema)