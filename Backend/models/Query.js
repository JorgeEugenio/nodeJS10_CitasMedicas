const mongoose = require('mongoose')

const Schema = mongoose.Schema

const querySchema = Schema({
    project: String,
    query: String,
    rutaQuery: String,
    tipoQuery: String
},{
    timestamps: true
})


module.exports = mongoose.model('Query', querySchema)