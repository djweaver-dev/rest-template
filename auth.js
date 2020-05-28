const express = require('express')
const fs = require('fs')
const auth = express.Router()

const validateUser = (username, password) => {
    return new Promise((resolve, reject) => {
        fs.readFile(
            process.cwd() + '/data/users.json', 
            (error, data) => {
                const users = JSON.parse(data)
                if(users[username]){
                    users[username].password === password 
                    ? 
                    resolve(true) 
                    : 
                    resolve(false)
                    
                } else {
                    resolve(false)
                }
            }
        )
    })
}

const renderTemplate = (key, value, path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(
            process.cwd() + path, 
            'utf-8', 
            (error, data) => {
                if (error) reject(error)
                resolve(data.split(`@${key}`).join(value))
            }
        )
    })
}

auth.get('/', (req, res, next) => {
    console.log('/auth')
    //
    // Render login form
    //
    res.sendFile(process.cwd() + '/html/auth.html')
})

auth.post('/login', async (req, res, next) => {
    console.log('/auth/login')

    const username = req.body.username
    const password = req.body.password
    const isAuthorized = await validateUser(username, password)

    if(isAuthorized){
        res.cookie("username", username)
        renderTemplate('username', username, '/html/login.html')   
            .then(template => res.send(template))
            .catch(console.log)
    } else {
        renderTemplate('username', username, '/html/failed.html')   
            .then(template => res.send(template))
            .catch(console.log)
    }

})

auth.get('/logout', (req, res, next) => {
    console.log('/auth/logout')
    //
    // Handle logout process
    //
    res.send('<h2>Logout</h2>')
})

module.exports = auth