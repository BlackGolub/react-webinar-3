import { memo, useEffect } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";

function ItemInfo(props) {

  useEffect(() => {
    if (props.list.length === 0) props.list.push(props.data);
  }, []);

  const cn = bem("Item-info");
  return (
    <div className={cn()}>
      <span className={cn("description")}>{props.data.description}</span>
      <span className={cn("description")}>
        Страна производитель: <b>{props.data.madeIn.title}</b>
      </span>
      <span className={cn("description")}>
        Категория: <b>{props.data.category.title}</b>
      </span>
      <span className={cn("description")}>
        Год выпуска: <b>{props.data.edition}</b>
      </span>
      <span className={cn("price")}>
        Цена: {numberFormat(props.data.price)} ₽
      </span>
      <button className={cn("button")} onClick={() => props.addToBasket(props._id)}>
        Добавить
      </button>
    </div>
  );
}

export default memo(ItemInfo);

ItemInfo.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string,
    madeIn: PropTypes.object,
    category: PropTypes.object,
    edition: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  addToBasket: PropTypes.func,
  _id: PropTypes.string,
};

ItemInfo.defaultProps = {
  addToBasket: () => {},
};
