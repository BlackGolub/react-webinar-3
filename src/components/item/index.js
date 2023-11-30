import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from '../../utils/formatPrice';
import './style.css';

function Item({ item, onAddToBasket, onDeleteItem, isInBasket }) {
  const handleAction = () => {
    if (isInBasket) {
      onDeleteItem(item.code);
    } else {
      onAddToBasket(item);
    }
  };

  const actionText = isInBasket ? 'Удалить' : 'Добавить';
  const quantityDisplay = isInBasket ? `${item.quantity} шт` : null;
  const itemPrice = isInBasket ? item.price * item.quantity : item.price;

  return (
    <div className='Item'>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>{item.title}</div>
      <div className="Item-price">{formatPrice(itemPrice)}</div>
      {isInBasket && <div className="Item-quantity" onClick={onDeleteItem}>{quantityDisplay}</div>}
      <div className='Item-actions'>
        <button onClick={handleAction}>
          {actionText}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  onAddToBasket: PropTypes.func,
  onDeleteItem: PropTypes.func,
  isInBasket: PropTypes.bool
};

export default React.memo(Item);
