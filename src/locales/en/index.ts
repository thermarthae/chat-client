import { addLocaleData } from 'react-intl';
import { flatten } from 'flat';
import * as en from 'react-intl/locale-data/en';

addLocaleData(en);

export default flatten({
	error: {
		unknown: 'Something went wrong!',
		404: `Error 404 - ${location.pathname}`,
		Err100: 'Username doesn\'t belong to any account',
		Err101: 'User not found',
		Err102: 'Users not found',
		Err200: 'Password is incorrect',
		Err999: 'Unknown error. Check your connection',
	},
	menuItem: {
		delete: 'Delete'
	},


	login: {
		title: 'Login',
		subtitle: 'Login to continue',
		username: 'Email',
		password: 'Password',
		forgotPasswordButton: 'Forgot password',
		loginButton: 'Login',
	},
	chat: {
		menu: {
			title: 'Inbox',
			inbox: 'Unread',
			allMessages: 'All messages',
			draft: 'Draft',
			help: 'Help',
			settings: 'Settings',
		},
		mailbox: {
			nothingSelected: 'Nothing is selected...',
			loading: 'Loading...',
			isTyping: ' is typing...',
			typeYourMessage: 'Type your message...',
		},
		conversations: {
			search: 'Search...',
			nothingToShow: 'Nothing to show...',
			conversationName: 'Conversation name',
		},
	},

});
