import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/auth/AuthContext";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useVerifyAccountForm() {
	const [searchParams] = useSearchParams();
	const [submitResult, setSubmitResult] = useState();
	const { handleVerifyAccount } = useAuth();
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
		const account = searchParams.get("account");
		const result = await handleVerifyAccount(account, code);

		setSubmitResult(result);
	};

	return { ...form, handler, submitResult, options };
}
