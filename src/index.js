import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Amplify } from "aws-amplify";

import config from "./config";
import "./index.css";

Amplify.configure({
	Auth: {
		mandatorySignIn: true,
		region: config.cognito.region,
		userPoolId: config.cognito.userPoolId,
		userPoolWebClientId: config.cognito.userPoolWebClientId,
		identityPoolId: config.cognito.identityPoolId,
	},
	Storage: {
		region: config.s3.region,
		bucket: config.s3.bucket,
		identityPoolId: config.cognito.identityPoolId,
	},
	API: {
		endpoints: [
			{
				name: "notes",
				endpoint: config.apiGateway.url,
				region: config.apiGateway.region,
			},
		],
	},
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);

reportWebVitals();
