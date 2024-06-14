import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Items from './components/Items';
import Categories from './components/Categories';
import ShowFullItem from './components/ShowFullitem';
import Login from './components/Login'; // Create the Login component

function App() {
  const [showFullItem, setShowFullItem] = useState(false);
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [fullItem, setFullItem] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

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
 
  return (
    <div className="wrapper">

        <Header
          orders={orders}
          onDelete={deleteOrder}  
        />
        <Login />
        <div>
      <button onClick={togglePopup}>Login</button>
      {showPopup && <Login toggle={togglePopup} />}
    </div>
        <Categories chooseCategory={chooseCategory} />
        <Items onShowItem={onShowItem} items={currentItems} onAdd={addToOrder} />
        {showFullItem && <ShowFullItem onShowItem={onShowItem} onAdd={addToOrder} item={fullItem} />}
        <Footer />

    </div>
  );
}

export default App;