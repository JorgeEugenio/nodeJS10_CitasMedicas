const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contratoSchema = Schema({
    statusContrato: String,
    codigoContrato: String,
    idCliente: mongoose.ObjectId

},{
    timestamps: true
})


module.exports = mongoose.model('Contrato',contratoSchema)


            