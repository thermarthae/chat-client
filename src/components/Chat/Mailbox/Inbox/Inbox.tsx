import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import CircularProgress from '@material-ui/core/CircularProgress';

import MessageGroups from './MessageGroups/MessageGroups';
import { IMessage } from '../Mailbox.apollo';

interface IInboxProps {
	messages: IMessage[];
	mgsToFetch: number;
	seen: boolean;
	markConvAsRead: () => Promise<void>;
	onLoadMore: () => Promise<any>;
}

interface IInboxState {
	menuAnchorEl: HTMLElement | undefined;
	isFetching: boolean;
	noMoreMsgToFetch: boolean;
}

class Inbox extends React.PureComponent<IInboxProps, IInboxState> {
	private groupsRef = React.createRef<HTMLDivElement>();
	private contentRef = React.createRef<HTMLDivElement>();
	private isMarkingAsRead = false;

	public state = {
		menuAnchorEl: undefined,
		isFetching: false,
		noMoreMsgToFetch: false,
	};

	public async componentDidMount() {
		this.scrollToBottom('instant');
		if (this.contentRef.current!.scrollTop < 300) await this.fetchMoreMsgs();
		await this.markConvAsRead();
	}

	public getSnapshotBeforeUpdate(prevProps: IInboxProps) {
		if (this.props.messages.length > prevProps.messages.length) {
			const inbox = this.contentRef.current!;
			return inbox.scrollHeight - inbox.scrollTop;
		}
		return null;
	}

	public async componentDidUpdate(prevProps: IInboxProps, prevState: IInboxState, snapshot: number | null) {
		if (snapshot !== null) {
			const inbox = this.contentRef.current!;
			if (prevState.isFetching) inbox.scrollTop = inbox.scrollHeight - snapshot;
			else if (snapshot === inbox.clientHeight) this.scrollToBottom('smooth');
		}
		if (prevProps.seen && !this.props.seen) await this.markConvAsRead();
	}

	private markConvAsRead = async () => {
		if (this.props.seen || this.isMarkingAsRead) return;
		this.isMarkingAsRead = true;
		await this.props.markConvAsRead();
		this.isMarkingAsRead = false;
	}

	private scrollToBottom = (behavior: 'smooth' | 'instant') => {
		this.groupsRef.current!.scrollIntoView({ behavior, block: 'end', inline: 'end' });
	}

	private fetchMoreMsgs = async () => {
		const { isFetching, noMoreMsgToFetch } = this.state;
		if (isFetching || noMoreMsgToFetch) return;

		this.setState({ isFetching: true });
		const { data: { getConversation: { messages } } } = await this.props.onLoadMore();
		this.setState(({ }, props) => ({
			isFetching: false,
			noMoreMsgToFetch: (!messages || messages.length < props.mgsToFetch) ? true : false
		}));
	}

	private handleScroll = async (event: React.ChangeEvent<HTMLDivElement>) => {
		if (event.target.scrollTop < 300) await this.fetchMoreMsgs();
	}

	private handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
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
			<div className='align--bottom inbox'>
				<div className='overflow' ref={this.contentRef} onScroll={this.handleScroll as any}>
					<div className='groups' ref={this.groupsRef}>
						{isFetching && <div className='align--center fetching'>
							<CircularProgress size='1.5em' color='inherit' />
						</div>}
						<MessageGroups messages={messages} handleMenuClick={this.handleMenuClick} />
						<div className='clear' />
					</div>
				</div>
				<Popper open={!!menuAnchorEl} anchorEl={menuAnchorEl} transition disablePortal>
					{({ TransitionProps }) => (
						<Grow {...TransitionProps} >
							<Paper>
								<ClickAwayListener onClickAway={this.handleMenuClick as any}>
									<MenuList>
										<MenuItem className='menuItem' onClick={this.handleMenuClick}>
											<FormattedMessage id='menuItem.delete' />
										</MenuItem>
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</div>
		);
	}
}

export default Inbox;
