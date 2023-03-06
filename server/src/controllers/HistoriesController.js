const { History } = require('../models')

module.exports = {
    async index(req, res) {
        try {
            const userId = req.query.userId
            const history = await History.findAll({
                where: {
                    userId: userId
                },
            })

            res.send(history)
        } catch (err) {

            console.log(err)
            res.status(500).send({
                error: '500: Error trying to get history '
            })
        }
    },

    async post(req, res) {
        try {
            console.log(req.body)//ex. { videoId: 9, userId: 2, time: 34.21701037002167 }
            console.log(Object.keys(History.rawAttributes));

            const videoId = req.body.videoId
            const userId = req.body.userId
            const spot = parseInt(req.body.time)

            const checkHist = await History.findOne({
                where: {
                    UserId: userId,
                    VideoId: videoId
                }

            })

            if (checkHist) { //update
                console.log("Updating the history")
                const updateHistory = await History.update({
                    Spot: spot
                }, {
                    where: {
                        VideoId: videoId,
                        UserId: userId,
                    }
                })
                res.send(updateHistory)
            } else { //create a new
                console.log("Creating a new history")
                const newHistory = await History.create({
                    Spot: spot,
                    VideoId: videoId,
                    UserId: userId,

                })
                res.send(newHistory)
            }

        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: '500: Error trying to create history'
            })
        }
    },


}
