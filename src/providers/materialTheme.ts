import { createMuiTheme } from '@material-ui/core/styles';

// tslint:disable:interface-name
declare module '@material-ui/core/styles/createPalette' {
	type TPalette<T = typeof theme.palette> = {
		[P in keyof T]: T[P];
	};
	interface Palette extends TPalette { }
	interface PaletteOptions extends Partial<TPalette> { }

	interface IPaletteColor {
		lighter?: string;
	}
	interface SimplePaletteColorOptions extends IPaletteColor { }
	interface PaletteColor extends IPaletteColor { }
}

declare module '@material-ui/core/styles/createTypography' {
	interface ITypography {
		emToPx: (em: number, base?: number) => string; //TODO: depreciate
	}
	interface Typography extends ITypography { }
	interface TypographyOptions extends ITypography { }
}

const theme = {
	typography: {
		fontSize: 14,
		htmlFontSize: 16,
		fontFamily: 'Roboto, sans-serif',
		emToPx: (em: number, base = 14) => Math.round(base * em) + 'px'
	},
	palette: {
		background: {
			paper: '#fff',
			default: '#f9f9fb'
		},
		primary: {
			lighter: 'hsl(234, 22%, 95%)',
			light: 'hsl(234, 22%, 25%)',
			main: 'hsl(234, 22%, 17%)',
			dark: 'hsl(234, 22%, 14%)'
		},
		secondary: {
			main: '#283593',
		},
		error: {
			light: 'rgba(255, 81, 49, 1)',
			main: 'rgba(213, 0, 0, 1)',
			dark: 'rgba(155, 0, 0, 1)',
			contrastText: '#fff'
		},
		text: {
			primary: 'rgba(0, 0, 0, 0.87)',
			secondary: 'rgba(0, 0, 0, 0.54)',
			disabled: 'rgba(0, 0, 0, 0.38)',
			hint: 'rgba(0, 0, 0, 0.38)'
		},
		textLight: {
			primary: '#ffffff',
			secondary: 'rgba(255, 255, 255, 0.7)',
			disabled: 'rgba(255, 255, 255, 0.5)',
			hint: 'rgba(255, 255, 255, 0.12)'
		},
		minorColors: {
			unseen: '#0084ff',
			paleSky: '#6E7783'
		},
	}
};

export default createMuiTheme(theme);
