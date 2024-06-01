import express from 'express';
import mongoose from'mongoose';
import {validationChain} from'./validation/auth.js';
import * as UserController from './controllers/UserController.js';
import checkAuth from './utils/checkAuth.js';
const PORT = 5000;
mongoose
    .connect('mongodb+srv://admin:admin@cluster0.9ww5wjm.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err)=> console.log('could not connect to MongoDB', err));
const app = express();
app.set('view engine', 'ejs');
app.use(express.json())
app.post('/user/login', validationChain, UserController.login);
app.post('/user/register', validationChain, UserController.register);
app.get('/auth/me', checkAuth, UserController.getUser);
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


