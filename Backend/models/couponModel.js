// models/coupon.js
import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },  // Discount in percentage
  expiryDate: { type: Date, required: true },
  active: { type: Boolean, default: true }
});

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
