const express = require('express')
const { addEspecialidad, getEspecialidades, getEspecialidad, updateEspecialidad, deleteEspecialidad } = require('../controllers/especialidadController')
const api = express.Router()

api.post('/especialidad', addEspecialidad)
api.get('/especialidad', getEspecialidades)
api.get('/especialidad/:id', getEspecialidad)
api.put('/especialidad/:id', updateEspecialidad)
api.delete('/especialidad/:id',deleteEspecialidad)
module.exports = api