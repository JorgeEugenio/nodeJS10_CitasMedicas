const express = require('express')
const { addDoctor, getDoctores, getDoctoresDetalles, getDoctor,updateDoctor,deleteDoctor } = require('../controllers/doctorController')
const api = express.Router()

//api.post('/doctor',doctorController.addDoctor)
api.post('/doctor', addDoctor)
api.get('/doctor', getDoctores)
api.get('/doctoresdetalles', getDoctoresDetalles)
api.get('/doctor/:id', getDoctor)
api.put('/doctor/:id', updateDoctor)
api.delete('/doctor/:id',deleteDoctor)
module.exports = api