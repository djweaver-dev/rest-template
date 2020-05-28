'use strict'

const express = require('express')
const helmet  = require('helmet')
const cookieParser = require('cookie-parser')

const api  = require('./api')
const auth = require('./auth')
const dash = require('./dash')

const app = express()
const port = process.env.PORT || 3000

// middlewares
app.use(helmet())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false })) // extended: true is deprecated
app.use('/static', express.static('public'))

// router modules
app.use('/api', api)
app.use('/auth', auth)
app.use('/dash', dash)

// root
app.get('/', (req, res) => {
    res.send('<h1>/(root path)</h1>')
})

// 404
app.get('*', (req, res) => {
    res.sendFile(process.cwd() + '/html/404.html')
})

// server listen
app.listen(port, () => {
    console.log('Server running at port: ' + port)
})