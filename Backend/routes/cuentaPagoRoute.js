const express = require('express')
const { addCuentaPago, getCuentaPagos, getCuentaPago,updateCuentaPago,deleteCuentaPago } = require('../controllers/cuentaPagoController')
const api = express.Router()

//api.post('/cuentapago',cuentapagoController.addCuentaPago)
api.post('/cuentapago', addCuentaPago)
api.get('/cuentapago', getCuentaPagos)
api.get('/cuentapago/:id', getCuentaPago)
api.put('/cuentapago/:id', updateCuentaPago)
api.delete('/cuentapago/:id',deleteCuentaPago)
module.exports = api