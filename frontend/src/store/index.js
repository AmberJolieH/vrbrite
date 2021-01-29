import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import categoriesReducer from "./categories";
import sessionReducer from "./session";
import eventsReducer from "./events";
import ticketsReducer from "./tickets";

const rootReducer = combineReducers({
	session: sessionReducer,
	events: eventsReducer,
	categories: categoriesReducer,
	tickets: ticketsReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require("redux-logger").default;
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
