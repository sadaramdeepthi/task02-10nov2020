import { combineReducers } from "redux";
import userData from "./userData";
import error from "./error";

export default combineReducers({ userData, error });
