const { Favorites, Video } = require('../models')

module.exports = {
    async index(req, res) {
        try {
            //const videoId = req.query.videoId
            const userId = req.query.userId
            const favorite = await Favorites.findAll({
                where: {
                    //VideoId: videoId,
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
            const userId = req.body.userId
            const videoId = req.body.videoId
            // const favorite = await Favorites.findOne({
            //     where: {
            //         VideoId: videoId,
            //         UserId: userId
            //     }
            // })
            // if (favorite) {
            //     return res.status(400).send({
            //         error: 'Already in favorites'
            //     })
            // }

            const newFavorite = await Favorites.create(req.body)
            res.send(newFavorite)
        } catch (err) {
            res.status(500).send({
                error: '500: Error trying to create favorites'
            })
        }
    },

    async delete(req, res) {
        try {
            console.log("Reequest these params" + req.params)
            const userId = req.body.userId
            const { favoriteId } = req.params
            const favorite = await Favorites.findOne({
                where: {
                    videoId: favoriteId,
                    userId: userId
                }
            }) //videoId
            await favorite.destroy()
            res.send(favorite)
        } catch (err) {
            res.status(500).send({
                error: '500: Error trying to delete favorite'
            })
        }
    },


}
