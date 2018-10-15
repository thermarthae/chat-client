export default {
	app: {
		__typename: 'App',
		language: 'pl',
		isLoggedIn: false,
	},
	chat: {
		__typename: 'Chat',
		isAsideOpen: false,
		inboxFilter: 'ALL',
	},
	subscriptions: {
		__typename: 'Subscriptions',
		conversations: false,
		mailbox: false
	}
};
