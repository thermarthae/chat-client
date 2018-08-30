import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import memoizeOne from 'memoize-one';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

import Message from './Message';
import { IMessage } from '../Mailbox.apollo';

interface IInboxProps {
	messages: IMessage[];
	mgsToFetch: number;
	onLoadMore: () => Promise<any>;
}

interface IInboxState {
	menuAnchorEl: HTMLElement | undefined;
	isFetching: boolean;
	noMoreMsgToFetch: boolean;
}

class Inbox extends React.PureComponent<IInboxProps, IInboxState> {
	private listRef = React.createRef<HTMLDivElement>();
	private inboxRef = React.createRef<HTMLDivElement>();

	public state = {
		menuAnchorEl: undefined,
		isFetching: false,
		noMoreMsgToFetch: false,
	};

	public componentDidMount() {
		this.scrollToBottom('instant');
	}

	public getSnapshotBeforeUpdate(prevProps: IInboxProps) {
		if (this.props.messages.length > prevProps.messages.length) {
			const inbox = this.inboxRef.current!;
			const onBottom = inbox.scrollHeight - inbox.scrollTop === inbox.clientHeight;
			return !onBottom ? inbox.scrollHeight - inbox.scrollTop : null;
		}
		return null;
	}

	public componentDidUpdate({ }, { }, snapshot: number) {
		if (snapshot !== null) {
			const inbox = this.inboxRef.current!;
			inbox.scrollTop = inbox.scrollHeight - snapshot;
		}
		// else this.scrollToBottom('smooth'); //TODO: Scroll when new message
	}

	private scrollToBottom = (behavior: 'smooth' | 'instant') => {
		this.listRef.current!.scrollIntoView({ behavior, block: 'end', inline: 'end' });
	}

	private handleScroll = async (event: React.ChangeEvent<HTMLDivElement>) => {
		const { isFetching, noMoreMsgToFetch } = this.state;

		if (!isFetching && !noMoreMsgToFetch && event.target.scrollTop < 300) {
			this.setState({ isFetching: true });
			const { data: { getConversation: { messages } } } = await this.props.onLoadMore();

			this.setState(({ }, props) => ({
				isFetching: false,
				noMoreMsgToFetch: (!messages || messages.length < props.mgsToFetch) ? true : false
			}));
		}
	}

	private handleMenuClick = async (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		const target = event.currentTarget;

		this.setState(prevState => ({
			menuAnchorEl: !prevState.menuAnchorEl ? target : undefined
		}));
	}

	private groupMessages = memoizeOne((msgs: IMessage[]) => {
		let lastMsg = msgs[0];
		let currentGroup: IMessage[] = [];
		const msgGroups: IMessage[][] = [];

		msgs.forEach(msg => {
			if (lastMsg.me === msg.me) currentGroup.push(msg);
			else {
				msgGroups.push(currentGroup);
				currentGroup = [msg];
			}
			lastMsg = msg;
		});
		msgGroups.push(currentGroup);

		return msgGroups;
	});

	public render() {
		const { messages } = this.props;
		const { menuAnchorEl, isFetching } = this.state;
		const msgGroups = this.groupMessages(messages);

		return (
			<div className='inbox' ref={this.inboxRef} onScroll={this.handleScroll as any}>
				<div ref={this.listRef}>
					{isFetching && <div className='align--center fetching'>
						<CircularProgress size='1.5em' color='inherit' />
					</div>}
					{msgGroups.map(grp =>
						<div
							key={'G-' + grp[0]._id + '-' + grp.length}
							className={'group' + (grp[0].me ? ' right' : ' left')}
						>
							{grp.map(
								msg => <Message key={msg._id} message={msg} handleMenuClick={this.handleMenuClick} />
							)}
						</div>
					)}
				</div>
				<Menu
					open={!!menuAnchorEl}
					onClose={this.handleMenuClick}
					anchorEl={menuAnchorEl}
				>
					<MenuItem className='menuItem' onClick={this.handleMenuClick}>
						<FormattedMessage id='menuItem.delete' />
					</MenuItem>
				</Menu>
			</div>
		);
	}
}

export default Inbox;
