module.exports = function(sequelize, DataTypes) {
    const Aircraft = sequelize.define("Aircraft", {
        aircraftType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        class: DataTypes.STRING,
        numEngine: DataTypes.STRING,
        tailWheel: { 
            type: DataTypes.BOOLEAN, 
            allowNull: true, 
            defaultValue: 0
        },
        highPerf: { 
            type: DataTypes.BOOLEAN, 
            allowNull: true, 
            defaultValue: 0
        },
        complex: { 
            type: DataTypes.BOOLEAN, 
            allowNull: true, 
            defaultValue: 0
        },
        turboFan: { 
            type: DataTypes.BOOLEAN, 
            allowNull: true, 
            defaultValue: 0
        },
        turboProp: { 
            type: DataTypes.BOOLEAN, 
            allowNull: true, 
            defaultValue: 0
        },
        rotorcraft: { 
            type: DataTypes.BOOLEAN, 
            allowNull: true, 
            defaultValue: 0
        },
        poweredLift: { 
            type: DataTypes.BOOLEAN, 
            allowNull: true, 
            defaultValue: 0
        },
    });
    return Aircraft;
}