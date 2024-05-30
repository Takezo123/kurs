import Product from '../models/Product.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const createProduct = async (req, res) => {
    const { name, description, price } = req.body;

    console.log('Request body:', req.body);

    try {
        const newProduct = new Product({ name, description, price });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(400).json({ message: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createProduct, getProducts };
