const Cliente = require('../models/Cliente')
async function addCliente (req,res) {
    try {
        const {
            statusCliente,
            codigoCliente,
            nombreCliente,
            apellidoCliente,
            dniCliente,
            correoCliente,
            fechaCreacionCliente,
            statusUpdate,
            direccionCliente: {
                departamento ,
                provincia ,
                distrito ,
                programa ,
                mzlt
            }
        } = req.body
        //console.log(req.body);
        const cliente = Cliente({
            statusCliente,
            codigoCliente,
            nombreCliente,
            apellidoCliente,
            dniCliente,
            correoCliente,
            fechaCreacionCliente,
            statusUpdate,
            direccionCliente: {
                departamento ,
                provincia ,
                distrito ,
                programa ,
                mzlt
            }
        })
        await cliente.save()
        res.status(200).send(cliente)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}


async function getClientes(req, res){
    try {
        const clientes = await Cliente.find()
        res.status(200).send(clientes)      
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}


async function updateCliente(req,res){
    try {
        await Cliente.findByIdAndUpdate(req.params.id, req.body);
        res.json({
            status: 'Cliente Updated'
        });
    } catch (e) {
        res.status(500).send({message: e.message})
    }
    
}
async function deleteCliente(req,res){
    try {
        await Cliente.findByIdAndRemove(req.params.id)    
        res.json({
            status: 'cliente deleted!'
        })
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function getCliente(req,res){
    try {
        const cliente = await Cliente.findById(req.params.id);
        res.json(cliente);
    } catch (e) {
        res.status(500).send({message:e.message})
    }
}
async function getClientePorCodigo(req,res){
    try {
        const cliente = await Cliente.find({codigoCliente: req.params.id});
        res.json(cliente);
    } catch (e) {
        res.status(500).send({message:e.message})
    }
}
async function getClientesDetalles(req, res){
    try {
        const clientesDetalles = await Cliente.aggregate()
                                .lookup({
                                    from: "cuentapagos",
                                    localField: "idCuentaPago",
                                    foreignField: "_id",
                                    as: 'detalles'
                                    })
                                .replaceRoot({
                                    detalles: { $mergeObjects: [ { $arrayElemAt: [ "$detalles", 0 ] }, "$$ROOT" ] }  
                                })
                                .project({
                                    "_id":"$detalles._id",
                                    "apellidoCliente":"$detalles.apellidoCliente",
                                    "codigoCliente":"$detalles.codigoCliente",
                                    "direccionCliente":"$detalles.direccionCliente",
                                    "dniCliente":"$detalles.dniCliente",
                                    "correoCliente":"$detalles.correoCliente",
                                    "fechaCreacionCliente":"$detalles.fechaCreacionCliente",
                                    "idCuentaPago":"$detalles.idCuentaPago",
                                    "nombreCliente":"$detalles.nombreCliente",
                                    "statusCliente":"$detalles.statusCliente",
                                    "createdAt":"$detalles.createdAt",
                                    "updatedAt":"$detalles.updatedAt",
                                    "statusUpdate":"$detalles.statusUpdate",
                                    "banco":{ $arrayElemAt: [ "$detalles.detalles.banco", 0 ] },
                                    "nombreCuentaPago":{ $arrayElemAt: [ "$detalles.detalles.nombreCuentaPago", 0 ] },
                                    "numeroCuentaPago":{ $arrayElemAt: [ "$detalles.detalles.numeroCuentaPago", 0 ] }
                                })  
        res.status(200).send(clientesDetalles)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

module.exports = {
    addCliente,
    getClientes,
    updateCliente,
    deleteCliente,
    getCliente,
    getClientesDetalles,
    getClientePorCodigo
}