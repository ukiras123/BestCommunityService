import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { alert } from "./alert.reducer";
import { volunteer } from "./volunteer.reducer";
import { quiz } from "./quiz.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  volunteer,
  quiz
});

export default rootReducer;
