import { addLocaleData } from "react-intl";
import * as pl from "react-intl/locale-data/pl";
addLocaleData(pl);

export default {
	"error": `Błąd 404 - ${location.pathname}`,

	"login.title": "Zaloguj się",
	"login.subtitle": "Zaloguj się aby kontynuować",
	"login.email": "Email",
	"login.incorrentEmail": "Niepoprawny adres email",
	"login.password": "Hasło",
	"login.incorrentPassword": "Niepoprawne hasło",
	"login.forgotPasswordButton": "Zapomniałem hasła",
	"login.loginButton": "Zaloguj",

	"chat.inbox.nothingSelected": "Nic nie wybrano...",
	"chat.inbox.isTyping": " piszę...",
	"chat.inbox.seen": "Widziano, ",
	"chat.inbox.typeYourMessage": "Napisz wiadomość...",

	"chat.menu.title": "Poczta",
	"chat.menu.allMessages": "Wszystkie",
	"chat.menu.unread": "Nie przeczytane",
	"chat.menu.draft": "Zapisane",
	"chat.menu.groups": "Grupy",
	"chat.menu.help": "Pomoc",
	"chat.menu.settings": "Ustawienia",

	"chat.users.search": "Szukaj...",
	"chat.users.inboxIsEmpty": "Skrzynka jest pusta...",
	"chat.users.nothingToShow": "Brak elementów do wyświetlenia...",
};
