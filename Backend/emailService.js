// emailService.js
import nodemailer from 'nodemailer';

// Create a transporter using your email service credentials
const transporter = nodemailer.createTransport({
  service: 'mailru', // Use your email service provider (e.g., Gmail, Outlook)
  auth: {
    user: 'Dodoptica188@mail.ru', // Replace with your email
    pass: 'Dodoptica123123'   // Replace with your email password or app-specific password
  }
});

// Function to send email
const sendOrderEmail = (orderDetails) => {
  const mailOptions = {
    from: 'Dodoptica188@mail.ru', // Sender address
    to: orderDetails.email, // List of recipients
    subject: 'Order Confirmation', // Subject line
    text: `Thank you for your order!\n\nHere are your order details:\n${orderDetailsSummary(orderDetails)}` // Plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Helper function to format order details
const orderDetailsSummary = (orderDetails) => {
  return `
Order Number: ${orderDetails.orderId}
Name: ${orderDetails.firstName} ${orderDetails.lastName}
Email: ${orderDetails.email}
Phone: ${orderDetails.phone}
Address: ${orderDetails.street}, ${orderDetails.city}, ${orderDetails.state}, ${orderDetails.zipcode}, ${orderDetails.country}
Items: ${orderDetails.items.map(item => `${item.name} x ${item.quantity}`).join(', ')}
Total Amount: $${orderDetails.amount}
  `;
};

export default sendOrderEmail;
UB1JP3ZSSU967EUMVJULZDA9