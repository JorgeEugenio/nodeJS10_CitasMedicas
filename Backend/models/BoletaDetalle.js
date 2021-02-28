const mongoose = require('mongoose')
const Schema = mongoose.Schema

const boletaDetalleSchema = Schema({
    statusBoletaDetalle: String,
    codigoBoleta: String,
    idCliente: mongoose.ObjectId,
    serviciosContratados: {
        idServicio: mongoose.ObjectId,
        nombreServicio: String,
        detalleServicio:String,
        costoServicio: Number
    },
    fechaAnio: String,
    fechaMes: String

},{
    timestamps: true
})


module.exports = mongoose.model('BoletaDetalle',boletaDetalleSchema)


            