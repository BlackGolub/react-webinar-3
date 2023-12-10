import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ItemInfo from "../../components/item-info";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function ItemControl() {
  let { itemId } = useParams();
  const { data, isLoading } = useGetItemData(itemId);

  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.actions.basket.addToBasket(_id),[store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open("basket"),[store]),
  };

  return (
    <PageLayout>
      {isLoading ? <Head title="...loading" /> : <Head title={data.title} />}
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      {isLoading ? ( <div>loading...</div> ) : ( <ItemInfo addToBasket={callbacks.addToBasket}
                  _id={itemId} data={data} list={select.list}/>)}
    </PageLayout>
  );
}

export default memo(ItemControl);

function useGetItemData(id) {
  const [itemData, setItemData] = useState({
    data: {},
    isLoading: true,
  });

  useEffect(() => {
    const getData = async (id) => {
      try {
        const fetchedData = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
        const Data = await fetchedData.json();
        setItemData({
          data: Data.result,
          isLoading: false,
        });
      } catch (err) {
        setItemData({
          ...itemData,
          isLoading: false,
        });
      }
    };
    getData(id);
  }, [id]);
  const { data, isLoading } = itemData;

  return { data, isLoading };
}
