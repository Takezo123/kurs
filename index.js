const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/user/:name', (req, res) => {
    let data ={username: req.params.name, hobbies: ['football', 'basketball']}
    res.render('user',data)
})
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server is running on port:'+ PORT)
})