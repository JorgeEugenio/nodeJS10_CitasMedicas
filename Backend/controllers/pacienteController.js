const Paciente =require('../models/Paciente')

async function addPaciente (req,res){
    try {
        const {
            nombrePaciente,
            apellidoPaciente,
            dniPaciente,
        } = req.body

        const paciente = Paciente({
            nombrePaciente,
            apellidoPaciente,
            dniPaciente,
        })
        await paciente.save()
        res.status(201).send(paciente)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}
async function getPacientes(req, res){
    const pacientes = await Paciente.find()
    //console.log(pacientes);
    res.status(200).send(pacientes)
    }
async function updatePaciente(req,res){
    await Paciente.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: 'Paciente Updated'
  });
}

async function deletePaciente(req,res){
    await Paciente.findByIdAndRemove(req.params.id)    
res.json({
    status: 'cliente deleted!'
})
}

async function getPaciente(req,res){
    const paciente = await Paciente.findOne({_id: req.params.id});
    //console.log(paciente);
    res.json(paciente);
}

module.exports = {
    addPaciente,
    getPacientes,
    updatePaciente,
    deletePaciente,
    getPaciente
}