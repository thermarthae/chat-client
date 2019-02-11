import React from 'react';
import { useTranslation } from 'react-i18next';
import Slide from '@material-ui/core/Slide';
import scrollDownInfoStyles from './ScrollDownInfo.style';

interface IScrollDownInfo {
	open: boolean;
	onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}
const ScrollDownInfo = ({ open, onClick }: IScrollDownInfo) => {
	const classes = scrollDownInfoStyles({});
	const [t] = useTranslation();

	return (
		<Slide direction='up' in={open} mountOnEnter unmountOnExit>
			<div className={classes.root} onClick={onClick}>{t('chat.inbox.scrollDownToSee')}</div>
		</Slide>
	);
};

export default ScrollDownInfo;
