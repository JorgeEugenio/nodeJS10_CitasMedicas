const Torre =require('../models/Torre')

async function getHome(req, res){
    const torres = await Torre.find()
    //console.log(torres);
    res.status(200).send(torres)
    
    }

module.exports = {
    getHome
}