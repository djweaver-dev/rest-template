'use strict'

const express = require('express')
const multer = require('multer')
const helmet = require('helmet')

const app = express()
const multi = multer()
const helm = helmet()

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/index.html')
})

app.listen(port, () => {
    console.log('Server running at port: ' + port)
})