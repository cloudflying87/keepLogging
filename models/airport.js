module.exports = function (sequelize, DataTypes) {
    const Airport = sequelize.define("Airport", {
        airportName: DataTypes.STRING,
        airportCity: DataTypes.STRING,
        airportCountry: DataTypes.STRING,
        threeLetter: DataTypes.STRING,
        icao: DataTypes.STRING,
        latitude: DataTypes.DECIMAL(11,9),
        longitude: DataTypes.DECIMAL(12,9),
        airportElevation: DataTypes.INTEGER,
        timeZone: DataTypes.INTEGER,
        timeZoneName: DataTypes.STRING,
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
    // Airport.associate = function (models) {
    //     Airport.hasMany(models.FlightTime, {
    //     foreignKey: {
    //             name: "depAir",
    //             allowNull: false
    //         },
    //         onDelete: "cascade",
    //     });
    // };
    return Airport;
}