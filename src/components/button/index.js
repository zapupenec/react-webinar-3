import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Button({ text, onClick }) {
  return (
    <button className="Button" onClick={onClick}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
};

export default React.memo(Button);
