import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../contexts/auth/AuthContext";
import { useState } from "react";
import schema from "../validation/sign-up.schema";

const defaultValues = {
	email: "",
	password: "",
	passwordConf: "",
};

export default function useSignUpForm() {
	const [submitResult, setSubmitResult] = useState();
	const { handleSignUp } = useAuth();
	const form = useForm({ defaultValues, resolver: yupResolver(schema) });

	const handler = async (values) => {
		const { email, password } = values;

		const result = await handleSignUp(email, password);

		setSubmitResult(result);
	};

	return { ...form, handler, submitResult };
}
