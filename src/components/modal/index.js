import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import "./style.css";
import Overlay from "./overlay";
import Button from "../button";
import useModal from "../../hooks/useModal";

function Modal(props) {
  const { container } = useModal(props.isShow, props.onClose);

  return createPortal(
    props.isShow && (
      <div role="dialog" aria-modal="true" className="Modal">
        <Overlay onClick={props.onClose} />
        <div className="Modal-content">
          <div className="Modal-closeBtn">
            <Button onClick={props.onClose} text="Закрыть" />
          </div>
          {props.children}
        </div>
      </div>
    ),
    container
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  isShow: PropTypes.bool,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  onClose: () => {},
};

export default React.memo(Modal);
