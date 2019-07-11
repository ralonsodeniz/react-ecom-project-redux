import React from "react";
import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors"; // we import our selector

const CartIcon = (
  { toggleCartHidden, itemCount } // doing => () is the same than doing => {return()}
) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{itemCount}</span>
  </div>
);

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

// const mapStateToProps = ({ cart: { cartItems } }) => ({
//   itemCount: cartItems.reduce(
//     (accumulator, cartItem) => accumulator + cartItem.quantity,
//     0
//   )
// });
// we use the value of the state in the store to compute a value we need in the component
// this we have written here is called a selector because what we are doing here is writting some kind of code that gets a state as in the whole state object and then pulls out just a small portion or a slice of that state
// we are getting the cartItems from the cart reducer and then reducing it to compute a new value
// the thing is that everytime any reducer updates we return a new object, redux recompose the entire state object and mapStateToProps is called every single time
// because mapStateToProps is always being called everytime the store is update, even when the update does not concern to the properties we have selected, the reduce method is being computed everytime because reduce doesn't know that the cart items coming in might be the exact same
// this is a performance problem because if the code we are executing inside the reduce is very demanding when are consuming a lot of time and resources everytime the store is updated
// this derivates into another problem, if we return a new object to the props everytime we will end up rerendering the component each time the state changes
// to avoid this we use a library called reselect that allows us to memoize the returning values for the same inputs
// reselec allows us to write the selectors in such a way so that it knows if that the property that is pulling from the state and using are the same in the sense that the value has no change and the output of the selector has not change it want pass the new object to the component, it will pass the old value and the component wont be rerendered without need
// because we might want to reuse our selectors we will change the folder structure and add a new file in the cart folder inside redux and add a file for the selectors
// instead of the old code we are now going to use the memoized selectors to pass the map the state to props only when the state that affect us changes

const mapStateToProps = state => {
  return { itemCount: selectCartItemsCount(state) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon);
// the first argument of the first function of connect() mapStateToProps is required, in case we are not going to use it but we need to use connect to use mapDispatchToProps so we can access some actions we have to set to null the first parameter
