import React from "react";
import PropTypes from "prop-types";

import "./style.css";
import Button from "../button";
import { getPriceDisplay } from "../../utils";

function Item(props) {
  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">{getPriceDisplay(props.item.price)}</div>
      {props.item.count && (
        <div className="Item-count">{`${props.item.count} шт`}</div>
      )}
      <div className="Item-actions">
        {props.actions.map((action) => (
          <Button
            key={action.title}
            onClick={() => action.func(props.item.code)}
            text={action.title}
          />
        ))}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      func: PropTypes.func,
    })
  ),
};

export default React.memo(Item);
