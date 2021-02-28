const mongoose = require('mongoose')

const Schema = mongoose.Schema

const celularSchema = Schema({
    numerocelular: String,//Rimac001-S001,
    whatsapp: String,
    whatsapplink: String,
    estadoCelular: String,
    parentezco: String,
    detalles: String,
    idcliente: mongoose.ObjectId
    
},{
    timestamps: true
})

module.exports = mongoose.model('Celular', celularSchema)