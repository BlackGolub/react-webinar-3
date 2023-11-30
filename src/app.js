import React, { useState, useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Basket from './components/basket';
import './app.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [isBasketVisible, setBasketVisible] = useState(false);

  const list = store.getState().list;
  const basketList = store.getState().basketList;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    handleAddToBasket: useCallback((item) => {
      store.addItemToBasket(item);
    }, [store]),

    toggleBasket: useCallback(() => {
      setBasketVisible(prev => !prev);
    }, [])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls basketList={basketList} onToggleBasket={callbacks.toggleBasket}/>
      {isBasketVisible && (<>
      <div className="Overlay"/>
      <Basket basketList={basketList} onDeleteItem={callbacks.onDeleteItem} onToggleBasket={callbacks.toggleBasket}/></>)}
      <List list={list} onAddToBasket={callbacks.handleAddToBasket}/>
    </PageLayout>
  );
}

export default App;
