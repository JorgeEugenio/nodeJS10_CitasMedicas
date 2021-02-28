const Servicio =require('../models/Servicio')

async function addServicio (req,res){
    try {
        const {
            service,
            costo,
            status
        } = req.body

        const servicio = Servicio({
            service,
            costo,
            status
        })
        await servicio.save()
        res.status(201).send(servicio)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}
async function getServicios(req, res){
    const servicios = await Servicio.find()
    res.status(200).send(servicios)
    }
async function updateServicio(req,res){
    await Servicio.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: 'Servicio Updated'
  });
}

async function deleteServicio(req,res){
    await Servicio.findByIdAndRemove(req.params.id)    
res.json({
    status: 'cliente deleted!'
})
}

async function getServicio(req,res){
    const servicio = await Servicio.findById(req.params.id);
    res.json(servicio);
}

module.exports = {
    addServicio,
    getServicios,
    updateServicio,
    deleteServicio,
    getServicio
}