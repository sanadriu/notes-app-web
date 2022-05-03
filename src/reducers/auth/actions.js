import actionTypes from "./actionTypes";

function authenticate() {
	return { type: actionTypes.authenticate };
}

function logout() {
	return { type: actionTypes.logout };
}

export { authenticate, logout };
