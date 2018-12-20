import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export default class Header extends React.PureComponent {
	public render() {
		return (
			<div className='head header'>
				<FormattedMessage id='chat.menu.title'>
					{txt => <span className='title'>{txt}</span>}
				</FormattedMessage>
			</div>
		);
	}
}
