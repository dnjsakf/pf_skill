import { combineReducers } from "redux";
import sidebar from "./sidebar/reducer";
import layout from "./layout/reducer";
import menuSettings from "./settings/menu/reducer";

export default combineReducers({
  sidebar,
  layout,
  menuSettings
});