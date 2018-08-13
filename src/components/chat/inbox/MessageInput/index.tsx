import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import withApollo, { WithApolloClient } from 'react-apollo/withApollo';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import Send from '@material-ui/icons/Send';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';

import {
	SEND_MESSAGE,
	GET_MESSAGES,
	IGetMessagesResponse,
} from './index.apollo';

interface IMessageInputProps {
	oponentId?: string;
	draft: string;
}

interface IMessageInputStates {
	message: string;
}

type TProps = WithApolloClient<IMessageInputProps & InjectedIntlProps>;
class MessageInput extends React.PureComponent<TProps, IMessageInputStates> {
	public state = {
		message: ''
	};

	public componentDidMount() {
		this.setState(({ }, props) => ({ message: props.draft }));
	}

	public componentWillUnmount() {
		// TODO send draft to server
	}

	private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ message: event.target.value });
	}

	private sendMessage = async () => {
		const { oponentId, client } = this.props;
		const { message } = this.state;

		try {
			this.setState({ message: '' });
			await client.mutate({
				mutation: SEND_MESSAGE,
				variables: { conversationId: oponentId, message },
				update: (proxy, { data: { sendMessage } }: any) => {
					const msgData = proxy.readQuery({ query: GET_MESSAGES, variables: { id: oponentId } }) as IGetMessagesResponse;
					if (!msgData.getConversation.messages.find(msg => msg._id === sendMessage._id))
						msgData.getConversation.messages.push(sendMessage);
					proxy.writeQuery({ query: GET_MESSAGES, data: msgData, variables: { id: oponentId } });
				},
				optimisticResponse: {
					__typename: 'Mutation',
					sendMessage: {
						__typename: 'Message',
						_id: Date.now(),
						me: true,
						author: {
							__typename: 'User',
							name: ''
						},
						content: message,
						conversation: oponentId,
						time: Date.now()
					}
				}
			});
		} catch (e) {
			this.setState({ message });
		}
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
					onKeyDown={event => {
						if (event.keyCode === 13 && !event.shiftKey) {
							event.preventDefault();
							this.sendMessage();
						}
					}}
				/>
				<IconButton className='btn emoticon'>
					<InsertEmoticon style={{ fontSize: 'inherit' }} />
				</IconButton>
				<IconButton className='btn send'>
					<Send
						style={{ fontSize: 'inherit' }}
						onClick={this.sendMessage}
					/>
				</IconButton>
			</div>
		);
	}
}

export default injectIntl(withApollo(MessageInput));
