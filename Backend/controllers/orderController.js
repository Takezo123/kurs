// orderControllers.js
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import sendOrderEmail from "../emailService.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order from frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    // Creating a new order
    const { userId, items, amount, address, email } = req.body;
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });

    const savedOrder = await newOrder.save();

    // Send order confirmation email
    sendOrderEmail({
      orderId: savedOrder._id,
      ...address,
      items,
      amount,
      email, // Assuming email is part of the address or separate field
    });

    // Clear user cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Prepare line items for Stripe checkout
    const line_items = items.map((item) => ({
      price_data: {
        currency: "rub",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80, // Adjust if necessary
      },
      quantity: item.quantity,
    }));

    // Adding delivery charges
    line_items.push({
      price_data: {
        currency: "rub",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80, // Adjust if necessary
      },
      quantity: 1,
    });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${savedOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${savedOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log("Order placement error:", error);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Order successfully paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed, order not processed" });
    }
  } catch (error) {
    console.log("Order verification error:", error);
    res.status(500).json({ success: false, message: "Error verifying order" });
  }
};

// User orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("Fetching user orders error:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// Listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("Listing orders error:", error);
    res.status(500).json({ success: false, message: "Error listing orders" });
  }
};

// API for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.log("Updating order status error:", error);
    res.status(500).json({ success: false, message: "Error updating order status" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
