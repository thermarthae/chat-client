import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createPalette' {
	interface IMinorColors {
		online: string;
		unseen: string;
	}
	interface Palette { // tslint:disable-line:interface-name
		textLight: TypeText;
		minorColors: IMinorColors;
	}
	interface PaletteOptions { // tslint:disable-line:interface-name
		textLight: TypeText;
		minorColors: IMinorColors;
	}
}

declare module '@material-ui/core/styles/createTypography' {
	interface Typography { // tslint:disable-line:interface-name
		emToPx: (em: number, base?: number) => string;
	}
	interface TypographyOptions { // tslint:disable-line:interface-name
		emToPx: (em: number, base?: number) => string;
	}
}

export default createMuiTheme({
	typography: {
		useNextVariants: true,
		fontSize: 14,
		htmlFontSize: 14,
		fontFamily: 'Roboto, sans-serif',
		emToPx: (em: number, base = 14) => Math.round(base * em) + 'px'
	},
	palette: {
		background: {
			paper: '#fff',
			default: '#fafafa'
		},
		primary: {
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
			online: '#2dd505',
			unseen: '#0084ff'
		},
	}
});
