const express = require('express')
const { addUsuario, getUsuarios, getUsuario,updateUsuario,deleteUsuario } = require('../controllers/usuarioController')
const api = express.Router()

//api.post('/usuario',usuarioController.addUsuario)
api.post('/usuario', addUsuario)
api.get('/usuario', getUsuarios)
api.get('/usuario/:id', getUsuario)
api.put('/usuario/:id', updateUsuario)
api.delete('/usuario/:id',deleteUsuario)
module.exports = api