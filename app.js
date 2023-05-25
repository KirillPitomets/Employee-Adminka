const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
// ==== Routers ====
const usersRouter = require('./routes/users')
const employRouter = require('./routes/employees')
// ==== Middleware ====
const errorMiddleware = require('./middleware/errorMiddleware')

require('dotenv').config()

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
	cors({
		origin: 'http://localhost:3000',
	})
)
app.use('/api/user', usersRouter)
app.use('/api/employees', employRouter)
// This middleware should be last
app.use(errorMiddleware)

module.exports = app
