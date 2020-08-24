module.exports = function(sequelize, DataTypes) {
    var userPreferences = sequelize.define("userPreferences", {
            instructorID: DataTypes.STRING,
            Access: DataTypes.STRING,
            studentID: DataTypes.STRING,
            AircraftIds: DataTypes.STRING,
            // instructorCanView: DataTypes.BOOLEAN,
            // instructorCanAdd: DataTypes.BOOLEAN,
            // student: DataTypes.INTEGER,

        })
    return userPreferences;
};

