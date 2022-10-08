import React, { useState } from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import Context from "./Components/Context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    //const updatedItems = state.items.concat(action.item);
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingCartItemIndex]

    const updatedTotalAmount = state.totalAmount - existingItem.price

    let updatedItems;

    if(existingItem.amount === 1){
      updatedItems = state.items.filter(item => item.id !== action.id)
    } else {
      const updatedItem = {...existingItem, amount: existingItem.amount - 1}
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }

  return defaultCartState;
};

function App() {
  const [cartIsShown, setCartShown] = useState(false);

  const shownCart = () => {
    setCartShown(true);
  };

  const hideCart = () => {
    setCartShown(false);
  };

  const [cartState, dispatchCartAction] = React.useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCart = (item) => {
    dispatchCartAction({
      type: "ADD",
      item: item,
    });
  };

  const removeItemFromCart = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  return (
    <Context.Provider
      value={{
        onCart: shownCart,
        offCart: hideCart,

        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCart,
        removeItem: removeItemFromCart,
      }}
    >
      {cartIsShown && <Cart />}

      <Header />

      <main>
        <Meals />
      </main>
    </Context.Provider>
  );
}

export default App;
