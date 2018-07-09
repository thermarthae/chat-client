import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import Send from '@material-ui/icons/Send';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';

import { IDraft } from './index.apollo';

interface IInputProps {
	draft?: IDraft;
}

interface IInputStates {
	message: string;
}

class Input extends React.PureComponent<IInputProps & InjectedIntlProps, IInputStates> {
	public state = {
		message: ''
	};

	private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ message: event.target.value });
	}

	public render() {
		const { intl: { formatMessage } } = this.props;
		const { message } = this.state;

		return (
			<div className='bottom'>
				<TextField
					className='input'
					placeholder={formatMessage({ id: 'chat.inbox.typeYourMessage' })}
					multiline
					rowsMax={3}
					InputProps={{ disableUnderline: true }}
					value={message}
					onChange={this.handleChange}
				/>
				<IconButton className='btn emoticon'>
					<InsertEmoticon style={{ fontSize: 'inherit' }} />
				</IconButton>
				<IconButton className='btn send'>
					<Send style={{ fontSize: 'inherit' }} />
				</IconButton>
			</div>
		);
	}
}

export default injectIntl(Input);
