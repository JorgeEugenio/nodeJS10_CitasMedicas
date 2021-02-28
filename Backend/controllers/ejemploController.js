const Ejemplo =require('../models/Ejemplo')

async function addEjemplo (req,res){
    try {
        const {
            TipoEjemplo,
            nombreEjemplo ,
            descripcion ,
            direccion: {
                departamento ,
                provincia ,
                distrito ,
                programa ,
                mzlt ,
            },
            status 
        } = req.body

        const ejemplo = Ejemplo({
            TipoEjemplo,
            nombreEjemplo,
            descripcion,
            direccion: {
                departamento,
                provincia,
                distrito,
                programa,
                mzlt,
            },
            status
        })
        await ejemplo.save()
        res.status(201).send(ejemplo)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}
async function getEjemplos(req, res){
    const ejemplos = await Ejemplo.find()
    res.status(200).send(ejemplos)
    }
async function updateEjemplo(req,res){
    await Ejemplo.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: 'Ejemplo Updated'
  });
}

async function deleteEjemplo(req,res){
    await Ejemplo.findByIdAndRemove(req.params.id)    
res.json({
    status: 'cliente deleted!'
})
}

async function getEjemplo(req,res){
    const ejemplo = await Ejemplo.findById(req.params.id);
    res.json(ejemplo);
}

module.exports = {
    addEjemplo,
    getEjemplos,
    updateEjemplo,
    deleteEjemplo,
    getEjemplo
}