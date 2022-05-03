import { Auth } from "aws-amplify";
import { onFailure, onSuccess } from "../utils/results";

export async function getCurrentSession() {
	try {
		return await Auth.currentSession();
	} catch (error) {
		return null;
	}
}

export async function signUp(email, password) {
	try {
		const result = await Auth.signUp({ username: email, password, attributes: { email } });

		return onSuccess(result, "User sign up completed successfully");
	} catch (error) {
		return onFailure(error.message);
	}
}

export async function signIn(email, password) {
	try {
		const result = await Auth.signIn(email, password);

		return onSuccess(result, "User sign in completed successfully");
	} catch (error) {
		return onFailure(error.message);
	}
}

export async function signOut() {
	try {
		const result = await Auth.signOut();

		return onSuccess(result, "User sign out completed successfully");
	} catch (error) {
		return onFailure(error.message);
	}
}

export async function confirmSignUp(email, code) {
	try {
		const result = await Auth.confirmSignUp(email, code, {});

		return onSuccess(result, "Sign up confirmation completed successfully");
	} catch (error) {
		return onFailure(error.message);
	}
}

export async function resendSignUp(email) {
	try {
		const result = await Auth.resendSignUp(email);

		return onSuccess(result, "Code sign up resent successfully");
	} catch (error) {
		return onFailure(error.message);
	}
}
