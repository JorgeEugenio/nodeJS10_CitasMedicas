const mongoose = require('mongoose')
const BoletaDetalle = require('../models/BoletaDetalle')
async function addBoletaDetalle (req,res) {
    try {
        const {
            statusBoletaDetalle,
            codigoBoleta,
            idCliente,
            serviciosContratados: {
                idServicio,
                nombreServicio,
                detalleServicio,
                costoServicio
            },
            fechaAnio,
            fechaMes
        } = req.body
        const boletaDetalle = BoletaDetalle({
            statusBoletaDetalle,
            codigoBoleta,
            idCliente,
            serviciosContratados: {
                idServicio,
                nombreServicio,
                detalleServicio,
                costoServicio
            },
            fechaAnio,
            fechaMes
        })
        await boletaDetalle.save()
        res.status(200).send(boletaDetalle)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}
async function getBoletaDetalles(req, res){
    try {
        const boletaDetalles = await BoletaDetalle.find()
        res.status(200).send(boletaDetalles)      
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}
async function getBoletaDetallesxCodigoCliente(req, res){
    try {
        const boletaDetalles = await BoletaDetalle.aggregate()
                                                        .match({ idCliente: mongoose.Types.ObjectId((req.params.id)) })
                                                        .project({
                                                            _id:1,
                                                            "statusBoletaDetalle":1,
                                                            "codigoBoleta": 1,
                                                            "serviciosContratados":1,
                                                            "idCliente":1,
                                                            "fechaAnio":1,
                                                            "fechaMes":1,
                                                            "AnioMes": { $concat : ["$fechaAnio","-","$fechaMes"]},
                                                            "createdAt": { $concat : [{$substr :["$createdAt",0 ,10]},":",{$substr :["$createdAt", 11,5]}]},
                                                            "updatedAt": { $concat : [{$substr :["$updatedAt",0 ,10]},":",{$substr :["$updatedAt", 11,5]}]}
                                                            })
        res.status(200).send(boletaDetalles)
    } catch (e) {
        res.status(500).send({message: e.message})
        console.log(e.message);
    }
}

async function updateBoletaDetalle(req,res){
    console.log(req.body);
    try {
        
        await BoletaDetalle.findByIdAndUpdate(req.params.id, req.body);
        res.json({
            status: 'BoletaDetalle Updated'
        });
    } catch (e) {
        res.status(500).send({message: e.message})
    }
    
}
async function deleteBoletaDetalle(req,res){
    try {
        await BoletaDetalle.findByIdAndRemove(req.params.id)    
        res.json({
            status: 'boletaDetalle deleted!'
        })
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}
async function getBoletaDetallexCodigoBoleta(req, res){
    try {
        const boletaDetalles = await BoletaDetalle.find({"codigoBoleta" :req.params.id})
        res.status(200).send(boletaDetalles)      
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}
async function getBoletaDetalle(req,res){
    try {
        const boletaDetalle = await BoletaDetalle.findById(req.params.id);
        res.json(boletaDetalle);
    } catch (e) {
        res.status(500).send({message:e.message})
    }
}
async function getBoletaDetallesDetalles(req, res){
    try {
        const boletaDetallesDetalles = await BoletaDetalle.aggregate()
                                .lookup({
                                    from: "torres",
                                    localField: "idTorre",
                                    foreignField: "_id",
                                    as: 'torre'
                                    })
                                .replaceRoot({
                                    boletaDetallesDetalles: { $mergeObjects: [ { $arrayElemAt: [ "$torre", 0 ] }, "$$ROOT" ] }  
                                })
        res.status(200).send(sectoresDetalles)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}
async function getBoletaDetallesxTodo(req, res){
    try {
        const boletaDetallesDetalles = await BoletaDetalle.aggregate()
                                .lookup({
                                    from: "clientes",
                                    localField: "idCliente",
                                    foreignField: "_id",
                                    as: 'cliente'
                                    })
                                .replaceRoot({
                                    data: { $mergeObjects: [ { $arrayElemAt: [ "$cliente", 0 ] }, "$$ROOT" ] }  
                                })
                                .project({
                                    "_id":"$data._id",
                                    "codigoBoleta":"$data.codigoBoleta",
                                    "codigoCliente":"$data.codigoCliente",
                                    "nombreCliente":"$data.nombreCliente",
                                    "fechaAnio":"$data.fechaAnio",
                                    "fechaMes":"$data.fechaMes"
                                })
        res.status(200).send(boletaDetallesDetalles)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

module.exports = {
    addBoletaDetalle,
    getBoletaDetalles,
    updateBoletaDetalle,
    deleteBoletaDetalle,
    getBoletaDetalle,
    getBoletaDetallesDetalles,
    getBoletaDetallexCodigoBoleta,
    getBoletaDetallesxCodigoCliente,
    getBoletaDetallesxTodo
}