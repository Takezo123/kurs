import React, { useState, useEffect, useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });
  const [discount, setDiscount] = useState(0);
  
  useEffect(() => {
    // Fetch discount from localStorage
    const savedDiscount = localStorage.getItem('discount');
    if (savedDiscount) {
      setDiscount(parseFloat(savedDiscount));
    }
  }, []);
  
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const getTotalWithDiscount = () => {
    const total = getTotalCartAmount();
    console.log(`Original Total: ${total}`);
    if (discount > 0) {
      const discountedTotal = total - (total * (discount / 100));
      console.log(`Discounted Total: ${discountedTotal}`);
      return discountedTotal;
    }
    return total;
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let totalAmount = Math.round((getTotalWithDiscount() + 2) * 100) / 100; // Including delivery fee and rounding
    console.log(`Total Amount (with delivery): ${totalAmount}`);
    let orderData = {
      address: data,
      items: orderItems,
      amount: totalAmount,
    };
    
    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Error placing order");
    }
  };
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, navigate, getTotalCartAmount]);
  
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Информация о доставке</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='Имя'/>
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Фамилия'/>
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email'/>
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Улица'/>
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='Город'/>
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='Область'/>
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code'/>
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Страна'/>
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Номер телефона'/>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Итого</h2>
          <div>
            <div className='cart-total-details'>
              <p>Сумма товаров</p>
              <p>${getTotalCartAmount().toFixed(2)}</p> {/* Rounded for display */}
            </div>
            <hr/>
            <div className='cart-total-details'>
              <p>Цена доставки</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
              <b>Всего</b>
              <b>${getTotalCartAmount() === 0 ? 0 : (getTotalWithDiscount() + 2).toFixed(2)}</b> {/* Rounded for display */}
            </div>
          </div>
          <button type='submit'>Оплатить</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
