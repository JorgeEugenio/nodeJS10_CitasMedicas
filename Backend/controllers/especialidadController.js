const Especialidad =require('../models/Especialidad')

async function addEspecialidad (req,res){
    try {
        const {
            nombreEspecialidad,
            detalleEspecialidad
        } = req.body

        const especialidad = Especialidad({
            nombreEspecialidad,
            detalleEspecialidad
        })
        await especialidad.save()
        res.status(201).send(especialidad)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}
async function getEspecialidades(req, res){
    const especialidades = await Especialidad.find()
    //console.log(especialidades);
    res.status(200).send(especialidades)
    }
async function updateEspecialidad(req,res){
    await Especialidad.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: 'Especialidad Updated'
  });
}

async function deleteEspecialidad(req,res){
    await Especialidad.findByIdAndRemove(req.params.id)    
res.json({
    status: 'cliente deleted!'
})
}

async function getEspecialidad(req,res){
    const especialidad = await Especialidad.findOne({_id: req.params.id});
    //console.log(especialidad);
    res.json(especialidad);
}

module.exports = {
    addEspecialidad,
    getEspecialidades,
    updateEspecialidad,
    deleteEspecialidad,
    getEspecialidad
}