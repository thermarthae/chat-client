import { makeStyles } from '@material-ui/styles';

const logoStyles = makeStyles({
	root: {
		flexShrink: 0,
		imageRendering: 'pixelated',
		fallbacks: { imageRendering: 'crisp-edges' }
	}
}, { name: 'Logo' });

export default logoStyles;
