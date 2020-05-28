const express = require('express')
const dash = express.Router()


dash.get('/', (req, res, next) => {
    console.log('/dash')
    const user = req.query.user
    
    res.send(`<h2>Dashboard: ${user}</h2>`)
})

dash.get('/settings', (req, res, next) => {
    console.log('/dash/settings')

    res.send('<h2>Settings</h2>')
})

dash.get('*', (req, res) => {
    res.sendFile('/static/404.html')
})

module.exports = dash