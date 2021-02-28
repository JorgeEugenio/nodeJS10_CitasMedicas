const express = require('express')
const { addPlan, getPlanes, getPlan,updatePlan,deletePlan,getPlanDetalles } = require('../controllers/planController')
const api = express.Router()

//api.post('/plan',planController.addPlan)
api.post('/plan', addPlan)
api.get('/plan', getPlanes)
api.get('/plan/detalles', getPlanDetalles)
api.get('/plan/:id', getPlan)
api.put('/plan/:id', updatePlan)
api.delete('/plan/:id',deletePlan)
module.exports = api