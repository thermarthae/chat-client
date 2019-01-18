import { styled } from '@material-ui/styles';

const EmptyItem = styled('div')({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexGrow: 1,
	textAlign: 'center',
	fontWeight: 600,
	userSelect: 'none',
	padding: '0px 10px',
	color: 'rgba(255, 255, 255, 0.1)',
	fontSize: '2em',
}, { name: 'EmptyItem' });

export default EmptyItem;
