import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { AppContainer } from "react-hot-loader";

import "./style/index.scss";
import App from "./containers/app.container";
import store from "./stores/app.store";



const rootEl = document.getElementById("root");

const render = (Component:any) => {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<Component/>
			</Provider>
		</AppContainer>,
		rootEl
	)
}

render(App)

// Webpack Hot Module Replacement API
declare let module: {
	hot: any
};

if (module.hot) {
	module.hot.accept("./containers/app.container", () => {
		const NewApp = require("./containers/app.container").default;
		render(NewApp)
	})
}
