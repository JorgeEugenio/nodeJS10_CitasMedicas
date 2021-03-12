//const { emit } = require('../models/Doctor')
const Doctor =require('../models/Doctor')
//const e = require('express')
async function addDoctor (req,res){
    try {
        const {
            nombreDoctor,
            apellidoDoctor,
            estadoDoctor,
            idEspecialidad
        } = req.body

        const doctor = Doctor({
            nombreDoctor,
            apellidoDoctor,
            estadoDoctor,
            idEspecialidad
        })
        await doctor.save()
        res.status(201).send(doctor)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}
async function getDoctores(req, res){
    const doctores = await Doctor.find()
    res.status(200).send(doctores)
    }
async function updateDoctor(req,res){
    await Doctor.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: 'Doctor Updated'
  });
}

async function deleteDoctor(req,res){
    try {
        await Doctor.findByIdAndRemove(req.params.id)    
        res.json({
            status: 'cliente deleted!'
        })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}

async function getDoctor(req,res){
    try {
        const doctor = await Doctor.findOne({_id: req.params.id});
    res.json(doctor);
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}

async function getDoctoresDetalles(req, res){
    try {
        const doctoresDetalles = await Doctor.aggregate()
                                .lookup({
                                    from: "especialidads",
                                    localField: "idEspecialidad",
                                    foreignField: "_id",
                                    as: 'detalle'
                                    })
                                .replaceRoot({
                                    doctoresDetalles: { $mergeObjects: [ { $arrayElemAt: [ "$detalle", 0 ] }, "$$ROOT" ] }  
                                })
                                .project({
                                    "nombreDoctor":"$doctoresDetalles.nombreDoctor",
                                    "apellidoDoctor":"$doctoresDetalles.apellidoDoctor",
                                    "estadoDoctor":"$doctoresDetalles.estadoDoctor",
                                    "nombreEspecialidad":"$doctoresDetalles.nombreEspecialidad",
                                    "_id":"$doctoresDetalles._id",
                                    "idEspecialidad":"$doctoresDetalles.idEspecialidad",
                                    "doctoresDetalles":"$doctoresDetalles",
                                })
        res.status(200).send(doctoresDetalles)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}


module.exports = {
    addDoctor,
    getDoctores,
    updateDoctor,
    deleteDoctor,
    getDoctor,
    getDoctoresDetalles
}