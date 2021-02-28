const mongoose = require('mongoose')
const Schema = mongoose.Schema

const boletaSchema = Schema({
    codigoBoleta: String,
    fechaAnio: String,
    fechaMes: String,
    monto: Number,
    statusBoleta: String,
    statusPago: String,
    tiempoPago: String,
    idCliente: mongoose.ObjectId,
},{
    timestamps: true
})


module.exports = mongoose.model('Boleta',boletaSchema)


            