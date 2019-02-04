import { styled } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const EmptyItem = styled('div')(({ theme: { palette } }: { theme: Theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexGrow: 1,
	textAlign: 'center',
	fontWeight: 600,
	userSelect: 'none',
	padding: '0px 16px',
	color: palette.text.disabled,
	fontSize: '2em',
}), { name: 'EmptyItem' });

export default EmptyItem;
