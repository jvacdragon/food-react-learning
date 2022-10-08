import { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import Context from "../Context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = () => {
  const CartOptions = useContext(Context)

  const numberOfCartItems = CartOptions.items.reduce((curNumber, item)=>{
    return curNumber + item.amount

  }, 0)

  return (
    <button className={classes.button} onClick={CartOptions.onCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>

      <span className={classes.badge}>
      {numberOfCartItems}
      </span>
    </button>
  );
};

export default HeaderCartButton