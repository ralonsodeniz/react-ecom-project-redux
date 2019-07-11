import { cartActionTypes } from "./cart.types";

export const toggleCartHidden = () => ({
  type: cartActionTypes.TOGGLE_CART_HIDDEN // we don't need a payload here since we are just toggling the current state value of hidden with this action, payload is optional, type is not
});

export const addItem = item => ({
  type: cartActionTypes.ADD_ITEM,
  payload: item
});
