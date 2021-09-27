import React from "react";
import ReactDOM from "react-dom";

import AppProvider from "./components/AppContext";
import GlobalStyles from "./GlobalStyles";
import App from "./components/App";

ReactDOM.render(
	<React.StrictMode>
		<AppProvider>
			<GlobalStyles />
			<App />
		</AppProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
