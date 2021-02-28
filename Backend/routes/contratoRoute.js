const express = require('express')
const { addContrato, getContratos, updateContrato, deleteContrato, getContrato, getContratoByCodigo, deleteContratoxCodigo} = require('../controllers/contratoController')
/* const { addServicio, getServicios } = require('../controllers/servicioController') */
const api = express.Router()

api.post('/contrato', addContrato)
api.get('/contrato', getContratos)
api.get('/contrato/:id', getContrato)
api.get('/contratoxcodigo/:id', getContratoByCodigo)
api.put('/contrato/:id', updateContrato)
api.delete('/contrato/:id',deleteContrato)
api.delete('/contratoxcodigo/:id',deleteContratoxCodigo)
module.exports = api