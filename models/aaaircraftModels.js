// const airport = require("./airport");

module.exports = function (sequelize, DataTypes) {
    const AircraftModels = sequelize.define("AircraftModels", {
        manufacture_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.STRING,
        category_class: DataTypes.STRING,
        engine_count: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        engine_type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        wtc: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tdesig: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        complex: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        highPerf: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        tailWheel: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        taa: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        simulator: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
    });

    AircraftModels.associate = function (models) {
        AircraftModels.hasMany(models.Aircraft, {
            onDelete: "cascade",
            
        });
    };


    return AircraftModels;
};