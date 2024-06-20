// emailService.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Загружаем переменные окружения из .env файла
dotenv.config();

// Настройка SMTP сервера Яндекса
const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465, // Порт для SSL
  secure: true, // true для 465, false для других портов
  auth: {
    user: process.env.SMTP_USER, // Ваш email на Яндексе
    pass: process.env.SMTP_PASSWORD // Ваш пароль или App password
  }
});

const sendOrderEmail = ({ orderId, items, amount, email }) => {
  const itemDetails = items.map(item => `${item.name} x ${item.quantity}`).join(', ');
  const emailText = `
    Спасибо за ваш заказ!
    Номер заказа: ${orderId}
    Товары: ${itemDetails}
    Сумма: ${amount / 100} RUB
  `;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email, // Email заказчика
    subject: 'Подтверждение заказа',
    text: emailText
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Ошибка отправки письма заказчику:', error);
    } else {
      console.log('Письмо заказчику отправлено:', info.response);
    }
  });

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminMailOptions = {
    from: process.env.SMTP_USER,
    to: adminEmail,
    subject: 'Новый заказ',
    text: `Новый заказ: ${orderId}\nТовары: ${itemDetails}\nСумма: ${amount / 100} RUB`
  };

  transporter.sendMail(adminMailOptions, (error, info) => {
    if (error) {
      console.error('Ошибка отправки письма администратору:', error);
    } else {
      console.log('Письмо администратору отправлено:', info.response);
    }
  });
};

export default sendOrderEmail;
