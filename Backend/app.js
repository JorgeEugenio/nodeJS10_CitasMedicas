const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')
//const productsRoutes = require('./routes/product')
const pacienteRoute = require('./routes/pacienteRoute')
const especialidadRoute = require('./routes/especialidadRoute')
const usuarioRoute = require('./routes/usuarioRoute')
const doctorRoute = require('./routes/doctorRoute')
const tablahorarioRoute = require('./routes/tablahorarioRoute')
const tablacitamedicaRoute = require('./routes/tablacitamedicaRoute')
const queryRoute = require('./routes/queryRoute')


//const puntuacionesRoute = require('./routes/puntuaciones2Route')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// middlewares
app.use(morgan('dev'));
app.use(express.json());

//app.use('/v1',productsRoutes)
app.use('/v1',pacienteRoute)
app.use('/v1',especialidadRoute)
app.use('/v1',usuarioRoute)
app.use('/v1',doctorRoute)
app.use('/v1',tablahorarioRoute)
app.use('/v1',tablacitamedicaRoute)
app.use('/v1',queryRoute)


//app.use('/v1',puntuacionesRoute)
//app.use('/public', express.static(`${__dirname}/storage/imgs`))
app.use('/',express.static(`${__dirname}/public/`))
app.use('/public', express.static(`${__dirname}/storage/imgs/`))
module.exports = app