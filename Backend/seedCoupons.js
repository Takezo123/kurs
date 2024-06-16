// Import required modules
import mongoose from 'mongoose';
import Coupon from './models/couponModel.js';
import { connectDB } from "./config/db.js"

// Connect to the MongoDB database
connectDB().then(() => {
  console.log('Connected to MongoDB');
  seedCoupons();
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Function to insert predefined coupons
const seedCoupons = async () => {
  // Define coupon data
  const coupons = [
    {
        code: 'ABOBA',
        discount: 110,
        expiryDate: new Date('2024-12-31'),
        active: true
      }
  ];

  try {
    // Insert coupons into the database
    await Coupon.insertMany(coupons);
    console.log('Coupons added successfully');
  } catch (error) {
    console.error('Error inserting coupons:', error);
  } finally {
    mongoose.connection.close();
  }
};
