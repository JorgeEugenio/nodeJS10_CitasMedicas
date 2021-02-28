const express = require('express')
const { addContratoDetalle, getContratoDetalles, updateContratoDetalle, deleteContratoDetalle, getContratoDetalle, getContratoDetallePorContratoId, getContratoDetallesxCodigoCliente } = require('../controllers/contratoDetalleController')
/* const { addServicio, getServicios } = require('../controllers/servicioController') */
const api = express.Router()

api.post('/contratodetalle', addContratoDetalle)
api.get('/contratodetalle', getContratoDetalles)
api.get('/contratodetalle/:id', getContratoDetalle)
api.put('/contratodetalle/:id', updateContratoDetalle)
api.delete('/contratodetalle/:id',deleteContratoDetalle)
api.get('/contratodetalleporcontratoid/:id', getContratoDetallePorContratoId)
api.get('/contratodetallexcodigocliente/:id', getContratoDetallesxCodigoCliente)
module.exports = api