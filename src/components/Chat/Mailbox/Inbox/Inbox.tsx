import React from 'react';
import { Translation } from 'react-i18next';

import MenuList from '@material-ui/core/MenuList';
import Typography from '@material-ui/core/Typography';
import OptionList from '@src/components/OptionList/OptionList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/styles';
import inboxStyles, { TInboxStyles } from './Inbox.style';

import MessageGroups from './MessageGroups/MessageGroups';
import { IMessageMailboxFrag } from '../Mailbox.apollo';
import ScrollDownInfo from './ScrollDownInfo/ScrollDownInfo';

interface IInboxProps extends TInboxStyles {
	messages: IMessageMailboxFrag[];
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
	private bottomHelper = React.createRef<HTMLDivElement>();
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

	public getSnapshotBeforeUpdate(prevProps: IInboxProps, prevState: IInboxState) {
		const prevMsgCount = prevProps.messages.length;
		const nowMsgCount = this.props.messages.length;

		if (prevMsgCount !== nowMsgCount || prevState.isFetching !== this.state.isFetching) {
			const inbox = this.contentRef.current!;
			return inbox.scrollHeight - inbox.scrollTop; //return distance from bottom
		}
		return null;
	}

	public async componentDidUpdate(prevProps: IInboxProps, prevState: IInboxState, snapshot: number) {
		if (snapshot) {
			const inbox = this.contentRef.current!;
			const prevLastMsg = prevProps.messages[prevProps.messages.length - 1];
			const nowLastMsg = this.props.messages[this.props.messages.length - 1];

			if (prevLastMsg._id !== nowLastMsg._id) { //when new msg on bottom
				const distanceFromBottom = inbox.scrollHeight - inbox.scrollTop - inbox.clientHeight;
				if (distanceFromBottom < 150) {
					await this.markConvAsRead();
					if (snapshot === inbox.clientHeight) this.scrollToBottom('smooth'); //when was scrolled bottom
				}
				else //150 < distanceFromBottom
					if (!nowLastMsg.me) this.setState({ scrollDownInfo: true }); //when didnt saw last message
			}
			else inbox.scrollTop = inbox.scrollHeight - snapshot; //when fetched more messages => restore old scroll
		}
	}

	private markConvAsRead = async () => {
		if (this.isMarkingAsRead) return;
		this.isMarkingAsRead = true;
		this.setState({ scrollDownInfo: false });
		await this.props.markConvAsRead();
		this.isMarkingAsRead = false;
	}

	private scrollToBottom = (behavior: 'smooth' | 'auto') => {
		this.bottomHelper.current!.scrollIntoView({ behavior, block: 'end', inline: 'end' });
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

	private handleScroll = async ({ currentTarget }: React.UIEvent<HTMLDivElement>) => {
		const { scrollHeight, scrollTop, clientHeight } = currentTarget;
		if (scrollTop < 300) await this.fetchMoreMsgs();
		else {
			const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
			if (distanceFromBottom < 150 && !this.props.seen) await this.markConvAsRead();
		}
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
				<div className={classes.overflow} ref={this.contentRef} onScroll={this.handleScroll}>
					<div className={classes.groups}>
						{isFetching && (
							<div className={classes.fetching}>
								<CircularProgress size='1.5em' color='inherit' />
							</div>
						)}
						<MessageGroups messages={messages} handleMenuClick={this.handleMenuClick} />
					</div>
					<div ref={this.bottomHelper} />
				</div>
				<ScrollDownInfo open={scrollDownInfo} onClick={this.handleScrollInfoClick} />
				<Popper open={!!menuAnchorEl} anchorEl={menuAnchorEl} transition disablePortal>
					{({ TransitionProps }) => (
						<Grow {...TransitionProps} >
							<Paper>
								<ClickAwayListener onClickAway={this.handleMenuClick as any}>
									<MenuList>
										<OptionList onClick={this.handleMenuClick}>
											<Translation>
												{t => <Typography children={t('optionList.delete')} />}
											</Translation>
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
