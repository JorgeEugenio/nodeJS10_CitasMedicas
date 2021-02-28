const express = require('express')
const { addBoletaDetalle, getBoletaDetalles, updateBoletaDetalle, deleteBoletaDetalle, getBoletaDetalle, getBoletaDetallexCodigoBoleta, getBoletaDetallesxCodigoCliente, getBoletaDetallesxTodo } = require('../controllers/boletaDetalleController')
/* const { addServicio, getServicios } = require('../controllers/servicioController') */
const api = express.Router()

api.post('/boletadetalle', addBoletaDetalle)
api.get('/boletadetalle', getBoletaDetalles)
api.get('/boletadetalle/:id', getBoletaDetalle)
api.put('/boletadetalle/:id', updateBoletaDetalle)
api.delete('/boletadetalle/:id',deleteBoletaDetalle)
api.get('/boletadetallexcodigoboleta/:id', getBoletaDetallexCodigoBoleta)
api.get('/boletadetallexcodigocliente/:id', getBoletaDetallesxCodigoCliente)
api.get('/boletadetallextodo', getBoletaDetallesxTodo)
module.exports = api