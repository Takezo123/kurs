import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const SaleForm = ({ url, selectedItems }) => {
  const [saleData, setSaleData] = useState({
    date: '',
    quantity: '',
    price: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSaleData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/sales`, {
        date: saleData.date,
        items: selectedItems.map((itemId) => ({
          itemId,
          quantity: saleData.quantity,
          price: saleData.price,
        })),
      });
      if (response.data.success) {
        toast.success('Акция успешно добавлена');
        // Очистить форму и выбранные товары после успешного добавления
        setSaleData({ date: '', quantity: '', price: '' });
      } else {
        toast.error('Ошибка при добавлении акции');
      }
    } catch (error) {
      toast.error('Ошибка при добавлении акции');
    }
  };

  return (
    <div>
      <h2>Добавить акцию</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Дата акции:
          <input
            type="date"
            name="date"
            value={saleData.date}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Количество:
          <input
            type="number"
            name="quantity"
            value={saleData.quantity}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Цена:
          <input
            type="number"
            name="price"
            value={saleData.price}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit" disabled={selectedItems.length === 0}>
          Добавить акцию
        </button>
      </form>
    </div>
  );
};

export default SaleForm;
