import { combineReducers } from "redux";
import usersReducer from "./users/users.reducer";
import citiesReducer from "./cities/cities.reducer";

const rootReducer = () =>
	combineReducers({
		cities: citiesReducer,
	});

export default rootReducer;
