import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/use-store";

function ItemBasket(props) {
  const navigate = useNavigate();
  const store = useStore();
  const cn = bem("ItemBasket");

  const callbacks = {
    onRemove: useCallback(() => props.onRemove(props.item._id), [props]),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  return (
    <div className={cn()}>
      <div className={cn("title")} onClick={() => { navigate(`/${props.item._id}`); callbacks.closeModal();}}>
        {props.item.title}
      </div>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn("cell")}>
          {numberFormat(props.item.amount || 0)} шт
        </div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: PropTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);