import React from "react";
import PropTypes from "prop-types";

import "./style.css";

function Overlay({ onClick }) {
  return <div role="button" className="Overlay" onClick={onClick} />;
}

Overlay.propTypes = {
  onClick: PropTypes.func,
};

Overlay.defaultProps = {
  onClick: () => {},
};

export default React.memo(Overlay);