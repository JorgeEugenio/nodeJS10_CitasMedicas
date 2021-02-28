const mongoose = require('mongoose')
const Eliminar = require('./Eliminar')
const Schema = mongoose.Schema

const clienteSchema = Schema({
    statusCliente: String,
    codigoCliente: String,
    nombreCliente: String,
    apellidoCliente: String,
    dniCliente: String,
    correoCliente: String,
    fechaCreacionCliente: String,
    statusUpdate: String,
    personACargo: Eliminar,
    idCuentaPago: mongoose.ObjectId,
    direccionCliente: {
        departamento: String,
        provincia: String ,
        distrito: String ,
        programa: String ,
        mzlt: String
    }
},{
    timestamps: true
})


module.exports = mongoose.model('Cliente',clienteSchema)


            