import React, { useState } from 'react';

const LoginPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Логика для отправки данных на сервер и получения токена
      // В случае успешного входа:
      setEmail(''); // Очистка email
      setPassword(''); // Очистка password
      setError(''); // Очистка ошибки, если используется

      onClose(); // Закрыть pop-up окно
    } catch (error) {
      console.error('Ошибка входа:', error);
      setError('Произошла ошибка во время входа');
    }
  };

  const handleLogout = () => {
    setEmail('');
    setPassword('');
    setError('');
    onClose(); // Закрыть pop-up окно
    // Дополнительная логика для логаута, например, очистка токена доступа
  };

  return (
    <div className="login-popup">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Войти</button>
        <button type="button" onClick={handleLogout}>Выход</button>
      </form>
    </div>
  );
};

export default LoginPopup;
