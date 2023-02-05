const { Video } = require('../models')

module.exports = {

    async getAllVideos(req, res) {
        try {
            const video = await Video.findAll({
                limit: 24
            })
            res.send(video)
        } catch (err) {
            res.status(500).send({
                error: '500: Error trying to fetch videos'
            })
        }
    },

    async post(req, res) {
        try {
            const video = await Video.create(req.body)
            res.send(video)
        } catch (err) {
            res.status(500).send({
                error: '500: Error trying to post videos'
            })
        }
    }
}
