import mongoose from 'mongoose';

// Определение схемы для продукта
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Экспорт модели продукта
const Product = mongoose.model('Product', ProductSchema);
export default Product;

// Обработчик POST запроса для создания нового товара
export const createProduct = async (req, res) => {
    try {
        // Получаем данные о новом товаре из тела запроса
        const { name, description, price } = req.body;

        // Проверяем наличие всех необходимых данных
        if (!name || !description || !price) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Создаем новый объект товара
        const newProduct = new Product({ name, description, price });

        // Сохраняем новый товар в базе данных
        await newProduct.save();

        // Отправляем успешный ответ клиенту
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error creating product' });
    }
};
