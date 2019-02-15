import React from 'react';

import Mutation from 'react-apollo/Mutation';
import { TOGGLE_ASIDE } from './Header.apollo';

import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import SettingsSharp from '@material-ui/icons/SettingsSharp';

import headerStyles from './Header.style';

interface IHeaderProps {
	conversationName: string;
}

const Header = React.memo(({ conversationName }: IHeaderProps) => {
	const classes = headerStyles();
	return (
		<Mutation mutation={TOGGLE_ASIDE}>
			{toggleAside =>
				<div className={classes.root}>
					<Typography className={classes.id} variant='subtitle2'>{conversationName}</Typography>
					<ButtonBase
						focusRipple
						className={classes.btn}
						onClick={() => toggleAside()}
					>
						<SettingsSharp className={classes.ico} />
					</ButtonBase>
				</div>
			}
		</Mutation>
	);
});

export default Header;
