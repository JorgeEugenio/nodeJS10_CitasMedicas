const express = require('express')
const { addEjemplo, getEjemplos, getEjemplo,updateEjemplo,deleteEjemplo } = require('../controllers/ejemploController')
const api = express.Router()

//api.post('/ejemplo',ejemploController.addEjemplo)
api.post('/ejemplo', addEjemplo)
api.get('/ejemplo', getEjemplos)
api.get('/ejemplo/:id', getEjemplo)
api.put('/ejemplo/:id', updateEjemplo)
api.delete('/ejemplo/:id',deleteEjemplo)
module.exports = api