const express = require('express')
const fs = require('fs')
const auth = express.Router()

// This returns a promise to load the users.json
// data and authenticate the user against that data,
// resolving to true or false depending on whether
// the username/password combo was correct.
//
const authenticateUser = (username, password) => {
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

// This is just a simple template rendering script
// That injects a constant into the markup using
// split() and join()
//
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

// Gets our form data (as urlencoded) and awaits
// authentication before conditionally rendering
// the appropriate response
//
auth.post('/login', async (req, res, next) => {
    console.log('/auth/login')

    const username = req.body.username
    const password = req.body.password
    const isAuthorized = await authenticateUser(username, password)

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