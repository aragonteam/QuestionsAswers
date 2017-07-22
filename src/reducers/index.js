import { combineReducers } from "redux";

import NavReducer from "./NavigationReducer";
import QuestionReducer from "./QuestionReducer";

export default combineReducers({
  nav: NavReducer,
  questions: QuestionReducer
});
