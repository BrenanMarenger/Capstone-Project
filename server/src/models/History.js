module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define("History", {})

    History.associate = function (models) {
        History.belongsTo(models.User) //profile
        History.belongsTo(models.Video)
    }

    return History
}