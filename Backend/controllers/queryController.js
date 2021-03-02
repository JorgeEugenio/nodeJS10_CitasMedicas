const Query =require('../models/Query')

async function addQuery (req,res){
    try {
        const {
            project,
            query,
            rutaQuery,
            tipoQuery
        } = req.body

        const queries = Query({
            project,
            query,
            rutaQuery,
            tipoQuery
        })
        await queries.save()
        res.status(201).send(queries)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}
async function getQuerys(req, res){
    const querys = await Query.find()
    //console.log(querys);
    res.status(200).send(querys)
    }
async function updateQuery(req,res){
    await Query.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: 'Query Updated'
  });
}

async function deleteQuery(req,res){
    await Query.findByIdAndRemove(req.params.id)    
res.json({
    status: 'cliente deleted!'
})
}

async function getQuery(req,res){
    const query = await Query.findOne({_id: req.params.id});
    //console.log(query);
    res.json(query);
}

module.exports = {
    addQuery,
    getQuerys,
    updateQuery,
    deleteQuery,
    getQuery
}