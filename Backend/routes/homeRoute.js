const express = require('express')
const { getHome } = require('../controllers/homeController')
//const getHome = require('../public/index.html')
const api = express.Router()

api.get('/', getHome)
module.exports = api