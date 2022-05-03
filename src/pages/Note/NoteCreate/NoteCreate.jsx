import classNames from "classnames";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/auth/AuthContext";
import useCreateNoteForm from "../../../hooks/useCreateNoteForm";

import Button from "../../../components/common/Button";
import Layout from "../../../components/Layout";
import InputTextArea from "../../../components/common/InputTextArea";
import InputField from "../../../components/common/InputField";

export default function NoteCreate() {
	const navigate = useNavigate();
	const { state: auth } = useAuth();
	const {
		register,
		handleSubmit,
		handler,
		formState: { isSubmitting, errors },
		submitResult,
	} = useCreateNoteForm();

	useEffect(() => {
		if (submitResult?.success) navigate("/notes", { replace: true });
	}, [navigate, submitResult]);

	useEffect(() => {
		if (!auth.isAuthenticated) navigate("/", { replace: true });
	}, [navigate, auth]);

	const cxMain = "flex flex-col flex-grow p-4";
	const cxForm = "flex flex-col gap-4";
	const cxTitle = "text-4xl text-gray-700 ";
	const cxRule = "mt-2 mb-4";
	const cxAside = classNames(
		"text-center p-2 my-4",
		submitResult?.success ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
	);

	return (
		<Layout>
			<main className={cxMain}>
				<h1 className={cxTitle}>Create note</h1>
				<hr className={cxRule} />
				{submitResult?.message && <aside className={cxAside}>{submitResult.message}</aside>}
				<form className={cxForm} onSubmit={handleSubmit(handler)}>
					<InputTextArea label="Content" rows={6} {...register("content")} error={errors.content?.message} />
					<InputField
						label="Attachment"
						type="file"
						accept="image/*"
						{...register("files")}
						error={errors.content?.attachment}
					/>
					<Button full={true} disabled={isSubmitting}>
						Create
					</Button>
				</form>
			</main>
		</Layout>
	);
}
