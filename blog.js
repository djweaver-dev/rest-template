const express = require('express')
const blog = express.Router()


blog.get('/', (req, res, next) => {
    console.log('/blog')

    res.send('<h2>Blog</h2>')
    next()
})

module.exports = blog