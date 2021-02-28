const express = require('express')
const { addCliente, getClientes, updateCliente, deleteCliente, getCliente, getClientePorCodigo, getClientesDetalles} = require('../controllers/clienteController')
/* const { addServicio, getServicios } = require('../controllers/servicioController') */
const api = express.Router()

api.post('/cliente', addCliente)
api.get('/cliente', getClientes)
api.get('/clientesdetalles', getClientesDetalles)
api.get('/cliente/:id', getCliente)
api.put('/cliente/:id', updateCliente)
api.delete('/cliente/:id',deleteCliente)
api.get('/clienteporcodigo/:id', getClientePorCodigo)

module.exports = api