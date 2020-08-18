module.exports = function (sequelize, DataTypes) {
    const Airport2 = sequelize.define("Airport2", {
        icao: DataTypes.STRING,
        iata: DataTypes.STRING,
        name: DataTypes.STRING,
        state: DataTypes.STRING,
        country: DataTypes.STRING,
        airportElevation: DataTypes.INTEGER,
        latitude: DataTypes.DECIMAL(11,9),
        longitude: DataTypes.DECIMAL(12,9),
        timeZoneName: DataTypes.STRING,
    });

    return Airport2;
}