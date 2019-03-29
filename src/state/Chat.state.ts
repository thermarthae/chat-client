import { IClientState } from '.';

interface IChat {
	__typename: 'Chat';
	oponentId: string | null;
}

const Chat: IClientState<'chat', IChat> = {
	defaults: {
		chat: {
			__typename: 'Chat',
			oponentId: null,
		}
	},
	resolvers: {
		Mutation: {
			setOponentId: ({ }, { oponentId }, { cache }) => {
				const data = {
					chat: {
						__typename: 'Chat',
						oponentId: oponentId || null
					}
				};
				cache.writeData({ data });
				return data.chat;
			}
		}
	}
};
export default Chat;
