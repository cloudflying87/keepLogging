module.exports = function(sequelize, DataTypes) {
    const FlightTime = sequelize.define("FlightTime", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        //     refrences: {
        //         model: User,
        //         key: id
        //     }
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        aircraftId: DataTypes.STRING,
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
        aircraftType: {
            type: DataTypes.INTEGER,
            allowNull: false,
        //     refrences: {
        //         model: Aircraft,
        //         key: id
        //     }
        },
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
    return FlightTime;
};