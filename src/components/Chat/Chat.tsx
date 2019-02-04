import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

import chatStyles, { TChatStyles } from './Chat.style';

import Conversations from './Conversations/Conversations';
import Mailbox from './Mailbox/Mailbox';
import { Mutation } from 'react-apollo';
import { SET_OPONENT_ID } from './Chat.apollo';

interface IChatProps extends TChatStyles, RouteComponentProps<{ oponentId?: string }> { }

class Chat extends React.Component<IChatProps> {
	public shouldComponentUpdate(nextProps: IChatProps) {
		if (JSON.stringify(this.props.match) !== JSON.stringify(nextProps.match)) return true;
		return false;
	}

	public render() {
		const oponentId = this.props.match.params.oponentId;
		const { classes } = this.props;

		return (
			<Mutation mutation={SET_OPONENT_ID} ignoreResults>
				{setOponentId => {
					setOponentId({ variables: { id: oponentId } });
					return (
						<div className={classes.root}>
							<Conversations />
							<Mailbox oponentId={oponentId} />
						</div>
					);
				}}
			</Mutation>
		);
	}
}
export default withStyles(chatStyles)(Chat);
