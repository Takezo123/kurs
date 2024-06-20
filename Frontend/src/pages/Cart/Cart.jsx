import React, { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');

  const applyCoupon = async () => {
    try {
      const response = await axios.post(url+"/api/coupons/apply", { code: couponCode }); // Correct URL
      setDiscount(response.data.discount);
      setError('');
      localStorage.setItem('discount', response.data.discount);
    } catch (err) {
      setError(err.response.data.error);
      setDiscount(0);
    }
  };

  const getTotalWithDiscount = () => {
    const total = getTotalCartAmount();
    if (discount > 0) {
      return total - (total * (discount / 100));
    }
    return total;
  };

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Товары</p>
          <p>Название</p>
          <p>Цена</p>
          <p>Колличество</p>
          <p>Всего</p>
          <p>Удалить</p>
        </div>
        <br></br>
        <hr></hr>
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={`${url}/images/${item.image}`} alt='' />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Корзина</h2>
          <div>
            <div className='cart-total-details'>
              <p>Сумма заказа</p>
              <p>$ {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Цена доставки</p>
              <p>$ {getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Итого</b>
              <b>$ {getTotalCartAmount() === 0 ? 0 : getTotalWithDiscount() + 2}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>Перейти к оплате</button>
        </div>
        <div className='cart-promocode'>
          <p>Промокод</p>
          <div className='cart-promocode-input'>
          <input
            type="text"
            placeholder="Ваш промокод"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button onClick={applyCoupon}>Использовать промокод</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {discount > 0 && <b> Сумма скидки: {discount}%</b>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;
