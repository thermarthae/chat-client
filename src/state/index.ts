import ApolloClient from 'apollo-client';
import deepmerge from 'deepmerge';

import chat from './Chat.state';


interface IReturn {
	__typename: string;
	[name: string]: any;
}
export interface IClientState<T extends string = any, K extends IReturn = any> {
	defaults: Record<T, K>;
	resolvers: {
		[key: string]: {
			[field: string]: (rootValue: any, args: any, context: ApolloClient<any>, info: any) => any;
		};
	};
}


const toMerge: IClientState[] = [
	chat
];

export default deepmerge.all<IClientState>(toMerge);
