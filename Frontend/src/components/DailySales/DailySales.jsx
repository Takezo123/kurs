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
    if (sales.length === 0) return <p>No sales data available for today.</p>;

    return (
        <div>
            <h2>Daily Sales</h2>
            <ul>
                {sales.map((sale, index) => (
                    <li key={index}>
                        {sale.itemName}: {sale.quantity} units sold at ${sale.price} each
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DailySales;
