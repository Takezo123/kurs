import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DailySales = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDailySales = async () => {
            try {
              const response = await axios.get('http://localhost:4000/api/sales/daily');
              console.log('Daily sales data:', response.data);
              setSales(response.data);
            } catch (error) {
              setError(error.message);
            } finally {
              setLoading(false);
            }
          };
        fetchDailySales();
    }, []);

    if (loading) return <p>Loading daily sales...</p>;
    if (error) return <p>Error: {error}</p>;
    if (sales.length === 0) return <p>Сегодня скидок нет.</p>;

    return (
        <div>
          <h2>Скидки</h2>
          <ul>
            {sales.map((sale, index) => (
              <li key={index}>
                {sale.itemName}: в колличестве {sale.quantity} можно заказать по {sale.price} $
              </li>
            ))}
          </ul>
        </div>
      );
};

export default DailySales;
