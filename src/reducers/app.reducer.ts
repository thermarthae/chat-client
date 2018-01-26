import { IAction } from "../actions/app.actions"

export interface IReducerState {
	nickname?: string,
	message?: string,
}

const initialState: IReducerState = {
	nickname: localStorage.nick,
	message: localStorage.message,
}

export default (state: IReducerState = initialState, action: IAction) => {
	switch (action.type) {
		case "SET_NICKNAME":
			state = {
				...state,
				nickname: action.payload
			}
			break;
	}
	return state;
}
