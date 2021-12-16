import {createStore, applyMiddleware, combineReducers} from "redux";
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";

import {todo} from './todo/reducer'

const combinedReducers = combineReducers({
  todo
})

const initialStore = createStore(combinedReducers, composeWithDevTools(applyMiddleware(thunkMiddleware)))
export {initialStore}