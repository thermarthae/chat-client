import { IAppAction } from "../actions/app.actions";

export interface IAppReducerState {
	language: string;
}

const initialState: IAppReducerState = {
	language: "en"
};

export default (state: IAppReducerState = initialState, action: IAppAction) => {
	switch (action.type) {
		case "CHANGE_LANGUAGE":
			state = {
				...state,
				language: action.payload
			};
			break;
	}
	return state;
};
