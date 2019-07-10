import { combineReducers } from "redux"; // this method allows us to merge different reducers into the root reducer
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

export default combineReducers({
  user: userReducer, // we give the userReducer a key inside the object we pass to the combine reducer so we can access its states inside the store using the user key
  cart: cartReducer
});
