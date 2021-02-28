const express = require('express')
const { addTablacitamedica, getTablacitamedicaes, getTablacitamedicaesDetalles, getTablacitamedica,updateTablacitamedica,deleteTablacitamedica } = require('../controllers/tablacitamedicaController')
const api = express.Router()

//api.post('/tablacitamedica',tablacitamedicaController.addTablacitamedica)
api.post('/tablacitamedica', addTablacitamedica)
api.get('/tablacitamedica', getTablacitamedicaes)
api.get('/tablacitamedicaesdetalles', getTablacitamedicaesDetalles)
api.get('/tablacitamedica/:id', getTablacitamedica)
api.put('/tablacitamedica/:id', updateTablacitamedica)
api.delete('/tablacitamedica/:id',deleteTablacitamedica)
module.exports = api