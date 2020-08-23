module.exports = function(sequelize, DataTypes) {
    const userPreference = sequelize
        .define("userPreference", {
            instructor: DataTypes.INTEGER,
            instructorCanView: DataTypes.BOOLEAN,
            instructorCanAdd: DataTypes.BOOLEAN,
            student: DataTypes.INTEGER,
            aircraft: DataTypes.STRING,
            UserId: DataTypes.INTEGER,
        })
    return userPreference;
};

