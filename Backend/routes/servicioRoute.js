const express = require('express')
const { addServicio, getServicios, getServicio,updateServicio,deleteServicio } = require('../controllers/servicioController')
const api = express.Router()

//api.post('/servicio',servicioController.addServicio)
api.post('/servicio', addServicio)
api.get('/servicio', getServicios)
api.get('/servicio/:id', getServicio)
api.put('/servicio/:id', updateServicio)
api.delete('/servicio/:id',deleteServicio)
module.exports = api