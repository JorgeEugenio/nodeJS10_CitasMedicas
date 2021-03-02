const express = require('express')
const { addQuery, getQuerys, getQuery,updateQuery,deleteQuery } = require('../controllers/queryController')
const api = express.Router()

//api.post('/query',queryController.addQuery)
api.post('/query', addQuery)
api.get('/query', getQuerys)
api.get('/query/:id', getQuery)
api.put('/query/:id', updateQuery)
api.delete('/query/:id',deleteQuery)
module.exports = api