import React from "react";
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils/formatPrice';
import { getPluralForm } from '../../utils/plurals';
import './style.css';

function Controls({ basketList, onToggleBasket }) {
  let basketValue;

  if (basketList.length > 0) {
    const uniqueItems = new Set(basketList.map(item => item.code));
    const itemsWord = getPluralForm(uniqueItems.size);

    const totalPrice = basketList.reduce((sum, item) => sum + item.price, 0);
    const formattedPrice = formatPrice(totalPrice);

    basketValue = `${uniqueItems.size} ${itemsWord} / ${formattedPrice}`;
  } else {
    basketValue = 'пусто';
  }

  return (
    <div className='Controls'>
      <div className="Controls-total">
        <span className="Controls-basket">В корзине:</span>
        <span className="Controls-value">{basketValue}</span>
      </div>
      <button className="Controls-button" onClick={onToggleBasket}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  basketList: PropTypes.array.isRequired,
  onToggleBasket: PropTypes.func.isRequired
};

export default React.memo(Controls);
