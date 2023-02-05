const express = require('express')
const bodyParser = require('body-parser') //process json data easily
const cors = require('cors') //allows server to be hosted as a domain
const morgan = require('morgan')
const { sequelize } = require('./models')
const config = require('./config/config')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

//connects the end points
require('./routes')(app)

//connects sequelize to the database
sequelize.sync() //{ force: true } < to clear out
    .then(() => {
        app.listen(config.port)
        console.log(`Server is ready on port ${config.port}`)
    })

