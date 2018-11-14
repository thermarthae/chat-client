import { addLocaleData } from 'react-intl';
import { flatten } from 'flat';
import * as pl from 'react-intl/locale-data/pl';

addLocaleData(pl);

export default flatten({
	error: {
		404: `Błąd 404 - ${location.pathname}`,
		UnknownError: 'Coś poszło nie tak!',
		UserExistsError: 'Użytkownik z podaną nazwą już istnieje',
		UserNotExistsError: 'Użytkownik nie istnieje',
		MissingUsernameError: 'Nie podano nazwy użytkownika',
		IncorrectUsernameError: 'Użytkownik z podaną nazwą nie istnieje',
		MissingPasswordError: 'Nie podano hasła',
		IncorrectPasswordError: 'Hasło nieprawidłowe',
		AlreadyLoggedIn: 'Jesteś już zalogowany',
		AlreadyLoggedOut: 'Jesteś już wylogowany',
		NotLoggedInForbidden: 'Brak dostępu. Musisz być zalogowany',
		RightsForbidden: 'Odmowa dostępu',
		UsernameIsTooShort: 'Nazwa użytkownika za krótka (minimum 3 znaki)',
		PasswordIsTooShort: 'Hasło za krótkie (minimum 8 znaków)',
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
		menu: {
			title: 'Poczta',
			inbox: 'Odebrane',
			allMessages: 'Wszystkie',
			searchResult: 'Wyniki wyszukiwania',
			draft: 'Robocze',
			help: 'Pomoc',
			settings: 'Ustawienia',
		},
		mailbox: {
			nothingSelected: 'Nic nie wybrano...',
			loading: 'Wczytywanie...',
			isTyping: ' pisze...',
			typeYourMessage: 'Napisz wiadomość...',
		},
		conversations: {
			search: 'Szukaj...',
			nothingToShow: 'Brak elementów do wyświetlenia...',
			conversationName: 'Nazwa konwersacji',
		},
		searchbox: {
			isQueryShort: 'Wyszukiwane wyrażenie musi mieć co najmniej 3 znaki',
			noResults: 'Brak wyników',
			users: 'Użytkownicy',
			conversations: 'Konwersacje',
		},
	},

	emojiPicker: {
		search: 'Szukaj',
		notfound: 'Nie znaleziono',
		categories: {
			search: 'Wyniki wyszukiwania',
			recent: 'Ostatnio używane',
			people: 'Ludzie',
			nature: 'Natura',
			foods: 'Jedzenie',
			activity: 'Sport',
			places: 'Podróże',
			objects: 'Objekty',
			symbols: 'Symbole',
			flags: 'Flagi',
			custom: 'Niestandarodwe',
		}
	}
});
