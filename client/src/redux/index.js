import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import GlobalStyles from "./GlobalStyles";
import App from "./components/App";

import configureStore from "./store";
const store = configureStore();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<GlobalStyles />
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
