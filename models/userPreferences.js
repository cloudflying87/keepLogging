module.exports = function(sequelize, DataTypes) {
    var userPreferences = sequelize.define("userPreferences", {
            Email: DataTypes.STRING,
            Access: DataTypes.STRING,
            AccountAccess: DataTypes.STRING,
            // instructorCanView: DataTypes.BOOLEAN,
            // instructorCanAdd: DataTypes.BOOLEAN,
            // student: DataTypes.INTEGER,

        })
    return userPreferences;
};

