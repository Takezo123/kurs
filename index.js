import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from'mongoose';
import bcrypt from 'bcrypt';

import {validationChain} from'./validation/auth.js';
import {validationResult} from 'express-validator';
import User from './models/user.js';

const PORT = process.env.PORT ;

mongoose
    .connect('mongodb+srv://admin:admin@cluster0.9ww5wjm.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err)=> console.log('could not connect to MongoDB', err));


const app = express();

app.set('view engine', 'ejs');
app.use(express.json())



app.post('/user/register', validationChain, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new User({
            email: req.body.email,
            name: req.body.name,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save();
        const token = jwt.sign({_id: user._id}, "secret", {expiresIn: '35d',},);

        const {passwordHash, ...userData} = user.toObject();
        res.json(userData);
        res.json({...userData, token});
    }catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});

// const password= req.body.password;
// const salt= await bcrypt.genSalt(10);
// const passwordHash = await bcrypt.hash(password, salt);
//
// const doc = new User({
//     email: req.body.email,
//     name: req.body.name,
//     avatarUrl: req.body.avatarUrl,
//     passwordHash,
// });

// const user = await doc.save();

// const PORT = process.env.PORT || 3000

const server = app.listen(0, () => {
    console.log('Server listening on port:', server.address().port);
});
app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
    } else {
        console.error('Error starting server:', err);
    }
});

