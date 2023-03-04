module.exports = (sequelize, DataTypes) => {

    const History = sequelize.define('History', {
        Spot: {
            type: DataTypes.INTEGER,
            field: 'spot'
        },
        // UserId: DataTypes.INTEGER,
        // VideoId: DataTypes.INTEGER,

    })

    History.associate = function (models) {
        History.belongsTo(models.User)
        History.belongsTo(models.Video)
    }


    return History
}