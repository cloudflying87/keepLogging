module.exports = function(sequelize, DataTypes) {
    const FlightTime = sequelize.define("FlightTime", {
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        tailNumber: DataTypes.STRING,
        depAir: DataTypes.STRING,
        enrRout: DataTypes.STRING,
        arrAir: DataTypes.STRING,
        flightNum: DataTypes.STRING,
        depTime: DataTypes.TIME,
        arrTime: DataTypes.TIME,
        landings: DataTypes.INTEGER,
        imc: DataTypes.DECIMAL,
        hood: DataTypes.DECIMAL(5, 2),
        iap: DataTypes.INTEGER,
        holds: DataTypes.INTEGER,
        pic: DataTypes.DECIMAL(5, 2),
        sic: DataTypes.DECIMAL(5, 2),
        cfi: DataTypes.DECIMAL(5, 2),
        dualI: DataTypes.DECIMAL(5, 2),
        cxt: DataTypes.DECIMAL(5, 2),
        solo: DataTypes.DECIMAL(5, 2),
        total: DataTypes.DECIMAL(5, 2),
        dayLdg: DataTypes.INTEGER,
        night: DataTypes.DECIMAL(5, 2),
        nightLdg: DataTypes.INTEGER,
        comments: DataTypes.STRING,
        instructor: DataTypes.STRING,
        student: DataTypes.STRING,
        // createdAt: {
        //     allowNull: false,
        //     type: DataTypes.DATE,
        //     defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        // },
        // updatedAt: {
        //     allowNull: false,
        //     type: DataTypes.DATE,
        //     defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        // }
    });

    FlightTime.associate = function(models) {
        FlightTime.belongsTo(models.User, {
            // foreignKey: {
            //     allowNull: false
            // }
        });
        FlightTime.belongsTo(models.Aircraft);
        // FlightTime.belongsTo(models.Airport{
        //     foreignKey: {

        //     }
        // })
    };

    return FlightTime;
};