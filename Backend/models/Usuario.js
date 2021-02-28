const mongoose = require('mongoose')

const Schema = mongoose.Schema

const usuarioSchema = Schema({
    nombreUsuario: String,
    apellidoUsuario: String,
    user: String,
    pass: String,
    correoUsuario:String
},{
    timestamps: true
})


module.exports = mongoose.model('Usuario', usuarioSchema)