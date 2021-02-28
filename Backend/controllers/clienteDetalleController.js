const ClienteDetalle = require('../models/ClienteDetalle')
async function addClienteDetalle (req,res) {
    try {
        const {
            tipoServicio,
            nombreServicio,
            profile,
            remoteAddress
        } = req.body
        //console.log(req.body);
        const clienteDetalles = ClienteDetalle({
            tipoServicio,
            nombreServicio,
            profile,
            remoteAddress
        })
        await clienteDetalles.save()
        res.status(201).send(clienteDetalles)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}


async function getClienteDetalles(req, res){
const clienteDetalles = await ClienteDetalle.find()
res.status(200).send(clienteDetalles)
}

async function updateClienteDetalle(req,res){
    await ClienteDetalle.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: 'ClienteDetalle Updated'
  });
}
async function deleteClienteDetalle(req,res){
    await ClienteDetalle.findByIdAndRemove(req.params.id)    
res.json({
    status: 'clientedetalle deleted!'
})
}

async function getClienteDetalle(req,res){
    const clientedetalle = await ClienteDetalle.findById(req.params.id);
    res.json(clientedetalle);
}


module.exports = {
    addClienteDetalle,
    getClienteDetalles,
    updateClienteDetalle,
    deleteClienteDetalle,
    getClienteDetalle
}