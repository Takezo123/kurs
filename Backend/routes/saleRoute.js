import express from 'express';
import saleModel from '../models/saleModel.js';

const saleRouter = express.Router();

saleRouter.post('/', async (req, res) => {
  try {
    const { date, items } = req.body;

    // Создаем новый документ акции
    const newSale = new saleModel({
      date,
      items
    });

    // Сохраняем документ в базе данных
    const savedSale = await newSale.save();
    console.log('Saved sale:', savedSale);

    res.status(200).json({ success: true, message: 'Акция успешно добавлена' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Ошибка при добавлении акции' });
  }
});


saleRouter.get('/daily', async (req, res) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Установить время на начало дня
  
      const dailySales = await saleModel.aggregate([
        {
          $match: {
            date: {
              $gte: today,
              $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Следующий день
            },
          },
        },
        {
          $unwind: '$items',
        },
        {
          $lookup: {
            from: 'foods', // Название коллекции для модели Food
            localField: 'items.itemId',
            foreignField: '_id',
            as: 'itemDetails',
          },
        },
        {
          $unwind: '$itemDetails',
        },
        {
          $group: {
            _id: '$items.itemId',
            itemName: { $first: '$itemDetails.name' }, // Получить имя товара из модели Food
            quantity: { $sum: '$items.quantity' },
            price: { $first: '$items.price' },
          },
        },
      ]);
  
      res.json(dailySales);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
export default saleRouter;
