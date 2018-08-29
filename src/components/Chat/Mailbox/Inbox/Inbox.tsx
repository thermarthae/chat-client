import * as React from 'react';
import { FormattedMessage } from 'react-intl';

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

	public render() {
		const { messages } = this.props;
		const { menuAnchorEl, isFetching } = this.state;

		return (
			<div className='inbox' ref={this.inboxRef} onScroll={this.handleScroll as any}>
				<div ref={this.listRef}>
					{isFetching && <div className='align--center fetching'>
						<CircularProgress size='1.5em' color='inherit' />
					</div>}
					{messages.map(
						msg => <Message key={msg._id} message={msg} handleMenuClick={this.handleMenuClick} />
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
