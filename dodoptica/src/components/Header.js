import React, { useState } from 'react';
import { CiPizza } from 'react-icons/ci';
import Order from './Order';
import LoginPopup from './LoginPopup';
import RegisterModal from './RegisterModal';

const showOrders = (props) => {
  let sum = 0;
  props.orders.forEach((el) => (sum += Number.parseFloat(el.price)));

  return (
    <div>
      {props.orders.map((el) => (
        <Order onDelete={props.onDelete} key={el.id} item={el} />
      ))}
      <p className="sum">Сумма: {new Intl.NumberFormat().format(sum)}$</p>
    </div>
  );
};

const showNothing = () => {
  return (
    <div className="empty">
      <h2>Товаров нет</h2>
    </div>
  );
};

const Header = (props) => {
  const [cartOpen, setCartOpen] = useState(false);

  const handleLoginClick = () => {
    props.onLoginClick(); // Вызываем функцию из props для открытия pop-up для логина
  };

  const handleRegisterClick = () => {
    props.onRegisterClick(); // Вызываем функцию из props для открытия модального окна для регистрации
  };

  return (
    <header>
      <div className="nav-box">
        <span className="logo">ДодоПтица</span>
        <ul className="nav">
          <li>Про нас</li>
          <li>Контакты</li>
          {props.isLoggedIn ? (
            <>
              <li onClick={props.onLogout} style={{ cursor: 'pointer' }}>
                Выход
              </li>
            </>
          ) : (
            <>
              <li onClick={handleLoginClick} style={{ cursor: 'pointer' }}>
                Войти
              </li>
              <li onClick={handleRegisterClick} style={{ cursor: 'pointer' }}>
                Зарегистрироваться
              </li>
            </>
          )}
        </ul>
        <CiPizza
          onClick={() => setCartOpen(!cartOpen)}
          className={`cart-button ${cartOpen && 'active'}`}
        />

        {cartOpen && (
          <div className="shop-cart">
            {props.orders.length > 0 ? showOrders(props) : showNothing()}
          </div>
        )}
      </div>
      <div className="presentation"></div>

      {props.showLoginPopup && <LoginPopup onClose={props.onCloseLoginPopup} />}
      {props.showRegisterModal && (
        <RegisterModal onClose={props.onCloseRegisterModal} />
      )}
    </header>
  );
};

export default Header;
