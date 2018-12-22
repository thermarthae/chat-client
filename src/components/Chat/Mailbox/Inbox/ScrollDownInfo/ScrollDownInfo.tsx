import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Slide from '@material-ui/core/Slide';
import scrollDownInfoStyles from './ScrollDownInfo.style';

interface IScrollDownInfo {
	open: boolean;
	onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}
const ScrollDownInfo = ({ open, onClick }: IScrollDownInfo) => {
	const classes = scrollDownInfoStyles({});
	return (
		<Slide direction='up' in={open} mountOnEnter unmountOnExit>
			<div className={classes.root} onClick={onClick}>
				<FormattedMessage id='chat.inbox.scrollDownToSee' />
			</div>
		</Slide>
	);
};

export default ScrollDownInfo;
