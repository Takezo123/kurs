import React from 'react';
import Item from './Item';

const Items = ({ items, onAdd, onShowItem }) => {
  return (
    <main>
      {items.map(item => (
        <Item key={item._id} item={item} onAdd={onAdd} onShowItem={onShowItem} />
      ))}
    </main>
  );
};

export default Items;
