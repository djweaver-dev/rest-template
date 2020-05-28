const express = require('express')
const user = express.Router()


user.get('/', (req, res, next) => {
    console.log('/user')

    res.send('<h2>User</h2>')
    next()
})

module.exports = user