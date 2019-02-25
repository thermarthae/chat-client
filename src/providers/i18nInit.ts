import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

export const supportedLangs = {
	pl: 'Polski',
	en: 'English'
};

i18n
	.use(LanguageDetector)
	.use(Backend)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		load: 'languageOnly',
		whitelist: ['pl', 'en'],
		nonExplicitWhitelist: true,
		// debug: true,
		interpolation: {
			escapeValue: false
		}
	});

export default i18n;
