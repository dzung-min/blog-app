const express = require('express')
const layouts = require('express-ejs-layouts')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')

const port = process.env.PORT || 5000
const sessionSecret = process.env.SESSION_SECRET || 'keyboard cat'
const dbUrl = process.env.DB_URL || 'mongodb://localhost/blog-app'

mongoose.connect(dbUrl)
mongoose.connection.on('error', () => {
  console.log('MongoDB connection error.')
})

const indexRoute = require('./routes/index')
const usersRoute = require('./routes/users')
const errorHandler = require('./middlewares/errorHandler')
const getFlash = require('./middlewares/getFlash')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(layouts)

app.use(getFlash)
app.use('/', indexRoute)
app.use('/users', usersRoute)
app.use(errorHandler.notFound)
app.use(errorHandler.generic)

app.listen(port, () => console.log(`Server is running on port ${port}`))
