'use strict'

const express = require('express')
const multer  = require('multer')
const helmet  = require('helmet')
const cookieParser = require('cookie-parser')
const bodyParser   = require('body-parser')

const api  = require('./api')
const auth = require('./auth')
const dash = require('./dash')
const user = require('./user')
const blog = require('./blog')

const app   = express()
const helm  = helmet()
const multi = multer()

const port = process.env.PORT || 3000

// middlewares
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/static', express.static('public'))

// router modules
app.use('/api', api)
app.use('/auth', auth)
app.use('/dash', dash)
app.use('/user', user)
app.use('/blog', blog)

// root
app.get('/', (req, res) => {
    res.send('<h1>/(root)</h1>')
})

// server listen
app.listen(port, () => {
    console.log('Server running at port: ' + port)
})