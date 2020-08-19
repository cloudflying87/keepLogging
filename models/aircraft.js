// const AircraftModels = require("./airport");

module.exports = function (sequelize, DataTypes) {
    const Aircraft = sequelize.define("Aircraft", {
        tailNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avionics: DataTypes.STRING,
        
        
    });

    Aircraft.associate = function (models) {
        Aircraft.belongsTo(models.AircraftModels)
    }
    
    return Aircraft;
};