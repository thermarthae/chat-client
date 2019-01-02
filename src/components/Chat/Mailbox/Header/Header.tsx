import React from 'react';

import Mutation from 'react-apollo/Mutation';
import { TOGGLE_ASIDE } from './Header.apollo';

import ButtonBase from '@material-ui/core/ButtonBase';
import SettingsSharp from '@material-ui/icons/SettingsSharp';

import headerStyles from './Header.style';

interface IHeaderProps {
	conversationName: string;
}

const Header = React.memo(({ conversationName }: IHeaderProps) => {
	const classes = headerStyles({});
	return (
		<Mutation mutation={TOGGLE_ASIDE}>
			{toggleAside =>
				<div className={classes.root}>
					<span className={classes.id}>{conversationName}</span>
					<ButtonBase
						focusRipple
						className={classes.btn}
						onClick={() => toggleAside({})}
					>
						<SettingsSharp className={classes.ico} />
					</ButtonBase>
				</div>
			}
		</Mutation>
	);
});

export default Header;
