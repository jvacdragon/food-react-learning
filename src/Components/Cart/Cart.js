import React, { useContext } from "react";
import Context from "../Context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = React.useContext(Context);

  const totalAmount = Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "USD",
  }).format(cartCtx.totalAmount);

  const hasItems = cartCtx.items.length > 0;

  const CartItemRemove = (id) => {
    cartCtx.removeItem(id)
  };

  const CartItemAdd = (item) => {
    cartCtx.addItem({...item, amount: 1})
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item, i) => (
        <CartItem
          key={i}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove ={CartItemRemove.bind(null, item.id)}
          onAdd = {CartItemAdd.bind(null, item)}
        />
      ))}
    </ul>
  );

  const onOffCart = useContext(Context);

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>

      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={onOffCart.offCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
