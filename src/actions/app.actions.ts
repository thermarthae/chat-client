export type IActionFunction = (id: string, arg?: string) => IAction;

export interface IAction {
	type: "SET_NICKNAME",
	payload?: any,
}

export abstract class Actions {
	public static setNickname(payload: string): IAction {
		return {
			type: "SET_NICKNAME",
			payload
		};
	}
}
