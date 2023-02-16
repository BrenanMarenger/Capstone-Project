module.exports = (sequelize, DataTypes) => {
    const Favorites = sequelize.define("Favorites", {})

    Favorites.associate = function (models) {
        Favorites.belongsTo(models.User)
        Favorites.belongsTo(models.Video)
    }

    return Favorites
}