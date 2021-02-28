const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sectorSchema = Schema({
    nombreSector: String,//Rimac001-S001,
    descripcionSector: String,
    idTorre: mongoose.ObjectId,
    statusSector: String
},{
    timestamps: true
})

module.exports = mongoose.model('Sector', sectorSchema)