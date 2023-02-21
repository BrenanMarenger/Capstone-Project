const { Favorites, Video } = require('../models')

module.exports = {
    async index(req, res) {
        try {
            const userId = req.query.userId
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
    //fav = findAll
    // key:value -> videoId:numFavorites
    //for each video of videoId

    async post(req, res) {
        try {
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
