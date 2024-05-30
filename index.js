import express from 'express';
import mongoose from'mongoose';
import {validationChain} from'./validation/auth.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from  './controllers/UserController.js';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
dotenv.config();
const PORT = 5000 ;

mongoose
    .connect('mongodb+srv://admin:admin@cluster0.9ww5wjm.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err)=> console.log('could not connect to MongoDB', err));


const app = express();

app.set('view engine', 'ejs');
app.use(express.json())
app.use('/api', productRoutes);


app.post('/user/login',validationChain,UserController.login );

app.post('/user/register',validationChain,UserController.register );
app.get('/auth/me',checkAuth, UserController.getUser);
 
app.post('/api/products', async (req, res) => {
    // Получение данных о новом продукте из тела запроса
    const { name, description, price } = req.body;

    // Проверка наличия всех необходимых данных
    if (!name || !description || !price) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Создание нового объекта продукта
        const newProduct = new Product({ name, description, price });

        // Сохранение нового продукта в базе данных
        await newProduct.save();

        // Отправка успешного ответа клиенту
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error creating product' });
    }
});

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


