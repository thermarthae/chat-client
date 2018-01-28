import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import App from "../reducers/app.reducer";
import Chat from "../reducers/chat.reducer";

export default createStore(
	combineReducers({ App, Chat }),
	composeWithDevTools(
		applyMiddleware(
			createLogger({
				// predicate: (getState, action) => action.type !== "TYPING_MESSAGE"
			}),
			thunk
		),
	)
);
