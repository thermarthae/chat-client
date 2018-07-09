import * as React from 'react';

import Mutation from 'react-apollo/Mutation';
import { TOGGLE_ASIDE } from './header.apollo';

import ButtonBase from '@material-ui/core/ButtonBase';
import Settings from '@material-ui/icons/Settings';

interface IHeaderProps {
	conversationName: string;
}

const Header: React.SFC<IHeaderProps> = props => {
	return (
		<Mutation mutation={TOGGLE_ASIDE}>
			{toggleAside =>
				<div className='head'>
					<div className='id'>
						<span className='name'>{props.conversationName}</span>
					</div>
					<ButtonBase
						focusRipple
						className='btn btn-big'
						onClick={() => toggleAside({})}
					>
						<Settings style={{ fontSize: 'inherit' }} />
					</ButtonBase>
				</div>
			}
		</Mutation>
	);
};

export default Header;
