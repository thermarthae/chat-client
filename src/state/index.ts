import deepmerge from 'deepmerge';

import app from './App.state';
import chat from './Chat.state';

interface IClientState {
	defaults: object;
	resolvers: object;
}

export default deepmerge.all<IClientState>([
	app,
	chat
]);
