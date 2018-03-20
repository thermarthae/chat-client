import { addLocaleData } from "react-intl";
import * as pl from "react-intl/locale-data/pl";
addLocaleData(pl);

export default {
	"error": `Błąd 404 - ${location.pathname}`,
	"error.Err100": "Użytkownik z podanym adresem nie istnieje",
	"error.Err101": "Nie znaleziono użytkowników",
	"error.Err200": "Niepoprawne hasło",
	"error.Err999": "Wystąpił nieznany błąd",

	"login.title": "Zaloguj się",
	"login.subtitle": "Zaloguj się aby kontynuować",
	"login.username": "Email",
	"login.password": "Hasło",
	"login.forgotPasswordButton": "Zapomniałem hasła",
	"login.loginButton": "Zaloguj",

	"chat.inbox.nothingSelected": "Nic nie wybrano...",
	"chat.inbox.isTyping": " pisze...",
	"chat.inbox.seen": "Widziano, ",
	"chat.inbox.typeYourMessage": "Napisz wiadomość...",
	"chat.inbox.menuItem.delete": "Usuń",

	"chat.menu.title": "Poczta",
	"chat.menu.allMessages": "Odebrane",
	"chat.menu.unread": "Nieprzeczytane",
	"chat.menu.draft": "Robocze",
	"chat.menu.groups": "Grupy",
	"chat.menu.help": "Pomoc",
	"chat.menu.settings": "Ustawienia",

	"chat.users.search": "Szukaj...",
	"chat.users.inboxIsEmpty": "Skrzynka jest pusta...",
	"chat.users.nothingToShow": "Brak elementów do wyświetlenia...",
	"chat.users.menuItem.delete": "Usuń",
};
