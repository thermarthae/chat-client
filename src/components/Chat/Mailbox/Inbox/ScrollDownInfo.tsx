import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Slide from '@material-ui/core/Slide';

interface IScrollDownInfo {
	open: boolean;
	onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}
const ScrollDownInfo = ({ open, onClick }: IScrollDownInfo) => {
	return (
		<Slide direction='up' in={open} mountOnEnter unmountOnExit>
			<div className='scrollDownInfo' onClick={onClick}>
				<FormattedMessage id='chat.inbox.scrollDownToSee' />
			</div>
		</Slide>
	);
};

export default ScrollDownInfo;
