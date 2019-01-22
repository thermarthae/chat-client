import { makeStyles } from '@material-ui/styles';

const logoStyles = makeStyles({
	root: {
		imageRendering: 'pixelated',
		fallbacks: { imageRendering: 'crisp-edges' }
	}
}, { name: 'Logo' });

export default logoStyles;
