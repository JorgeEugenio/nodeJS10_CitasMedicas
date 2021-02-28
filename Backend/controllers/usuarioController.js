const Usuario =require('../models/Usuario')

async function addUsuario (req,res){
    try {
        const {
            nombreUsuario,
            apellidoUsuario,
            user,
            pass,
            correoUsuario
        } = req.body

        const usuario = Usuario({
            nombreUsuario,
            apellidoUsuario,
            user,
            pass,
            correoUsuario
        })
        await usuario.save()
        res.status(201).send(usuario)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}
async function getUsuarios(req, res){
    const usuarios = await Usuario.find()
    //console.log(usuarios);
    res.status(200).send(usuarios)
    }
async function updateUsuario(req,res){
    await Usuario.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: 'Usuario Updated'
  });
}

async function deleteUsuario(req,res){
    await Usuario.findByIdAndRemove(req.params.id)    
res.json({
    status: 'cliente deleted!'
})
}

async function getUsuario(req,res){
    const usuario = await Usuario.findOne({_id: req.params.id});
    //console.log(usuario);
    res.json(usuario);
}

module.exports = {
    addUsuario,
    getUsuarios,
    updateUsuario,
    deleteUsuario,
    getUsuario
}