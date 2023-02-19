const AuthenticationController = require('./controllers/AuthenticationController')
const videoController = require('./controllers/videoController')
const FavoritesController = require('./controllers/FavoritesController')
const HistoriesController = require('./controllers/HistoriesController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
    app.post('/register',
        AuthenticationControllerPolicy.register, //middleware -> checks if valid email before sending it to the following function
        AuthenticationController.register)
    app.post('/login',
        AuthenticationController.login)

    app.get('/videos',
        videoController.getAllVideos)
    app.get('/videos/:videoId',
        videoController.show)
    app.post('/videos',
        videoController.post)

    app.get('/favorites',
        FavoritesController.index)
    app.post('/favorites',
        FavoritesController.post)
    app.delete('/favorites/:favoriteId/:userId',
        FavoritesController.remove)

    app.get('/histories',
        HistoriesController.index)
    app.post('/histories',
        HistoriesController.post)
}
