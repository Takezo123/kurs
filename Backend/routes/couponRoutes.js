// routes/couponRoutes.js
import express from 'express';
import Coupon from '../models/couponModel.js';

const router = express.Router();

// Apply a coupon
router.post('/apply', async (req, res) => {
  const { code } = req.body;
  try {
    const coupon = await Coupon.findOne({ code, active: true });
    if (!coupon) {
      return res.status(404).json({ error: 'Invalid coupon code' });
    }
    if (new Date(coupon.expiryDate) < new Date()) {
      return res.status(400).json({ error: 'Coupon expired' });
    }
    res.json({ discount: coupon.discount });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
