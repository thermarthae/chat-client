import { createStore, combineReducers, applyMiddleware } from "redux";
import App from "../reducers/app.reducer"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";

export default createStore(
	combineReducers({ App }),
	composeWithDevTools(
		applyMiddleware(
			createLogger({
				// predicate: (getState, action) => action.type !== "TYPING_MESSAGE"
			}),
			thunk
		),
	)
);
