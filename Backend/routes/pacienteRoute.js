const express = require('express')
const { addPaciente, getPacientes, getPaciente,updatePaciente,deletePaciente } = require('../controllers/pacienteController')
const api = express.Router()

//api.post('/paciente',pacienteController.addPaciente)
api.post('/paciente', addPaciente)
api.get('/paciente', getPacientes)
api.get('/paciente/:id', getPaciente)
api.put('/paciente/:id', updatePaciente)
api.delete('/paciente/:id',deletePaciente)
module.exports = api