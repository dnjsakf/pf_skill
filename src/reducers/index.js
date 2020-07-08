import { combineReducers } from "redux";
import { reducer as sidebar } from "./sidebar";
import { reducer as layout } from "./layout";

export default combineReducers({
  sidebar,
  layout,
});
