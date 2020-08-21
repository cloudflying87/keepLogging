module.exports = function(sequelize, DataTypes) {
    const FlightTime = sequelize
        .define("FlightTime", {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        // tailNumber: {
        //   type: DataTypes.INTEGER,
        //   references:{
        //       model:"aircraft",
        //       key:"id"
        //   }
        // },
        route: DataTypes.STRING,
        flightNum: DataTypes.STRING,
        depTime: DataTypes.TIME,
        arrTime: DataTypes.TIME,
        landings: DataTypes.INTEGER,
        imc: DataTypes.DECIMAL(5, 2),
        hood: DataTypes.DECIMAL(5, 2),
        iap: DataTypes.INTEGER,
        holds: DataTypes.INTEGER,
        pic: {
           type: DataTypes.DECIMAL(5, 2),
           allowNull: true,
           default: null,
        },
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
        instructorID: DataTypes.INTEGER,
        student: DataTypes.STRING,
        studentID: DataTypes.INTEGER,
    });

    FlightTime.associate = function(models) {
        FlightTime.belongsTo(models.User);
        FlightTime.belongsTo(models.Aircraft);
        FlightTime.belongsTo(models.AircraftModels, {
            through: models.Aircraft});
    };
    

    return FlightTime;
};

// exports.totalFlightTimes = () => FlightTime.findAll({
//     attributes: ['userId', [sequelize.fn('sum', sequelize.col('total')), 'total']],
//   });