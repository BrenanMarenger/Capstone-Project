const AuthenticationController = require('./controllers/AuthenticationController')
const videoController = require('./controllers/videoController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
    app.post('/register',
        AuthenticationControllerPolicy.register, //middleware -> checks if valid email before sending it to the following function
        AuthenticationController.register)

    app.post('/login',
        AuthenticationController.login)

    app.get('/videos',
        videoController.getAllVideos)

    app.post('/videos',
        videoController.post)
}
