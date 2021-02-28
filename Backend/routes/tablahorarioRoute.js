const express = require('express')
const { addTablahorario, getTablahorarioes, getTablahorarioesDetalles, getTablahorario,updateTablahorario,deleteTablahorario } = require('../controllers/tablahorarioController')
const api = express.Router()

//api.post('/tablahorario',tablahorarioController.addTablahorario)
api.post('/tablahorario', addTablahorario)
api.get('/tablahorario', getTablahorarioes)
api.get('/tablahorarioesdetalles', getTablahorarioesDetalles)
api.get('/tablahorario/:id', getTablahorario)
api.put('/tablahorario/:id', updateTablahorario)
api.delete('/tablahorario/:id',deleteTablahorario)
module.exports = api