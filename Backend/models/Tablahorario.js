const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tablahorarioSchema = Schema({
    idDoctor: mongoose.ObjectId,
    fechaAtencion: Date,
    T00: String,
    T01: String,
    T02: String,
    T03: String,
    T04: String,
    T05: String,
    T06: String,
    T07: String,
    T08: String,
    T09: String,
    T10: String,
    T11: String,
    T12: String,
    T13: String,
    T14: String,
    T15: String,
    T16: String,
    T17: String,
    T18: String,
    T19: String,
    T20: String,
    T21: String,
    T22: String,
    T23: String
},{
    timestamps: true
})


module.exports = mongoose.model('Tablahorario', tablahorarioSchema)