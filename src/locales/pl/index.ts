import { addLocaleData } from "react-intl";
import * as pl from "react-intl/locale-data/pl";
addLocaleData(pl);

export default {
	"error": `Błąd 404 - ${location.pathname}`,
	"error.Err100": "Użytkownik z podanym adresem nie istnieje",
	"error.Err101": "Nie znaleziono użytkownika",
	"error.Err102": "Nie znaleziono użytkowników",
	"error.Err200": "Niepoprawne hasło",
	"error.Err999": "Wystąpił nieznany błąd. Sprawdz połączenie",

	"login.title": "Zaloguj się",
	"login.subtitle": "Zaloguj się aby kontynuować",
	"login.username": "Email",
	"login.password": "Hasło",
	"login.forgotPasswordButton": "Zapomniałem hasła",
	"login.loginButton": "Zaloguj",

	"chat.inbox.nothingSelected": "Nic nie wybrano...",
	"chat.inbox.loading": "Wczytywanie...",
	"chat.inbox.isTyping": " pisze...",
	"chat.inbox.typeYourMessage": "Napisz wiadomość...",
	"chat.inbox.menuItem.delete": "Usuń",

	"chat.menu.title": "Poczta",
	"chat.menu.inbox": "Odebrane",
	"chat.menu.allMessages": "Wszystkie",
	"chat.menu.draft": "Robocze",
	"chat.menu.help": "Pomoc",
	"chat.menu.settings": "Ustawienia",

	"chat.users.search": "Szukaj...",
	"chat.users.nothingToShow": "Brak elementów do wyświetlenia...",
	"chat.users.conversationName": "Nazwa konwersacji",
	"chat.users.menuItem.delete": "Usuń",
};
