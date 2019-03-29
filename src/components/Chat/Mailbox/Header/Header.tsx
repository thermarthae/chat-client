import React from 'react';

import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import SettingsSharp from '@material-ui/icons/SettingsSharp';

import headerStyles from './Header.style';

interface IHeaderProps {
	conversationName: string;
	toggleAside: () => void;
}

const Header = React.memo(({ conversationName, toggleAside }: IHeaderProps) => {
	const classes = headerStyles();

	return (
		<div className={classes.root}>
			<Typography className={classes.id} variant='subtitle2'>{conversationName}</Typography>
			<ButtonBase
				focusRipple
				className={classes.btn}
				onClick={toggleAside}
			>
				<SettingsSharp className={classes.ico} />
			</ButtonBase>
		</div>
	);
});

export default Header;
