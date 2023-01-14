import { combineReducers } from "redux";
import itemReducer from "./itemReducer"

const reducers = combineReducers({
  itemState: itemReducer,
})

export default reducers;