const { emit } = require('../models/Celular')
const Celular =require('../models/Celular')
const Plan = require('../models/Plan')
//const e = require('express')
async function addCelular (req,res){
    try {
        const {
            numerocelular,
            whatsapp,
            whatsapplink,
            estadoCelular,
            parentezco,
            detalles,
            idcliente,
        } = req.body

        const celular = Celular({
            numerocelular,
            whatsapp,
            whatsapplink,
            estadoCelular,
            parentezco,
            detalles,
            idcliente
        })
        await celular.save()
        res.status(201).send(celular)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}
async function getCelulares(req, res){
    const celulares = await Celular.find()
    res.status(200).send(celulares)
    }
async function updateCelular(req,res){
    await Celular.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: 'Celular Updated'
  });
}

async function deleteCelular(req,res){
    try {
        await Celular.findByIdAndRemove(req.params.id)    
        res.json({
            status: 'cliente deleted!'
        })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}

async function getCelular(req,res){
    try {
        const celular = await Celular.findOne({_id: req.params.id});
    res.json(celular);
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}


module.exports = {
    addCelular,
    getCelulares,
    updateCelular,
    deleteCelular,
    getCelular
}