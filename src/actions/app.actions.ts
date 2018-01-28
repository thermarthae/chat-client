export interface IAppAction {
	type: "CHANGE_LANGUAGE" | "IS_AUTHENTICATED"| "TOGGLE_MENU";
	payload?: any;
}

export abstract class AppActions {
	public static changeLanguage(payload: string): IAppAction {
		return {
			type: "CHANGE_LANGUAGE",
			payload
		};
	}
	public static isAuthenticated(payload: boolean): IAppAction {
		return {
			type: "IS_AUTHENTICATED",
			payload
		};
	}
	public static toggleMenu(): IAppAction {
		return {
			type: "TOGGLE_MENU"
		};
	}
}
