import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux"; // connect is a HOC (higher order component) that lets us moddify our component to have access to things related with redux, included the store
// HOC are functions that takes components as arguments and then returns you a new modified component
import "./header.styles.scss";
// this is a special syntax in React for importing SVG.
// The ReactComponent import name is special and tells Create React App that you want a React component that renders an SVG
import { ReactComponent as Logo } from "../../assets/crown.svg";
const Header = ({ currentUser }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/contact">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          {/* auth.signOut uses the communication channel opened between the app and firebase and sends a null user to the app when the user signs out */}
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);

const mapStateToProps = state => ({
  // the state is the store (the root reducer) then we have the key of the reducer where the property we want its in, and then the property we want to get the value
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header); // this is currying, we pass two function,
// the first argument of the first function is going to be the function that allows us to access the state, the root reducer, then the second parameter is
// the second one is the one that give us access to the actions we want to use to trigger updates on the store
// the second function we pass is the component we want to be modified in order to have access to the store and actions that are passed as arguments of the first function
