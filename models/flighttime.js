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
        flightNum: DataTypes.INTEGER,
        depTime: DataTypes.TIME,
        arrTime: DataTypes.TIME,
        landings: DataTypes.INTEGER,
        imc: DataTypes.DECIMAL(5, 2),
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
        comments: DataTypes.STRING
    });
    return FlightTime;
};