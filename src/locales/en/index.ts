import { addLocaleData } from "react-intl";
import * as en from "react-intl/locale-data/en";
addLocaleData(en);

export default {
	"error": `Error 404 - ${location.pathname}`,
	"error.Err100": "Username doesn't belong to any account",
	"error.Err101": "User not found",
	"error.Err102": "Users not found",
	"error.Err200": "Password is incorrect",
	"error.Err999": "Unknown error. Check your connection",

	"login.title": "Login",
	"login.subtitle": "Login to continue",
	"login.username": "Email",
	"login.password": "Password",
	"login.forgotPasswordButton": "Forgot password",
	"login.loginButton": "Login",

	"chat.inbox.nothingSelected": "Nothing is selected...",
	"chat.inbox.isTyping": " is typing...",
	"chat.inbox.typeYourMessage": "Type your message...",
	"chat.inbox.menuItem.delete": "Delete",

	"chat.menu.title": "Inbox",
	"chat.menu.inbox": "Unread",
	"chat.menu.allMessages": "All messages",
	"chat.menu.draft": "Draft",
	"chat.menu.help": "Help",
	"chat.menu.settings": "Settings",

	"chat.users.search": "Search...",
	"chat.users.nothingToShow": "Nothing to show...",
	"chat.users.menuItem.delete": "Delete",
};
