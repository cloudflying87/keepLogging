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
    });
    Airport.associate = function (models) {
        Airport.hasMany(models.FlightTime);
    };

    return Airport;
}