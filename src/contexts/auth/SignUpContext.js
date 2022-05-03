import { createContext, useContext, useState } from "react";

const SignUpContext = createContext(null);

export const useSignUp = () => {
	return useContext(SignUpContext);
};

export const SignUpProvider = ({ children }) => {
	const [credentials, setCredentials] = useState();

	return <SignUpContext.Provider value={{ credentials, setCredentials }}>{children}</SignUpContext.Provider>;
};

export const SignUpConsumer = ({ children }) => {
	return <SignUpContext.Consumer>{children}</SignUpContext.Consumer>;
};
