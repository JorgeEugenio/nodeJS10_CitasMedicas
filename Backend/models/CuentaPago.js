const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cuentaPagoSchema = Schema({
    banco: String,
    nombreCuentaPago: String,
    numeroCuentaPago: String,
    cciCuentaPago:String,
    propietarioCuentaPago: String,
    statusCuentaPago: String
},{
    timestamps: true
})


module.exports = mongoose.model('CuentaPago', cuentaPagoSchema)