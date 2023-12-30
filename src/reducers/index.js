import { combineReducers } from "redux";
import products from "./Products";
import message from "./Message";
import auth from "./Auth";

export default combineReducers({
    products,
    auth,
    message
});