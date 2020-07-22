module.exports = function(sequelize, DataTypes) {
    const flightTime = sequelize.define("flightTime", {
        userId: {
            type: DataTypes.INT,
            allowNull: false,
            refrences: {
                model: user,
                key: id
            }
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        aircraftId: DataTypes.STRING,
        depAir: DataTypes.STRING,
        enrRout: DataTypes.STRING,
        arrAir: DataTypes.STRING,
        flightNum: DataTypes.INT,
        depTime: DataTypes.TIME,
        arrTime: DataTypes.TIME,
        landings: DataTypes.INT,
        imc: DataTypes.DECIMAL(5, 2),
        hood: DataTypes.DECIMAL(5, 2),
        iap: DataTypes.INT,
        holds: DataTypes.INT,
        aircraftType: {
            type: DataTypes.INT,
            allowNull: false,
            refrences: {
                model: aircraft,
                key: id
            }
        },
        pic: DECIMAL(5, 2),
        sic: DECIMAL(5, 2),
        cfi: DECIMAL(5, 2),
        dualI: DECIMAL(5, 2),
        cxt: DECIMAL(5, 2),
        comments: DataTypes.STRING
    });
};