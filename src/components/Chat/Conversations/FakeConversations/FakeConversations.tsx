import * as React from 'react';
import List from '../List';
import fakeConvStyles from './FakeConversations.style';

const FakeConversation = () => {
	const classes = fakeConvStyles({});
	return (
		<div className={classes.root}>
			<div className={classes.content}>
				<div className={classes.avatar} />
				<div className={classes.avatarClear} />
				<div className={classes.center}>
					<div className={classes.top}>
						<div className={classes.topClear} />
					</div>
					<div className={classes.bottom}>
						<div className={classes.bottomClear} />
					</div>
				</div>
			</div>
		</div>
	);
};

const FakeConversations = () => (
	<List>
		<FakeConversation />
		<FakeConversation />
		<FakeConversation />
	</List>
);

export default FakeConversations;
