//const { emit } = require('../models/Tablahorario')
const Tablahorario =require('../models/Tablahorario')
//const e = require('express')
async function addTablahorario (req,res){
    try {
        const {
            idDoctor,
            fechaAtencion,
            T00,
            T01,
            T02,
            T03,
            T04,
            T05,
            T06,
            T07,
            T08,
            T09,
            T10,
            T11,
            T12,
            T13,
            T14,
            T15,
            T16,
            T17,
            T18,
            T19,
            T20,
            T21,
            T22,
            T23
        } = req.body

        const tablahorario = Tablahorario({
            idDoctor,
            fechaAtencion,
            T00,
            T01,
            T02,
            T03,
            T04,
            T05,
            T06,
            T07,
            T08,
            T09,
            T10,
            T11,
            T12,
            T13,
            T14,
            T15,
            T16,
            T17,
            T18,
            T19,
            T20,
            T21,
            T22,
            T23

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
                                    from: "doctors",
                                    localField: "idDoctor",
                                    foreignField: "_id",
                                    as: 'detalle'
                                    })
                                .replaceRoot({
                                    tablahorarioesDetalles: { $mergeObjects: [ { $arrayElemAt: [ "$detalle", 0 ] }, "$$ROOT" ] }  
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