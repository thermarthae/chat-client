import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import CircularProgress from '@material-ui/core/CircularProgress';

import ListItem from '@material-ui/core/ListItem';

interface INavItemProps {
	setInboxFilter?: () => void;
	active?: boolean;
	l18nID: string;
	count?: number;
}

class NavItem extends React.Component<INavItemProps> {
	public shouldComponentUpdate(nextProps: INavItemProps) {
		if (nextProps.active !== this.props.active) return true;
		if (nextProps.count !== this.props.count) return true;
		return false;
	}

	public render() {
		const { setInboxFilter, active, l18nID, count } = this.props;

		return (
			<ListItem button
				onClick={setInboxFilter}
				className={'line' + (active ? ' active' : '')}
			>
				<FormattedMessage id={l18nID}>
					{txt => <span className='name'>{txt}</span>}
				</FormattedMessage>
				{typeof count === 'number'
					? <span className='count'>{count}</span>
					: <CircularProgress size='1em' color='inherit' />
				}
			</ListItem>
		);
	}
}

export default NavItem;
