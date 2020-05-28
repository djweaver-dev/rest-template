const express = require('express')
const dash = express.Router()

dash.get('/', (req, res, next) => {
    console.log('/dash')
    const user = req.query.user
    if(user !== req.cookies.username) {
        res.sendFile(process.cwd() + '/html/404.html')
    } else {
        //
        // Render dashboard
        //
        res.send(`<h2>Dashboard: ${user}</h2>`)
    }
})

dash.get('/settings', (req, res, next) => {
    console.log('/dash/settings')
    //
    // Render settings menu
    //
    res.send('<h2>Settings</h2>')
})

module.exports = dash