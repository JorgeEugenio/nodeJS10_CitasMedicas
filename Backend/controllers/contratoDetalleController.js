const mongoose = require('mongoose')
const ContratoDetalle = require('../models/ContratoDetalle')
async function addContratoDetalle (req,res) {
    try {
        const {
            statusContratoDetalle,
            codigoContrato,
            idCliente,
            serviciosContratados: {
                nombreServicio,
                detalleServicio,
                costoServicio
            }
        } = req.body
        const contratoDetalle = ContratoDetalle({
            statusContratoDetalle,
            codigoContrato,
            idCliente,
            serviciosContratados: {
                nombreServicio,
                detalleServicio,
                costoServicio
            }
        })
        await contratoDetalle.save()
        res.status(200).send(contratoDetalle)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}


async function getContratoDetalles(req, res){
    try {
        const contratoDetalles = await ContratoDetalle.find()
        res.status(200).send(contratoDetalles)      
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function getContratoDetallesxCodigoCliente(req, res){
    try {
        //const contratoDetalles = await ContratoDetalle.find({ idCliente: req.params.id})
        const contratoDetalles = await ContratoDetalle.aggregate()
                                                        .match({ idCliente: mongoose.Types.ObjectId((req.params.id)) })
                                                        .project({
                                                            _id:1,
                                                            "statusContratoDetalle":1,
                                                            "codigoContrato": 1,
                                                            "serviciosContratados":1,
                                                            "idCliente":1,
                                                            "createdAt": { $concat : [{$substr :["$createdAt",0 ,10]},":",{$substr :["$createdAt", 11,5]}]},
                                                            "updatedAt": { $concat : [{$substr :["$updatedAt",0 ,10]},":",{$substr :["$updatedAt", 11,5]}]}
                                                            })
        res.status(200).send(contratoDetalles)
    } catch (e) {
        res.status(500).send({message: e.message})
        console.log(e.message);
    }
}

async function updateContratoDetalle(req,res){
    try {
        await ContratoDetalle.findByIdAndUpdate(req.params.id, req.body);
        res.json({
            status: 'ContratoDetalle Updated'
        });
    } catch (e) {
        res.status(500).send({message: e.message})
    }
    
}
async function deleteContratoDetalle(req,res){
    try {
        await ContratoDetalle.findByIdAndRemove(req.params.id)    
        res.json({
            status: 'contratoDetalle deleted!'
        })
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}
async function getContratoDetallePorContratoId(req, res){
    try {
        const contratoDetalles = await ContratoDetalle.find({"idContrato" :req.params.id})
        res.status(200).send(contratoDetalles)      
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function getContratoDetalle(req,res){
    try {
        const contratoDetalle = await ContratoDetalle.findById(req.params.id);
        res.json(contratoDetalle);
    } catch (e) {
        res.status(500).send({message:e.message})
    }
}


module.exports = {
    addContratoDetalle,
    getContratoDetalles,
    updateContratoDetalle,
    deleteContratoDetalle,
    getContratoDetalle,
    getContratoDetallePorContratoId,
    getContratoDetallesxCodigoCliente
}