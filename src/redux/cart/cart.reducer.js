import { cartActionTypes } from "./cart.types";

const INITIAL_STATE = {
  hidden: true
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden // this will return the opposite of hiddens current state
      };

    default:
      return state;
  }
};

export default cartReducer;
