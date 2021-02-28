const mongoose = require('mongoose')

const Schema = mongoose.Schema

const doctorSchema = Schema({
    nombreDoctor: String,//Rimac001-S001,
    apellidoDoctor: String,
    estadoDoctor: String,
    idEspecialidad: mongoose.ObjectId,
},{
    timestamps: true
})

module.exports = mongoose.model('Doctor', doctorSchema)