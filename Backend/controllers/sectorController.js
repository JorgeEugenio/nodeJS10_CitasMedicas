//const { emit } = require('../models/Sector')
const Sector =require('../models/Sector')
const Plan = require('../models/Plan')
//const e = require('express')
async function addSector (req,res){
    try {
        const {
            nombreSector,
            descripcionSector,
            idTorre,
            statusSector
        } = req.body

        const sector = Sector({
            nombreSector,
            descripcionSector,
            idTorre,
            statusSector 
        })
        await sector.save()
        res.status(201).send(sector)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}
async function getSectores(req, res){
    const sectores = await Sector.find()
    res.status(200).send(sectores)
    }
async function updateSector(req,res){
    await Sector.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: 'Sector Updated'
  });
}

async function deleteSector(req,res){
    try {
        await Sector.findByIdAndRemove(req.params.id)    
        res.json({
            status: 'cliente deleted!'
        })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}

async function getSector(req,res){
    try {
        const sector = await Sector.findOne({_id: req.params.id});
    res.json(sector);
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}

async function getSectoresDetalles(req, res){
    try {
        const sectoresDetalles = await Sector.aggregate()
                                .lookup({
                                    from: "torres",
                                    localField: "idTorre",
                                    foreignField: "_id",
                                    as: 'torre'
                                    })
                                .replaceRoot({
                                    sectoresDetalles: { $mergeObjects: [ { $arrayElemAt: [ "$torre", 0 ] }, "$$ROOT" ] }  
                                })
        res.status(200).send(sectoresDetalles)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}


module.exports = {
    addSector,
    getSectores,
    updateSector,
    deleteSector,
    getSector,
    getSectoresDetalles
}