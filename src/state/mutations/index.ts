import * as app from './App.mutations';
import * as chat from './Chat.mutations';
import * as subscriptions from './Subscriptions.mutations';

export default {
	...app,
	...chat,
	...subscriptions,
};
