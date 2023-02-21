const { History } = require('../models')

module.exports = {
    async index(req, res) {
        try {
            const userId = req.query.userId
            const history = await History.findAll({
                where: {
                    userId: userId
                }
            })
            res.send(history)
        } catch (err) {
            res.status(500).send({
                error: '500: Error trying to get history'
            })
        }
    },

    async post(req, res) {
        try {
            const newHistory = await History.create({
                UserId: req.body.userId,
                VideoId: req.body.videoId
            })
            res.send(newHistory)
        } catch (err) {
            res.status(500).send({
                error: '500: Error trying to create history'
            })
        }
    },


}
