import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import DataBooks from "./Reducers/BooksReducer";

const reducer = combineReducers({
  DataBooks,
});

const composeEnhancers = compose;

export default function generateStore() {
  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
}
