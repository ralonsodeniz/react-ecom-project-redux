import { createStore, applyMiddleware } from "redux"; // createStore() creates the store using the root reducer and the middleware we want to use, to use the middleware we use applyMiddleware() method
import logger from "redux-logger"; // this is a middleware that is nice to use when debugging our redux code
import rootReducer from "./root-reducer"; // we need the root reducer to create the store

const middlewares = [logger]; // we create an array with all the middlewares we want to use so then we can spread this array as the parameter of applyMiddleware method so each of them is passed as a parameter.
// this makes it easier to add new middlewares just by adding them to the array

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
