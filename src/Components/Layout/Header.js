import classes from "./Header.module.css";
import { Fragment } from "react";

import mealsImg from "../../Assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton/>
      </header>

      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="Table full of food" />
      </div>
    </Fragment>
  );
};

export default Header;
