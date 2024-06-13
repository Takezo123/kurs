// components/Notification.js
import React, { useEffect } from 'react';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="notification">
      <p>{message}</p>
    </div>
  );
};

export default Notification;
