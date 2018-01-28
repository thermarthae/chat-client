import { IAppAction } from "../actions/app.actions";

export interface IAppReducerState {
	language: string;
	isAuthenticated: boolean;
	menuIsOpen: boolean;
}

const initialState: IAppReducerState = {
	language: "en",
	isAuthenticated: true,
	menuIsOpen: true,
};

export default (state: IAppReducerState = initialState, action: IAppAction) => {
	switch (action.type) {
		case "CHANGE_LANGUAGE":
			state = {
				...state,
				language: action.payload
			};
			break;
		case "IS_AUTHENTICATED":
			state = {
				...state,
				isAuthenticated: action.payload
			};
			break;
		case "TOGGLE_MENU":
			state = {
				...state,
				menuIsOpen: !state.menuIsOpen
			};
			break;
	}
	return state;
};
