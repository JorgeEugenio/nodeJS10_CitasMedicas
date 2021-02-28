const express = require('express')
const { addBoleta, getBoletas, updateBoleta, deleteBoleta, getBoleta, getBoletaxCliente, getBoletaxCodigoBoleta, updatexCodigoBoleta } = require('../controllers/boletaController')
const api = express.Router()

api.post('/boleta', addBoleta)
api.get('/boleta', getBoletas)
api.get('/boleta/:id', getBoleta)
api.put('/boleta/:id', updateBoleta)
api.put('/boletaxcodigoboleta/:id', updatexCodigoBoleta)
api.delete('/boleta/:id',deleteBoleta)
api.get('/boletaxcliente/:id', getBoletaxCliente)
api.get('/boletaxcodigoboleta/:id', getBoletaxCodigoBoleta)

module.exports = api