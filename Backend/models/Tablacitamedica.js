const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tablacitamedicaSchema = Schema({
    idDoctor: mongoose.ObjectId,
    idUsuario: mongoose.ObjectId,
    idPaciente: mongoose.ObjectId,
    turnos: {
        fechaAtencion: Date,
        turno: String,
        reservacion: String,
        confirmacionReserva: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Tablacitamedica', tablacitamedicaSchema)