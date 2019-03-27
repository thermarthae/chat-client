import gql from 'graphql-tag';
import { IClientState } from '.';

interface IChat {
	__typename: 'Chat';
	isAsideOpen: boolean;
	oponentId: string | null;
}

const Chat: IClientState<'chat', IChat> = {
	defaults: {
		chat: {
			__typename: 'Chat',
			isAsideOpen: false,
			oponentId: null,
		}
	},
	resolvers: {
		Mutation: {
			toggleAside: ({ }, { }, { cache }) => {
				const query = gql`
					query getAsideStatus {
						chat @client {
							isAsideOpen
						}
					}
				`;
				const { chat: { isAsideOpen } } = cache.readQuery<Record<'chat', IChat>>({ query })!;

				const data = {
					chat: {
						__typename: 'Chat',
						isAsideOpen: !isAsideOpen
					}
				};

				cache.writeData({ data });
				return data.chat;
			},
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
