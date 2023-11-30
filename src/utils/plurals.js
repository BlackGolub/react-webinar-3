const plural = require('plural-ru');

export const getPluralForm = (number) => {
  return plural(number, 'товар', 'товара', 'товаров');
};