const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ejemploSchema = Schema({
    TipoEjemplo: String, //Ejemplo o MT001
    nombreEjemplo: String,//Rimac001, Tienda Delia
    descripcion: String,
    direccion: {
        departamento: String,
        provincia: String,
        distrito: String,
        programa: String,
        mzlt: String,
    },
    status: String
})


module.exports = mongoose.model('Ejemplo', ejemploSchema)