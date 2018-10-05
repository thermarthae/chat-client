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
			searchResult: 'Search results',
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
		searchbox: {
			isQueryShort: 'Query must be at least 3 characters long',
			noResults: 'No results found',
			users: 'Users',
			conversations: 'Conversations',
		},
	},

	emojiPicker: {
		search: 'Search',
		notfound: 'No Emoji Found',
		categories: {
			search: 'Search Results',
			recent: 'Frequently Used',
			people: 'Smileys & People',
			nature: 'Animals & Nature',
			foods: 'Food & Drink',
			activity: 'Activity',
			places: 'Travel & Places',
			objects: 'Objects',
			symbols: 'Symbols',
			flags: 'Flags',
			custom: 'Custom',
		}
	}
});
