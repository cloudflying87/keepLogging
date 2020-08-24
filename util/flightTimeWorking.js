var db = require("../models");

module.exports = async function(data){
    console.log(data.arrAir)
    // db.Aircraft.findAll({
    //     where:{
    //       aircraftType: req.params.aircraftType
    //     },
    // })
    
    return data
}
