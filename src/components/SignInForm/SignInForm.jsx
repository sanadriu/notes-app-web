import classNames from "classnames";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSignInForm from "../../hooks/useSignInForm";

import Button from "../common/Button";
import InputField from "../common/InputField";

export default function SignInForm() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		handler,
		formState: { isSubmitting, errors },
		submitResult,
	} = useSignInForm();

	useEffect(() => {
		if (submitResult?.success) navigate("/", { replace: true });
	}, [navigate, submitResult]);

	const cxBlock = "container mx-auto max-w-xl p-8 bg-gray-200 border-2 border-gray-300 shadow-md rounded-sm";
	const cxForm = "flex flex-col gap-4";
	const cxTitle = "text-center text-3xl text-gray-700 my-4";
	const cxAside = classNames(
		"text-center p-2 my-4",
		submitResult?.success ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
	);

	return (
		<div className={cxBlock}>
			<h1 className={cxTitle}>Sign In</h1>
			{submitResult?.message && <aside className={cxAside}>{submitResult.message}</aside>}
			<form className={cxForm} onSubmit={handleSubmit(handler)}>
				<InputField label="Email" placeholder="Email" {...register("email")} error={errors?.email?.message} />
				<InputField
					label="Password"
					placeholder="Password"
					type="password"
					{...register("password")}
					error={errors?.password?.message}
				/>
				<Button full={true} disabled={isSubmitting}>
					Sign In
				</Button>
			</form>
		</div>
	);
}
