import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";

import "./style.css";
import { numberFormat } from "../../utils";
import routes from "../../app/routes";
import useLanguage from "../../store/use-language";

function Item(props) {
  const cn = bem("Item");
  const { translations } = useLanguage();

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn("title")}>
        <Link to={`${routes.product}/${props.item._id}`}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn("actions")}>
        <div className={cn("price")}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{translations.add}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default memo(Item);
