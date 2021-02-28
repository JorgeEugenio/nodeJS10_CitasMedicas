const express = require('express')
const { addClienteDetalle, getClienteDetalles, updateClienteDetalle, deleteClienteDetalle, getClienteDetalle } = require('../controllers/clienteDetalleController')
/* const { addServicio, getServicios } = require('../controllers/servicioController') */
const api = express.Router()

api.post('/clientedetalle', addClienteDetalle)
api.get('/clientedetalle', getClienteDetalles)
api.get('/clientedetalle/:id', getClienteDetalle)
api.put('/clientedetalle/:id', updateClienteDetalle)
api.delete('/clientedetalle/:id',deleteClienteDetalle)
module.exports = api