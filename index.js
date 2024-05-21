import express from 'express';
import jwt from 'jsonwebtoken';
const app = express()

app.use(express.json())


app.get('/', (req, res) => {
    res.render('index')
})

app.post('/user/login', (req, res) => {
    console.log(req.body);
    const token = jwt.sign({}
    res.json(
        { "status": "success",
            "message": "User logged in successfully"}
    )
})

// app.get('/about', (req, res) => {
//     res.render('about')
// })

// app.get('/user/:name', (req, res) => {
//     let data ={username: req.params.name, hobbies: ['football', 'basketball']}
//     res.render('user',data)
// })

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server is running on port:'+ PORT)
})
