import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndUpPage from "./pages/sign-in-and-up/sign-in-and-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils"; // we need this to make our app aware of a google auth process
import { setCurrentUser } from "./redux/user/user.action"; // in order to dispatch the action and be able to use it as a prop we need to import it
import "./App.css";

class App extends Component {
  // since we don't need state anymore nor to use the props inside the constructor  we don't need them

  unsubscribeFromAuth = null;

  componentDidMount() {
    // since we are going to use our mapped action to props more than once we destructure it from this.props
    const { setCurrentUser } = this.props;
    // this is a method in the auth library that registers when a user changes in the firebase auth
    // it's going to be a async since we potentially have to do api calls to our db to get the users registered
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // here we execute auth.onAuthStateChanged() and store what it returns
      if (userAuth) {
        // we check if t he userAuth object is not null
        const userRef = await createUserProfileDocument(userAuth); // we save the returned userRef object from the firestore with the id of the user that has loggedin
        userRef.onSnapshot(snapShot => {
          // onSnapshot adds a listener for documentSnapshot and triggers an action when it happens
          // we are replacing this.setState({currentUser:{whatever}}) evrywhere we want to update currentUser in the store with this.props.setCurrentUser({whatever}) (we dont need the currentUser neither because thets what the action modifies itself) since thats what this action does
          setCurrentUser({
            id: snapShot.id, // we get the id of the registered user from the documentSnapshot
            ...snapShot.data() // since the properties of the docuemnt are not in the documentSnapshot we get them with the .data() method of documentSnapshot and we spread it into the currentUser object from the state
          });
        });
      } else {
        setCurrentUser(userAuth); // if the user logs out or it is null because any other reason we set the currentUser to null (we know in this case userAuth is going to be null)
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); // and then we use it in the componentWillUnmount to close the subscription
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)) // dispatch is a way for redux to know that whatever you pass to this function is going to be an action object that is going to be passed to every reducer
  // we returning an object which its property is a function that dispatchs the action with the requested parameter, in this case the user
  // once we need to use the action inside the component we will do this.props.setCurrentUser(user)
});

export default connect(
  null,
  mapDispatchToProps
)(App);
// the first argument of the first function of connect() mapStateToProps is required, in case we are not going to use it but we need to use connect to use mapDispatchToProps so we can access some actions we have to set to null the first parameter
// in App,js we do not need any state property, we needed currentUser to pass it to <Header> component but since it is now connected to the store by itslef we only need to dispatch an action to update the user
