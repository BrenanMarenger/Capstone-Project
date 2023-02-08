const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser(user) {
    const week = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authenication.jwtSecret, {
        expiresIn: week
    })
}

module.exports = {
    async register(req, res) {
        try {
            const user = await User.create(req.body)
            const userJson = user.toJSON();
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })

        } catch (err) {
            res.status(400).send({
                error: 'This email account is already in use.'
            })
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body
            console.log(email + " " + password)
            const user = await User.findOne({
                where: {
                    email: email,
                }
            })

            if (!user) {
                return res.status(403).send({
                    error: 'Email information incorrect'
                })
            }

            const checkPassword = await user.comparePassword(password)

            if (!checkPassword) {
                return res.status(403).send({
                    error: 'Password information incorrect'
                })
            }

            const userJson = user.toJSON();
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })

        } catch (err) {
            res.status(500).send({
                error: '500: Error trying to login'
            })
        }
    }
}
