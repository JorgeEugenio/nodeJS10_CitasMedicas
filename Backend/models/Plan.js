const mongoose = require('mongoose')

const Schema = mongoose.Schema

const planSchema = Schema({
    nombrePlan: String,
    descripcion: String,
    costo: Number,
    status: String,
    versiones: { 
        version1: String,
        version2: String,
        version3: String
    }
},{
    timestamps: true
})


module.exports = mongoose.model('Plan', planSchema)