import classNames from "classnames";

import { useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthContext";
import useSignUpForm from "../../hooks/useSignUpForm";

import Button from "../../components/common/Button";
import InputField from "../../components/common/InputField";
import Layout from "../../components/Layout";

export default function SignUp() {
	const navigate = useNavigate();
	const { state: auth } = useAuth();
	const {
		register,
		handleSubmit,
		handler,
		getValues,
		formState: { isSubmitting, errors },
		submitResult,
	} = useSignUpForm();

	useEffect(() => {
		if (submitResult?.success) {
			const params = { account: getValues("email") };
			const search = createSearchParams(params);

			navigate({ pathname: "/verify-account", search: `?${search}` }, { replace: true });
		}
	}, [navigate, getValues, submitResult]);

	useEffect(() => {
		if (auth.isAuthenticated) navigate("/", { replace: true });
	}, [navigate, auth]);

	const cxMain = "flex flex-col flex-grow justify-center gap-4";
	const cxBlock = "container mx-auto max-w-xl p-8 bg-gray-200 border-2 border-gray-300 shadow-md rounded-sm";
	const cxForm = "flex flex-col gap-4";
	const cxTitle = "text-center text-3xl text-gray-700 my-4";
	const cxAside = classNames(
		"text-center p-2 my-4",
		submitResult?.success ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
	);

	return (
		<Layout>
			<main className={cxMain}>
				<div className={cxBlock}>
					<h1 className={cxTitle}>Sign Up</h1>
					{submitResult?.message && <aside className={cxAside}>{submitResult.message}</aside>}
					<form className={cxForm} onSubmit={handleSubmit(handler)}>
						<InputField label="Email" placeholder="Email" {...register("email")} error={errors.email?.message} />
						<InputField
							label="Password"
							placeholder="Password"
							type="password"
							{...register("password")}
							error={errors.password?.message}
						/>
						<InputField
							label="Password Confirmation"
							placeholder="Password confirmation"
							type="password"
							{...register("passwordConf")}
							error={errors.passwordConf?.message}
						/>
						<Button full={true} disabled={isSubmitting}>
							Sign Up
						</Button>
					</form>
				</div>
			</main>
		</Layout>
	);
}