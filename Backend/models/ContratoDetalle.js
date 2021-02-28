const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contratoDetalleSchema = Schema({
    statusContratoDetalle: String,
    codigoContrato: String,
    idCliente: mongoose.ObjectId,
    serviciosContratados: {
        nombreServicio: String,
        detalleServicio:String,
        costoServicio:String
    }

},{
    timestamps: true
})



module.exports = mongoose.model('ContratoDetalle',contratoDetalleSchema)


            