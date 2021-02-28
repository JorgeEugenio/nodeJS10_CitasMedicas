const Plan =require('../models/Plan')

async function addPlan (req,res){
    try {
        const {
            nombrePlan,
            descripcion,
            costo,
            status
        } = req.body
        const plan = Plan({
            nombrePlan,
            descripcion,
            costo,
            status
        })
        await plan.save()
        res.status(201).send(plan)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}
async function getPlanes(req, res){
    const planes = await Plan.find()
    //res.status(200).send({"elementos": planes})
    res.status(200).send(planes)
    }
async function updatePlan(req,res){
    await Plan.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: 'Plan Updated'
  });
}

async function deletePlan(req,res){
    await Plan.findByIdAndRemove(req.params.id)    
res.json({
    status: 'cliente deleted!'
})
}

async function getPlan(req,res){
    const plan = await Plan.findById(req.params.id);
    res.json(plan);
}

async function getPlanDetalles(req,res){
    const plan = await Plan.aggregate()
                            .project({ nombrePlan: 1, descripcion:1, costo: 1})
    res.json(plan);
}
module.exports = {
    addPlan,
    getPlanes,
    updatePlan,
    deletePlan,
    getPlan,
    getPlanDetalles
}