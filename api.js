const express = require('express')
const api = express.Router()


api.get('/', (req, res, next) => {
    console.log('/api')
    //
    // API endpoints
    //
    res.send('<h2>API</h2>')
})

module.exports = api