import * as React from 'react';

import Mutation from 'react-apollo/Mutation';
import { TOGGLE_ASIDE } from './Header.apollo';

import ButtonBase from '@material-ui/core/ButtonBase';
import SettingsSharp from '@material-ui/icons/SettingsSharp';

interface IHeaderProps {
	conversationName: string;
}

const Header = React.memo(({ conversationName }: IHeaderProps) => {
	return (
		<Mutation mutation={TOGGLE_ASIDE}>
			{toggleAside =>
				<div className='head'>
					<div className='id'>
						<span className='name'>{conversationName}</span>
					</div>
					<ButtonBase
						focusRipple
						className='btn btn-big'
						onClick={() => toggleAside({})}
					>
						<SettingsSharp style={{ fontSize: 'inherit' }} />
					</ButtonBase>
				</div>
			}
		</Mutation>
	);
});

export default Header;
