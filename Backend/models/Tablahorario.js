const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tablahorarioSchema = Schema({
    idDoctor: mongoose.ObjectId,
    fechaAtencion: String,
    turnos: {
        turno: String,
        reservacion: String
    }
},{
    timestamps: true
})


module.exports = mongoose.model('Tablahorario', tablahorarioSchema)