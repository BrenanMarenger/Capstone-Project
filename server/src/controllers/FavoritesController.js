const { Favorites } = require('../models')

module.exports = {
    async getAllFavorites(req, res) {
        console.log("!!!!!!!!!!!!MAKES IT TO HERE*******************************")
        try {
            const favorites = await Favorites.findAll()
            res.send(favorites)
        } catch (err) {
            res.status(500).send({
                error: '500: Error trying to get all favorites'
            })
        }
    },

    async show(req, res) {
        try {
            const userId = req.params.userId
            console.log("!!!!!!!!!!!!!!!!!Finding all favs with user id: ")
            const favorite = await Favorites.findAll({
                where: {
                    userId: userId
                }
            })
            res.send(favorite)
        } catch (err) {
            res.status(500).send({
                error: '500: Error trying to get favorites'
            })
        }
    },

    async post(req, res) {
        try {
            console.log("Called******")
            console.log(req)

            const newFavorite = await Favorites.create(req.body) //req.body is both
            res.send(newFavorite)
        } catch (err) {
            res.status(500).send({
                error: '500: Error trying to create favorites'
            })
        }
    },

    async remove(req, res) {
        try {
            console.log("Called!!**")

            const favoriteId = req.params.favoriteId
            const userId = req.params.userId
            const favorite = await Favorites.findOne({
                where: {
                    videoId: favoriteId,
                    userId: userId
                }
            })
            await favorite.destroy()
            res.send(favorite)
        } catch (err) {
            res.status(500).send({
                error: '500: Error trying to delete favorite'
            })
        }
    },


}
