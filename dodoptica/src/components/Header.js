import React from 'react'

export default function Header() {
  return (
    <header>
        <div>
            <span className='logo'>ДодоПтица</span>
            <ul className='nav'>
                <li>Про нас</li>
                <li>Контакты</li>
                <li>Личный кабинет</li>
            </ul>
        </div>
        <div className='presentation'></div>
    </header>
  )
}
