import { addLocaleData } from 'react-intl';
import { flatten } from 'flat';
import * as en from 'react-intl/locale-data/en';

addLocaleData(en);

export default flatten({
	error: {
		404: `Error 404 - ${location.pathname}`,
		UnknownError: 'Something went wrong!',
		UserExistsError: 'User with the given username is already registered',
		UserNotExistsError: 'User not exist',
		MissingUsernameError: 'No username was given',
		IncorrectUsernameError: 'The specified user does not exist',
		MissingPasswordError: 'No password was given',
		IncorrectPasswordError: 'Incorrect password',
		AlreadyLoggedIn: 'You are already logged in',
		AlreadyLoggedOut: 'You are already logged out',
		NotLoggedInForbidden: 'Access forbidden. You must be logged in',
		RightsForbidden: 'Access denied',
		UsernameIsTooShort: 'Username is too short (min 3 characters)',
		PasswordIsTooShort: 'Password is too short (min 8 characters)',
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
		inbox: {
			scrollDownToSee: 'Scroll to bottom to see new message!',
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
