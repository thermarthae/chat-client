export interface IAppAction {
	type: "CHANGE_LANGUAGE";
	payload?: any;
}

export abstract class AppActions {
	public static changeLanguage(payload: string): IAppAction {
		return {
			type: "CHANGE_LANGUAGE",
			payload
		};
	}
}
