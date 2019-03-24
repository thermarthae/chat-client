import React, { useState } from 'react';
import convStyles from './Conversations.style';

import Header from './Header/Header';
import Searchbox from './Searchbox/Searchbox';
import UserConversations from './UserConversations/UserConversations';

const Conversations = () => {
	const classes = convStyles();
	const [searchStatus, setSearchStatus] = useState(false);

	return (
		<div className={classes.root}>
			<div className={classes.widthFix}>
				<Header />
				<Searchbox searchStatus={searchStatus} setSearchStatus={setSearchStatus} />
				{!searchStatus && <UserConversations />}
			</div>
		</div>
	);
};

export default Conversations;
