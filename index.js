import express from 'express';
import mongoose from 'mongoose';
import Food from './models/Food.js'; // Подключаем модель Food
import { validationChain } from './validation.js';
import * as UserController from './controllers/UserController.js';
import checkAuth from './utils/checkAuth.js';
import winston from 'winston';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';


const PORT = 5000;
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}
mongoose
    .connect('mongodb+srv://admin:admin@cluster0.9ww5wjm.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Could not connect to MongoDB', err));

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(cors());

//для создания товаров
// app.post('/food', async (req, res) => {
//     try {
//         const { title, desc, category, price } = req.body;
//         const food = new Food({ title, desc, category, price });
//         await food.save();
//         res.status(201).json(food);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });



// для получения всех товаров
app.get('/food', async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.post('/user/register', validationChain, UserController.register);
app.post('/user/login', validationChain, UserController.login);
app.post('/user/register', validationChain, UserController.register);
app.get('/auth/me', checkAuth, UserController.getUser);
app.get('/create-foods', async (req, res) => {
    try {
        const categories = ['burg', 'snacks', 'soda', 'pizza', 'dessert', 'salad'];
        
        for (let i = 0; i < 40; i++) {
            const food = new Food({
                title: `Food ${i + 1}`,
                desc: `Description for Food ${i + 1}`,
                category: categories[i % categories.length],
                price: Math.floor(Math.random() * 20) + 5, // Генерация случайной цены от 5 до 25
            });
            await food.save();
        }

        res.status(201).json({ message: '40 foods created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
app.get('/remove-ingredients', async (req, res) => {
    try {
        await Food.updateMany({}, { $unset: { ingredients: 1 } });
        res.status(200).json({ message: 'Field "ingredients" removed from all documents' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/add-placeholder-image', async (req, res) => {
    try {
        const placeholderImageUrl = 'https://example.com/placeholder.jpg'; // URL изображения-заглушки

        const foods = await Food.find(); // Получаем все товары из базы данных

        for (let food of foods) {
            if (!food.image) {
                food.image = placeholderImageUrl; // Устанавливаем изображение-заглушку, если у товара нет изображения
                await food.save(); // Сохраняем обновленный товар
            }
        }

        res.status(200).json({ message: 'Placeholder image added to all foods' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const server = app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
    } else {
        console.error('Error starting server:', err);
    }
});
