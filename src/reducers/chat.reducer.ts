import { IChatAction, TInboxFilter } from "../actions/chat.actions";

interface IUser {
	id: string;
	online: boolean;
	isTypping: boolean;
	name: string;
	surname: string;
}
interface IMessage {
	id: string;
	me: boolean;
	time: number;
	seen: boolean;
	content: string;
}
export interface IInbox {
	user: IUser;
	draft: string;
	lastMessage: IMessage;
	messages: IMessage[];
}

export interface IChatReducerState {
	asideIsOpen: boolean;
	allMessages: number;
	unread: number;
	draft: number;
	groups: number;
	inboxFilter: TInboxFilter;
	inbox: IInbox[];
}

const initialState: IChatReducerState = {
	asideIsOpen: true,
	allMessages: 2,
	unread: 2,
	draft: 1,
	groups: 0,
	inboxFilter: null,
	inbox: [
		{
			user: {
				id: "asuyudgu6astgdjashvdyu6a",
				online: true,
				isTypping: true,
				name: "Tomasz",
				surname: "Przykładowy"
			},
			draft: "",
			lastMessage: {
				id: "4",
				me: true,
				time: 1520337449072,
				seen: false,
				content: "orem asdIpsum is simply dummy text of"
			},
			messages: [
				{
					id: "1",
					me: false,
					time: 152024894788,
					seen: true,
					content: "Ipsum is simply dummy asdasdasd of"
				},
				{
					id: "2",
					me: false,
					time: 1520248524389,
					seen: true,
					content: "em Ipsum iasdasds simply dummy text of"
				},
				{
					id: "3",
					me: true,
					time: 1520337447072,
					seen: true,
					content: "rem asdIpsum is simply dummy text of"
				},
				{
					id: "4",
					me: false,
					time: 1520337449074,
					seen: false,
					content: "orem asdIpsum is simply dummy text of"
				}
			]
		},
		{
			user: {
				id: "12dyudgu6astgdjashvdyu6a",
				online: false,
				isTypping: false,
				name: "Tomasz",
				surname: "Nieprzykładowy"
			},
			draft: "asdasdasdasdasdsad",
			lastMessage: {
				id: "8",
				me: true,
				time: 1520337449072,
				seen: false,
				content:
					"asdasddLorem asdIpsum q we qwe is simply dummy text of"
			},
			messages: [
				{
					id: "5",
					me: true,
					time: 152024894788,
					seen: true,
					content:
						"Lorem Ipsum is simply dummy asdasdasd of qwe qw eqw eqw e"
				},
				{
					id: "6",
					me: false,
					time: 1520248524389,
					seen: true,
					content:
						"qweqweqweIpsum iasdasds simply dummy text o qwe qwe wq eqw ef"
				},
				{
					id: "7",
					me: true,
					time: 1520337447072,
					seen: true,
					content:
						"Lowqeqwewqqwerem asdqwe Ipsum is simpe qwe ly dummy teqwe qwxt of"
				},
				{
					id: "8",
					me: true,
					time: 1520337449073,
					seen: false,
					content:
						"asdasddLorem asdIpsum q we qwe is simply dummy text of"
				}
			]
		}
	]
};

export default (
	state: IChatReducerState = initialState,
	action: IChatAction
) => {
	switch (action.type) {
		case "TOGGLE_ASIDE":
			state = {
				...state,
				asideIsOpen: !state.asideIsOpen
			};
			break;
		case "SET_INBOX_FILTER":
			state = {
				...state,
				inboxFilter: action.payload
			};
			break;
	}
	return state;
};
