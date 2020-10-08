
const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const controllers = require('./src/controller')
const makeCallback= require('./src/express-callback')
const cors = require('cors')
const helmet = require('helmet')
app.use(cors())
app.use(express.json())
app.use(helmet())
const PORT = process.env.PORT || process.env.DEV_PORT
let connection = app.listen(PORT, ()=> console.log('server listening'))
app.post('/signup', makeCallback(controllers.postUser))
module.exports = {connection}






