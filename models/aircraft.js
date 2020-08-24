// const AircraftModels = require("./airport");

module.exports = function (sequelize, DataTypes) {
    const Aircraft = sequelize.define("Aircraft", {
        tailNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        AircraftModelId:{
        type: DataTypes.INTEGER,
          references:{
              model:"AircraftModels",
              key:"id"
          }
        },
        avionics: DataTypes.STRING,
        
        
    });

    Aircraft.associate = function (models) {
        Aircraft.belongsTo(models.AircraftModels)
    }
    
    return Aircraft;
};