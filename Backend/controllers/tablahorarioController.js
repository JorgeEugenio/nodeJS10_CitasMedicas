//const { emit } = require('../models/Tablahorario')
const Tablahorario =require('../models/Tablahorario')
//const e = require('express')
async function addTablahorario (req,res){
    try {
        const {
            idDoctor,
            fechaAtencion

        } = req.body

        const tablahorario = Tablahorario({
            idDoctor,
            fechaAtencion

        })
        await tablahorario.save()
        res.status(201).send(tablahorario)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}
async function getTablahorarioes(req, res){
    const tablahorarioes = await Tablahorario.find()
    res.status(200).send(tablahorarioes)
    }
async function updateTablahorario(req,res){
    await Tablahorario.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: 'Tablahorario Updated'
  });
}

async function deleteTablahorario(req,res){
    try {
        await Tablahorario.findByIdAndRemove(req.params.id)    
        res.json({
            status: 'cliente deleted!'
        })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}

async function getTablahorario(req,res){
    try {
        const tablahorario = await Tablahorario.findOne({_id: req.params.id});
    res.json(tablahorario);
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}

async function getTablahorarioesDetalles(req, res){
    try {
        const tablahorarioesDetalles = await Tablahorario.aggregate()
                                .lookup({
                                    from: "torres",
                                    localField: "idTorre",
                                    foreignField: "_id",
                                    as: 'torre'
                                    })
                                .replaceRoot({
                                    tablahorarioesDetalles: { $mergeObjects: [ { $arrayElemAt: [ "$torre", 0 ] }, "$$ROOT" ] }  
                                })
        res.status(200).send(tablahorarioesDetalles)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}


module.exports = {
    addTablahorario,
    getTablahorarioes,
    updateTablahorario,
    deleteTablahorario,
    getTablahorario,
    getTablahorarioesDetalles
}