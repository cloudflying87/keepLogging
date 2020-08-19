module.exports = function (sequelize, DataTypes) {
    const Airport = sequelize.define("Airport", {
        icao: DataTypes.STRING,
        iata: DataTypes.STRING,
        name: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        country: DataTypes.STRING,
        elevation: DataTypes.INTEGER,
        lat: DataTypes.DECIMAL(11,9),
        lon: DataTypes.DECIMAL(12,9),
        tz: DataTypes.STRING,
    });

    return Airport;
}