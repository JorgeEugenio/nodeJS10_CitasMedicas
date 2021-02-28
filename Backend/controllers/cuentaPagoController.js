const CuentaPago = require('../models/CuentaPago')
async function addCuentaPago (req,res) {
    try {
        const {
            banco,
            nombreCuentaPago,
            numeroCuentaPago,
            cciCuentaPago,
            propietarioCuentaPago,
            statusCuentaPago
        } = req.body
        const cuentapago = CuentaPago({
            banco,
            nombreCuentaPago,
            numeroCuentaPago,
            cciCuentaPago,
            propietarioCuentaPago,
            statusCuentaPago
        })
        await cuentapago.save()
        res.status(201).send(cuentapago)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}


async function getCuentaPagos(req, res){
const cuentapagos = await CuentaPago.find()
res.status(200).send(cuentapagos)
}

async function updateCuentaPago(req,res){
    try {
        await CuentaPago.findOneAndUpdate({_id: req.params.id}, req.body);    
        res.json({
            status: 'CuentaPago Updated'
          });
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}
async function deleteCuentaPago(req,res){
    await CuentaPago.findByIdAndRemove(req.params.id)    
    res.json({
        status: 'cuentapago deleted!'
    })
}

async function getCuentaPago(req,res){
    const cuentapago = await CuentaPago.findOne({_id: req.params.id});
    res.json(cuentapago);
}


module.exports = {
    addCuentaPago,
    getCuentaPagos,
    updateCuentaPago,
    deleteCuentaPago,
    getCuentaPago
}