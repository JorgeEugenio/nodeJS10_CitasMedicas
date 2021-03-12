//const { emit } = require('../models/Tablacitamedica')
const Tablacitamedica =require('../models/Tablacitamedica')
//const e = require('express')
async function addTablacitamedica (req,res){
    try {
        const {
            idDoctor,
            idUsuario,
            idPaciente,
            turnos: {
                fechaAtencion,
                turno,
                reservacion,
                confirmacionReserva
            }
        } = req.body

        const tablacitamedica = Tablacitamedica({
            idDoctor,
            idUsuario,
            idPaciente,
            turnos: {
                fechaAtencion,
                turno,
                reservacion,
                confirmacionReserva
            }
        })
        await tablacitamedica.save()
        res.status(201).send(tablacitamedica)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}
async function getTablacitamedicaes(req, res){
    const tablacitamedicaes = await Tablacitamedica.find()
    res.status(200).send(tablacitamedicaes)
    }
async function updateTablacitamedica(req,res){
    await Tablacitamedica.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: 'Tablacitamedica Updated'
  });
}

async function deleteTablacitamedica(req,res){
    try {
        await Tablacitamedica.findByIdAndRemove(req.params.id)    
        res.json({
            status: 'cliente deleted!'
        })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}

async function getTablacitamedica(req,res){
    try {
        const tablacitamedica = await Tablacitamedica.findOne({_id: req.params.id});
    res.json(tablacitamedica);
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}

async function getTablacitamedicaesDetalles(req, res){
    try {
        const tablacitamedicaesDetalles = await Tablacitamedica.aggregate()
                                .lookup({
                                    from: "torres",
                                    localField: "idTorre",
                                    foreignField: "_id",
                                    as: 'torre'
                                    })
                                .replaceRoot({
                                    tablacitamedicaesDetalles: { $mergeObjects: [ { $arrayElemAt: [ "$torre", 0 ] }, "$$ROOT" ] }  
                                })
        res.status(200).send(tablacitamedicaesDetalles)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}


module.exports = {
    addTablacitamedica,
    getTablacitamedicaes,
    updateTablacitamedica,
    deleteTablacitamedica,
    getTablacitamedica,
    getTablacitamedicaesDetalles
}