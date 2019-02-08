import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { alert } from "./alert.reducer";
import { volunteer } from "./volunteer.reducer";
import { quiz } from "./quiz.reducer";
import { reserveHall } from "./hall.reducer";
import { rentEquipment } from "./rent.reducer";
import { bookCatering } from "./catering.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  volunteer,
  quiz,
  reserveHall,
  rentEquipment,
  bookCatering
});

export default rootReducer;
