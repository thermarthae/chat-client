export interface IChatAction {
	type: "TOGGLE_ASIDE" | "SET_INBOX_FILTER";
	payload?: any;
}

export type TInboxFilter = null | "unread" | "draft" | "groups";

export abstract class ChatActions {
	public static toggleAside(): IChatAction {
		return {
			type: "TOGGLE_ASIDE"
		};
	}
	public static setInboxFilter(payload: TInboxFilter): IChatAction {
		return {
			type: "SET_INBOX_FILTER",
			payload
		};
	}
}
