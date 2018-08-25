import { addLocaleData } from 'react-intl';
import { flatten } from 'flat';
import * as pl from 'react-intl/locale-data/pl';

addLocaleData(pl);

export default flatten({
	error: {
		unknown: 'Coś poszło nie tak!',
		404: `Błąd 404 - ${location.pathname}`,
		Err100: 'Użytkownik z podanym adresem nie istnieje',
		Err101: 'Nie znaleziono użytkownika',
		Err102: 'Nie znaleziono użytkowników',
		Err200: 'Niepoprawne hasło',
		Err999: 'Wystąpił nieznany błąd. Sprawdz połączenie',
	},
	menuItem: {
		delete: 'Usuń'
	},


	login: {
		title: 'Zaloguj się',
		subtitle: 'Zaloguj się aby kontynuować',
		username: 'Email',
		password: 'Hasło',
		forgotPasswordButton: 'Zapomniałem hasła',
		loginButton: 'Zaloguj',
	},
	chat: {
		conversations: {
			search: 'Szukaj...',
			nothingToShow: 'Brak elementów do wyświetlenia...',
			conversationName: 'Nazwa konwersacji',
		},
		mailbox: {
			nothingSelected: 'Nic nie wybrano...',
			loading: 'Wczytywanie...',
			isTyping: ' pisze...',
			typeYourMessage: 'Napisz wiadomość...',
		},
		menu: {
			title: 'Poczta',
			inbox: 'Odebrane',
			allMessages: 'Wszystkie',
			draft: 'Robocze',
			help: 'Pomoc',
			settings: 'Ustawienia',
		},
	},

});
