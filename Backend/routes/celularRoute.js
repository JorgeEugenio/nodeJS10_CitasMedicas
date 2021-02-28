const express = require('express')
const { addCelular, getCelulares, getCelular,updateCelular,deleteCelular } = require('../controllers/celularController')
const api = express.Router()

//api.post('/celular',celularController.addCelular)
api.post('/celular', addCelular)
api.get('/celular', getCelulares)
api.get('/celularesdetalles', getCelulares)
api.get('/celular/:id', getCelular)
api.put('/celular/:id', updateCelular)
api.delete('/celular/:id',deleteCelular)
module.exports = api