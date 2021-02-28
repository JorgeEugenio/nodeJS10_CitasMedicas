const Contrato = require('../models/Contrato')
async function addContrato (req,res) {
    try {
        const {
            statusContrato,
            codigoContrato,
            idCliente
        } = req.body
        //console.log(req.body);
        const contrato = Contrato({
            statusContrato,
            codigoContrato,
            idCliente
        })
        await contrato.save()
        res.status(200).send(contrato)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}


async function getContratos(req, res){
    try {
        const contratos = await Contrato.find()
        res.status(200).send(contratos)      
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}


async function updateContrato(req,res){
    try {
        await Contrato.findByIdAndUpdate(req.params.id, req.body);
        res.json({
            status: 'Contrato Updated'
        });
    } catch (e) {
        res.status(500).send({message: e.message})
    }
    
}
async function deleteContrato(req,res){
    try {
        await Contrato.findByIdAndRemove(req.params.id)    
        res.json({
            status: 'contrato deleted!'
        })
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}
async function deleteContratoxCodigo(req,res){
    try {
        await Contrato.deleteOne({"codigoContrato": req.params.id})    
        res.json({
            status: 'contrato deleted!'
        })
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}
async function getContrato(req,res){
    try {
        const contrato = await Contrato.findById(req.params.id);
        res.json(contrato);
    } catch (e) {
        res.status(500).send({message:e.message})
    }
}
async function getContratoByCodigo(req,res){
    try {
        const contrato = await Contrato.find({"codigoContrato": req.params.id});
        res.json(contrato);
    } catch (e) {
        res.status(500).send({message:e.message})
    }
}
async function getContratosDetalles(req, res){
    try {
        const contratosDetalles = await Contrato.aggregate()
                                .lookup({
                                    from: "torres",
                                    localField: "idTorre",
                                    foreignField: "_id",
                                    as: 'torre'
                                    })
                                .replaceRoot({
                                    contratosDetalles: { $mergeObjects: [ { $arrayElemAt: [ "$torre", 0 ] }, "$$ROOT" ] }  
                                })
        res.status(200).send(sectoresDetalles)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

module.exports = {
    addContrato,
    getContratos,
    updateContrato,
    deleteContrato,
    getContrato,
    getContratosDetalles,
    getContratoByCodigo,
    deleteContratoxCodigo
}