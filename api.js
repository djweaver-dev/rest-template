const express = require('express')
const api = express.Router()


api.get('/', (req, res, next) => {
    console.log('/api')

    res.send('<h2>API</h2>')
    next()
})

module.exports = api