const mongoose = require('mongoose')
const Boleta = require('../models/Boleta')
async function addBoleta (req,res) {
    try {
        const {
            codigoBoleta,
            fechaAnio,
            fechaMes,
            monto,
            statusBoleta,
            statusPago,
            tiempoPago,
            idCliente
        } = req.body
        const boleta = Boleta({
            codigoBoleta,
            fechaAnio,
            fechaMes,
            monto,
            statusBoleta,
            statusPago,
            tiempoPago,
            idCliente
        })
        await boleta.save()
        res.status(200).send(boleta)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}


async function getBoletas(req, res){
    try {
        //const boletas = await Boleta.find()

        const boletas = await Boleta.aggregate()
        .lookup({
            from: "clientes",
            localField: "idCliente",
            foreignField: "_id",
            as: 'detalles'
            })
        .replaceRoot({
            detalles: { $mergeObjects: [ { $arrayElemAt: [ "$detalles", 0 ] }, "$$ROOT" ] }  
        })
        .project({
            "_id":"$detalles._id",
            "codigoBoleta":"$detalles.codigoBoleta",
            "nombreCliente":"$detalles.nombreCliente",
            "apellidoCliente":"$detalles.apellidoCliente",
            "fechaAnio":"$detalles.fechaAnio",
            "fechaMes":"$detalles.fechaMes",
            "monto":"$detalles.monto",
            "statusBoleta":"$detalles.statusBoleta",
            "codigoCliente":"$detalles.codigoCliente",
            "idCliente":"$detalles.idCliente",
            "statusPago":"$detalles.statusPago",
            "tiempoPago":"$detalles.tiempoPago",
        })
        res.status(200).send(boletas)      
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}


async function updateBoleta(req,res){
    console.log(req.params.id);
    try {
        await Boleta.findByIdAndUpdate(req.params.id, req.body);
        res.json({
            status: 'Boleta Updated'
        });
    } catch (e) {
        res.status(500).send({message: e.message})
    }
    
}
async function updatexCodigoBoleta(req,res){
    console.log(req.params.id);
    try {
        await Boleta.update({codigoBoleta :req.params.id}, req.body);
        res.json({
            status: 'Boleta Updated'
        });
    } catch (e) {
        res.status(500).send({message: e.message})
    }
    
}
async function deleteBoleta(req,res){
    try {
        await Boleta.findByIdAndRemove(req.params.id)    
        res.json({
            status: 'boleta deleted!'
        })
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function getBoleta(req,res){
    try {
        const boleta = await Boleta.findById(req.params.id);
        res.json(boleta);
    } catch (e) {
        res.status(500).send({message:e.message})
    }
}
async function getBoletaxCliente(req,res){
    try {
        const boleta = await Boleta.aggregate()
                                    .match({ idCliente: mongoose.Types.ObjectId((req.params.id)) })
                                    .lookup({
                                        from: "clientes",
                                        localField: "idCliente",
                                        foreignField: "_id",
                                        as: 'detalles'
                                        })
                                    .replaceRoot({
                                        detalles: { $mergeObjects: [ { $arrayElemAt: [ "$detalles", 0 ] }, "$$ROOT" ] }  
                                    })
                                    .project({
                                        "_id":"$detalles._id",
                                        "codigoBoleta":"$detalles.codigoBoleta",
                                        "fechaAnio":"$detalles.fechaAnio",
                                        "fechaMes":"$detalles.fechaMes",
                                        "monto":"$detalles.monto",
                                        "statusBoleta":"$detalles.statusBoleta",
                                        "codigoCliente":"$detalles.codigoCliente",
                                        "idCliente":"$detalles.idCliente",
                                        "statusPago":"$detalles.statusPago",
                                        "tiempoPago":"$detalles.tiempoPago"
                                    })
        res.json(boleta);
    } catch (e) {
        res.status(500).send({message:e.message})
    }
}
async function getBoletaxCodigoBoleta(req,res){
    try {
        const boleta = await Boleta.aggregate()
                                    .match({ codigoBoleta: req.params.id })
                                    .lookup({
                                        from: "clientes",
                                        localField: "idCliente",
                                        foreignField: "_id",
                                        as: 'detalles'
                                        })
                                    .replaceRoot({
                                        detalles: { $mergeObjects: [ { $arrayElemAt: [ "$detalles", 0 ] }, "$$ROOT" ] }  
                                    })
                                    .project({
                                        "_id":"$detalles._id",
                                        "codigoBoleta":"$detalles.codigoBoleta",
                                        "fechaAnio":"$detalles.fechaAnio",
                                        "fechaMes":"$detalles.fechaMes",
                                        "monto":"$detalles.monto",
                                        "statusBoleta":"$detalles.statusBoleta",
                                        "codigoCliente":"$detalles.codigoCliente",
                                        "idCliente":"$detalles.idCliente",
                                        "statusPago":"$detalles.statusPago"
                                    })            
        res.json(boleta);
    } catch (e) {
        res.status(500).send({message:e.message})
    }
}
module.exports = {
    addBoleta,
    getBoletas,
    updateBoleta,
    deleteBoleta,
    getBoleta,
    getBoletaxCliente,
    getBoletaxCodigoBoleta,
    updatexCodigoBoleta
}