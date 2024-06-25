const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 8080
require('dotenv').config()

// DOTENV later
const clientId = process.env.clientId
const clientSecret = process.env.clientSecret

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Catch API request and route appropriately
app.get('/api/auth', async (req, res) => {
    const ghCode = req.query.code;

    //Send code to GitHub with 
    const token = await fetch(`https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${ghCode}`, {
        method: 'POST',
        headers: {
            "Accept": "application/json"
        }
    })
    .then((res) => {
        // if(!res.ok) throw new Error('Error fetching authentication token.')
        return res.json()
    })

    const user_res = await fetch('https://api.github.com/user', {
        headers: { Authorization: `${token.token_type} ${token.access_token}` }
    })
    .then((res) => {
        // if(!res.ok) throw new Error('Error fetching User Data.')
        return res.json()
    })

    const ghResponse = {"userData": user_res, "token": `${token.token_type} ${token.access_token}`}
    res.json(ghResponse)
})


// Catch any other request to the 8080 and redirect back to the client files
// Only if in production environment
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        console.log("Server:", "Routing pages...")

        app.use(express.static(path.join(__dirname, '../client')));
        res.sendFile(path.join(__dirname, '../client/index.html'));
    })
}

app.listen(PORT, () => {
    console.log('Server:', `listening on port ${PORT}`)
})