import { combineReducers } from "redux";
import sidebar from "./sidebar/reducer";
import layout from "./layout/reducer";
import menu from "./menu/reducer";

export default combineReducers({
  sidebar,
  layout,
  menu,
});