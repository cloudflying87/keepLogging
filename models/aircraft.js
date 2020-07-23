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
        complex: { 
            type: DataTypes.BOOLEAN, 
            allowNull: true, 
            defaultValue: 0
        },
        highPerf: { 
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
        createdAt: {
            type: DataTypes.DATE(3),
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
            field: 'created_at',
        },
        updatedAt: {
            type: DataTypes.DATE(3),
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
            field: 'updated_at',
        },
    });
    return Aircraft;
}