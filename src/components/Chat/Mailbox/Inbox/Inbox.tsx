import React from 'react';
import { FormattedMessage } from 'react-intl';

import MenuList from '@material-ui/core/MenuList';
import OptionList from 'Components/OptionList/OptionList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/styles';
import inboxStyles, { TInboxStyles } from './Inbox.style';

import MessageGroups from './MessageGroups/MessageGroups';
import { IMessage } from '../Mailbox.apollo';
import ScrollDownInfo from './ScrollDownInfo/ScrollDownInfo';

interface IInboxProps extends TInboxStyles {
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
	scrollDownInfo: boolean;
}

class Inbox extends React.PureComponent<IInboxProps, IInboxState> {
	private groupsRef = React.createRef<HTMLDivElement>();
	private contentRef = React.createRef<HTMLDivElement>();
	private isMarkingAsRead = false;

	public state = {
		menuAnchorEl: undefined,
		isFetching: false,
		noMoreMsgToFetch: false,
		scrollDownInfo: false,
	};

	public async componentDidMount() {
		this.scrollToBottom('auto');
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
		if (prevProps.seen && !this.props.seen) {
			const inbox = this.contentRef.current!;
			const distanceFromBottom = inbox.scrollHeight - inbox.scrollTop - inbox.clientHeight;
			if (distanceFromBottom > 150) this.setState({ scrollDownInfo: true });
			else await this.markConvAsRead();
		}
	}

	private markConvAsRead = async () => {
		if (this.props.seen || this.isMarkingAsRead) return;
		this.isMarkingAsRead = true;
		this.setState({ scrollDownInfo: false });
		await this.props.markConvAsRead();
		this.isMarkingAsRead = false;
	}

	private scrollToBottom = (behavior: 'smooth' | 'auto') => {
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

	private handleScroll = async ({ target }: React.ChangeEvent<HTMLDivElement>, byUser?: boolean) => {
		if (!byUser) return;
		if (target.scrollTop < 300) await this.fetchMoreMsgs();

		const distanceFromBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
		if (distanceFromBottom < 150) await this.markConvAsRead();
	}

	private handleScrollInfoClick = () => {
		this.markConvAsRead();
		this.scrollToBottom('smooth');
	}

	private handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		const target = event.currentTarget;

		this.setState(prevState => ({
			menuAnchorEl: !prevState.menuAnchorEl ? target : undefined
		}));
	}

	public render() {
		const { messages, classes } = this.props;
		const { menuAnchorEl, isFetching, scrollDownInfo } = this.state;

		return (
			<div className={classes.root}>
				<div className={classes.overflow} ref={this.contentRef} onScroll={(event: any) => this.handleScroll(event, true)}>
					<div className={classes.groups} ref={this.groupsRef}>
						{isFetching && <div className={classes.fetching}>
							<CircularProgress size='1.5em' color='inherit' />
						</div>}
						<MessageGroups messages={messages} handleMenuClick={this.handleMenuClick} />
						<div className={classes.clear} />
					</div>
				</div>
				<ScrollDownInfo open={scrollDownInfo} onClick={this.handleScrollInfoClick} />
				<Popper open={!!menuAnchorEl} anchorEl={menuAnchorEl} transition disablePortal>
					{({ TransitionProps }) => (
						<Grow {...TransitionProps} >
							<Paper>
								<ClickAwayListener onClickAway={this.handleMenuClick as any}>
									<MenuList>
										<OptionList onClick={this.handleMenuClick}>
											<FormattedMessage id='optionList.delete' />
										</OptionList>
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

export default withStyles(inboxStyles)(Inbox);
