import React from 'react';
import { useMutation } from 'react-apollo-hooks';

import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import SettingsSharp from '@material-ui/icons/SettingsSharp';

import { TOGGLE_ASIDE } from './Header.apollo';
import headerStyles from './Header.style';

interface IHeaderProps {
	conversationName: string;
}

const Header = React.memo(({ conversationName }: IHeaderProps) => {
	const classes = headerStyles();
	const toggleAsideMutation = useMutation(TOGGLE_ASIDE);
	const toggleAside = () => toggleAsideMutation();

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
