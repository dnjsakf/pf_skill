import { combineReducers } from "redux";
import sidebar from "./sidebar/reducer";
import layout from "./layout/reducer";

export default combineReducers({
  sidebar,
  layout,
});