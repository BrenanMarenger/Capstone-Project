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

    async show(req, res) {
        try {
            const video = await Video.findByPk(req.params.videoId) // { "_id": req.params.videoId }req.params.videoId
            res.send(video)
        } catch (err) {
            res.status(500).send({
                error: '500: Error fetching this video'
            })
        }

    },

    async post(req, res) {
        try {
            const video = await Video.create(req.body)
            res.send(video)
        } catch (err) {
            res.status(500).send({
                error: '500: Error trying to post video'
            })
        }
    }
}
