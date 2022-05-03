import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../contexts/auth/AuthContext";
import { useState } from "react";
import schema from "../validation/sign-in.schema";

const defaultValues = {
	email: "",
	password: "",
};

export default function useSignInForm() {
	const [submitResult, setSubmitResult] = useState();
	const { handleSignIn } = useAuth();
	const form = useForm({ defaultValues, resolver: yupResolver(schema) });

	const handler = async (values) => {
		const { email, password } = values;

		const result = await handleSignIn(email, password);

		setSubmitResult(result);
	};

	return { ...form, handler, submitResult };
}
