import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({ list, onAddToBasket, onDeleteItem, isInBasket }) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onAddToBasket={onAddToBasket} onDeleteItem={onDeleteItem} isInBasket={isInBasket}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })),
  onAddToBasket: PropTypes.func,
  onDeleteItem: PropTypes.func,
  isInBasket: PropTypes.bool
};

export default React.memo(List);
