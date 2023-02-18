//Script to clean out users, re add the video config into db
//node start seed
const {
    sequelize,
    Video,
    User,
    Favorites
} = require('../src/models')

const Promise = require('bluebird')
const videos = require('./video-config.json')
const users = requre('./user-config.json')
const favorites = requre('./favorites.json')

sequelize.sync({ force: true })
    .then(async function () {
        await Promise.all(
            users.map(user => {
                User.create(user)
            })
        )

        await Promise.all(
            videos.map(video => {
                Video.create(video)
            })
        )

        await Promise.all(
            favorites.map(favorite => {
                Favorites.create(favorite)
            })
        )
    })