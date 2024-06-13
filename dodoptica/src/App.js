import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPopup from './components/LoginPopup';
import RegisterModal from './components/RegisterModal';
import Items from './components/Items';
import Categories from './components/Categories';
import ShowFullItem from './components/ShowFullitem';
import Notification from './components/Notification';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showFullItem, setShowFullItem] = useState(false);
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [fullItem, setFullItem] = useState({});
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Флаг для отслеживания статуса входа пользователя

  // Загрузка данных из сервера при монтировании компонента
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/food');
        const data = await response.json();
        setItems(data);
        setCurrentItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const addToOrder = (item) => {
    if (!orders.some((el) => el.id === item.id)) {
      setOrders([...orders, item]);
    }
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter((el) => el.id !== id));
  };

  const chooseCategory = (category) => {
    if (category === 'all') {
      setCurrentItems(items);
    } else {
      setCurrentItems(items.filter((el) => el.category === category));
    }
  };

  const onShowItem = (item) => {
    setFullItem(item);
    setShowFullItem(true); // Показываем полное описание товара
  };

  const handleLoginClick = () => {
    setShowLoginPopup(true); // Открываем pop-up для логина
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true); // Открываем модальное окно для регистрации
  };

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false); // Закрываем pop-up для логина
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false); // Закрываем модальное окно для регистрации
  };

  const handleLogout = () => {
    // Clear any user session or tokens (if applicable)
    setIsLoggedIn(false); // Update isLoggedIn state
    setNotificationMessage('Вы успешно вышли из аккаунта');
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };
 

  return (
    <div className="wrapper">
      <Router>
        <Header
          orders={orders}
          onDelete={deleteOrder}
          onLoginClick={handleLoginClick}
          onRegisterClick={handleRegisterClick}
          onLogout={handleLogout}
          isLoggedIn={isLoggedIn}
          
        />
        {showLoginPopup && <LoginPopup onClose={handleCloseLoginPopup} />}
        {showRegisterModal && <RegisterModal onClose={handleCloseRegisterModal} />}
        {showNotification && (
          <Notification
            message={notificationMessage}
            onClose={() => setShowNotification(false)}
          />
        )}
        <Categories chooseCategory={chooseCategory} />
        <Items onShowItem={onShowItem} items={currentItems} onAdd={addToOrder} />
        {showFullItem && <ShowFullItem onShowItem={onShowItem} onAdd={addToOrder} item={fullItem} />}
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;