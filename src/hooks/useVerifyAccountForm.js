import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/auth/AuthContext";
import { useState } from "react";

export default function useVerifyAccountForm(credentials) {
	const [submitResult, setSubmitResult] = useState();
	const { handleVerifyAccount, handleSignIn } = useAuth();
	const form = useForm();

	const options = {
		required: {
			value: true,
			message: "Verification code is mandatory",
		},
		maxLength: {
			value: 6,
			message: "Code must have 6 digit",
		},
		minLength: {
			value: 6,
			message: "Code must have 6 digit",
		},
		pattern: {
			value: /^\d{6}$/,
			message: "Code characters must be digits",
		},
	};

	const handler = async (values) => {
		const { code } = values;
		const { email, password } = credentials;

		const resVerify = await handleVerifyAccount(email, code);

		if (!resVerify.success) {
			return setSubmitResult(resVerify);
		}

		const resSignIn = await handleSignIn(email, password);

		setSubmitResult(resSignIn);
	};

	return { ...form, handler, submitResult, options };
}
