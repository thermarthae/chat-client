import deepmerge from 'deepmerge';

import app from './App.state';
import chat from './Chat.state';
import subscriptions from './Subscriptions.state';

interface IClientState {
	defaults: object;
	resolvers: object;
}

export default deepmerge.all<IClientState>([app, chat, subscriptions]);
