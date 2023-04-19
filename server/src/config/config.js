const path = require('path')

module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'retroflixDB',
        user: process.env.DB_USER || 'retroflixDB',
        password: process.env.DB_PASS || 'retroflixDB',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: path.resolve(__dirname, '../../retroflixDB.sqlite')
        }
    },
    authenication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}
