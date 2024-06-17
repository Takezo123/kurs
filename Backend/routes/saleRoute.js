import express from 'express';
import saleModel from '../models/saleModel.js';

const saleRouter = express.Router();

saleRouter.get('/daily', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const sales = await saleModel.find({ date: { $gte: today } });
        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default saleRouter;
