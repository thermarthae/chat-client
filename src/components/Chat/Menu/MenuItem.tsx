import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import CircularProgress from '@material-ui/core/CircularProgress';

import ListItem from '@material-ui/core/ListItem';

interface IMenuItemProps {
	l18nID: string;
	setInboxFilter?: () => void;
	active?: boolean;
	count?: number | null;
}

class MenuItem extends React.Component<IMenuItemProps> {
	public shouldComponentUpdate(nextProps: IMenuItemProps) {
		if (nextProps.active !== this.props.active) return true;
		if (nextProps.count !== this.props.count) return true;
		return false;
	}

	public render() {
		const { setInboxFilter, active, l18nID, count } = this.props;

		let countElement = null;
		switch (typeof count) {
			case 'number':
				countElement = <span className='count'>{count}</span>;
				break;
			case 'object': //if null
				countElement = <CircularProgress size='1em' color='inherit' />;
				break;
		}


		return (
			<ListItem button
				onClick={setInboxFilter}
				className={'line' + (active ? ' active' : '')}
			>
				<FormattedMessage id={l18nID}>
					{txt => <span className='name'>{txt}</span>}
				</FormattedMessage>
				{countElement}
			</ListItem>
		);
	}
}

export default MenuItem;
