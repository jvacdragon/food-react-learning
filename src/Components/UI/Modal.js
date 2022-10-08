import classes from "./Modal.module.css";
import { Fragment, useContext } from "react";
import ReactDOM from "react-dom";
import Context from "../Context";

const Backdrop = (props) => {
  const onOffCart = useContext(Context);

  return <div className={classes.backdrop} onClick={onOffCart.offCart}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalEl = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalEl)}

      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalEl
      )}
    </Fragment>
  );
};
export default Modal;
