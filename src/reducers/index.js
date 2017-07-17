import { combineReducers } from "redux";

import NavReducer from "./NavigationReducer";

export default combineReducers({
  nav: NavReducer
});
