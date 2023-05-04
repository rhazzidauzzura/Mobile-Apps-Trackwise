import { combineReducers } from "redux";
import productReducer from "./ProductReducer";

const rootReducer = combineReducers({
  products: productReducer,
});

export default rootReducer;
