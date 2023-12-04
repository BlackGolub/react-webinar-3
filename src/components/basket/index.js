import React from "react";
import PropTypes from 'prop-types';
import List from '../list/index';
import Head from '../head/index';
import { formatPrice } from '../../utils/formatPrice';
import './stule.css';

function Basket({ basketList, onDeleteItem, onToggleBasket }){
  const totalPrice = basketList.reduce((sum, item) => sum + item.price, 0);
  const formattedPrice = formatPrice(totalPrice);

  const uniqueItems = basketList.reduce((acc, item) => {
    const foundItem = acc.find(i => i.code === item.code);
    if (foundItem) {
      foundItem.quantity++;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  return (
    <div className='Basket'>
      <Head title={'Корзина'}>
        <button onClick={onToggleBasket} className="Basket-close">
          Закрыть
        </button>
      </Head>
      <div className="Basket-items">
        <List list={uniqueItems} isInBasket={true} onDeleteItem={onDeleteItem}/>
      </div>
      <div className="Basket-total">
        <span>Итого:</span>
        <p className="Basket-total-sum">{formattedPrice}</p>
      </div>
    </div>
  )
}
    
Basket.propTypes = {
  basketList: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number.isRequired
  })).isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onToggleBasket: PropTypes.func.isRequired
};

export default React.memo(Basket);