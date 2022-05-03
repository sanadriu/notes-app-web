import classNames from "classnames";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../../contexts/auth/SignUpContext";
import useVerifyAccountForm from "../../hooks/useVerifyAccountForm";

import Button from "../common/Button";
import InputField from "../common/InputField";

export default function VerifyAccountForm() {
	const { credentials } = useSignUp();
	const {
		register,
		handleSubmit,
		handler,
		formState: { isSubmitting, errors },
		submitResult,
		options,
	} = useVerifyAccountForm(credentials);

	const navigate = useNavigate();

	useEffect(() => {
		if (submitResult?.success) navigate("/", { replace: true });
	}, [navigate, submitResult]);

	const cxBlock = "container mx-auto max-w-xl p-8 bg-gray-200 border-2 border-gray-300 shadow-md rounded-sm";
	const cxForm = "flex flex-col gap-4";
	const cxTitle = "text-center text-3xl text-gray-700 my-4";
	const cxInfo = "text-center text-gray-700 bg-gray-100 rounded shadow p-1";
	const cxAside = classNames(
		"text-center p-2 my-4",
		submitResult?.success ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
	);

	return (
		<div className={cxBlock}>
			<h1 className={cxTitle}>Account verification</h1>
			{submitResult?.message && <aside className={cxAside}>{submitResult.message}</aside>}
			<form className={cxForm} onSubmit={handleSubmit(handler)}>
				<span className={cxInfo}>Check your email and enter the verification code</span>
				<InputField
					label="Verification Code"
					placeholder="6 digit code"
					type="password"
					{...register("code", options)}
					maxLength={6}
					error={errors.code?.message}
				/>
				<Button full={true} disabled={isSubmitting}>
					Verify account
				</Button>
			</form>
		</div>
	);
}
