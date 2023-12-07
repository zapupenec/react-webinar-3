import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

function Controls({ onAdd }) {
  const { translations } = useLanguage();

  return (
    <div className="Controls">
      <button onClick={() => onAdd()}>{translations.add}</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default memo(Controls);
