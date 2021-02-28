const express = require('express')
const { addSector, getSectores, getSectoresDetalles, getSector,updateSector,deleteSector } = require('../controllers/sectorController')
const api = express.Router()

//api.post('/sector',sectorController.addSector)
api.post('/sector', addSector)
api.get('/sector', getSectores)
api.get('/sectoresdetalles', getSectoresDetalles)
api.get('/sector/:id', getSector)
api.put('/sector/:id', updateSector)
api.delete('/sector/:id',deleteSector)
module.exports = api