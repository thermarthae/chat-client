import { styled } from '@material-ui/styles';

const List = styled('div')({
	position: 'relative',
	flexGrow: 1,
	overflow: 'auto',
	'& > a': {
		textDecoration: 'none',
	}
}, { name: 'List' });

export default List;
