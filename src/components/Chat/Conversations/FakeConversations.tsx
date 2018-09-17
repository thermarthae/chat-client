import * as React from 'react';

const FakeConversation = () => {
	return (
		<div className='fake'>
			<div className='content'>
				<div className='avatar'></div>
				<div className='clear'></div>
				<div className='center'>
					<div className='top'>
						<div className='clear'></div>
					</div>
					<div className='bottom'>
						<div className='clear'></div>
					</div>
				</div>
			</div>
		</div>

	);
};

const FakeConversations = () => {
	return (
		<div className='list'>
			<FakeConversation />
			<FakeConversation />
			<FakeConversation />
			<div className='background' />
		</div>
	);
};

export default FakeConversations;
