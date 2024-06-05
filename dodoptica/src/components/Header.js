import React, { useState } from 'react'
import { CiPizza } from "react-icons/ci";
import Order from './Order';

const showOrders = (props) => {
  let sum=0;
  props.orders.forEach(el => sum+= Number.parseFloat(el.price))
    
  
  return(<div>
    {props.orders.map(el => (
      <Order onDelete={props.onDelete} key={el.id} item={el} />
    ))}
    <p className='sum'>Сумма: {new Intl.NumberFormat().format(sum)}$</p>
  </div>)
}
const showNothing= () => {
  return(<div className='empty'><h2>Товаров нет</h2></div>)
}
export default function Header(props) {
  let[cartOpen, setCartOpen] = useState(false)

  return (
    <header>
        <div className='nav-box'>
            <span className='logo'>ДодоПтица</span>
            <ul className='nav'>
                <li>Про нас</li>
                <li>Контакты</li>
                <li>Личный кабинет</li>
            </ul>
            <CiPizza onClick={() => setCartOpen(cartOpen=!cartOpen)} className={`cart-button ${cartOpen && "active"}`} />

            {cartOpen && (
                <div className='shop-cart'>
                    {props.orders.length > 0 ?
                      showOrders(props) : showNothing()}
                </div>
            )}
          </div> 
        <div className='presentation'></div>
    </header>
  )
}
