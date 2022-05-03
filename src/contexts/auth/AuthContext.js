import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { getCurrentSession, signIn, signOut, signUp, confirmSignUp } from "../../services/auth.service";
import authInitialState from "../../reducers/auth/initialState";
import authReducer from "../../reducers/auth/reducer";
import * as authActions from "../../reducers/auth/actions";

const AuthContext = createContext(null);

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, authInitialState);

	useEffect(() => {
		getCurrentSession().then((session) => {
			if (session) dispatch(authActions.authenticate());
		});
	}, [dispatch]);

	const handleSignIn = useCallback(
		async (email, password) => {
			const res = await signIn(email, password);

			if (res.success) dispatch(authActions.authenticate());

			return res;
		},
		[dispatch]
	);

	const handleSignUp = useCallback(async (email, password) => {
		const res = await signUp(email, password);

		return res;
	}, []);

	const handleSignOut = useCallback(async () => {
		const res = await signOut();

		dispatch(authActions.logout());

		return res;
	}, [dispatch]);

	const handleVerifyAccount = useCallback(async (email, code) => {
		const res = await confirmSignUp(email, code);

		return res;
	}, []);

	const value = { handleSignUp, handleSignIn, handleSignOut, handleVerifyAccount, state };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const AuthConsumer = ({ children }) => {
	return <AuthContext.Consumer>{children}</AuthContext.Consumer>;
};
