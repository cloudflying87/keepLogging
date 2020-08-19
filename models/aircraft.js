// const airport = require("./airport");

module.exports = function (sequelize, DataTypes) {
    const Aircraft = sequelize.define("Aircraft", {
        tail_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        modelID: DataTypes.INTEGER,
        avionics: DataTypes.STRING,
        
        
    });
    // Aircraft.associate = function (models) {
    //     Aircraft.hasOne(models.AircraftModels);
    // };
    return Aircraft;
};