const config = {
	s3: {
		region: process.env.REACT_APP_S3_REGION,
		bucket: process.env.REACT_APP_S3_BUCKET,
	},
	apiGateway: {
		region: process.env.REACT_APP_API_GATEWAY_REGION,
		url: process.env.REACT_APP_API_GATEWAY_URL,
	},
	cognito: {
		region: process.env.REACT_APP_COGNITO_REGION,
		userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
		userPoolWebClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID,
		identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
	},
	maxAttachmentSize: 5000000,
	stripeKey: process.env.REACT_APP_STRIPE_KEY,
};

export default config;
