module.exports = function (sequelize, DataTypes) {
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
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        },
    });

    Aircraft.associate = function (models) {
        Aircraft.hasMany(models.FlightTime, {
            // foreignKey: {
            //     name: "aircraftType",
            //     allowNull: false
            // },
            onDelete: "cascade",
            //   allowNull: false
        });
    };

    return Aircraft;
};