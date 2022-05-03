import classNames from "classnames";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/auth/AuthContext";
import useEditNoteForm from "../../../hooks/useEditNoteForm";

import Button from "../../../components/common/Button";
import Layout from "../../../components/Layout";
import InputTextArea from "../../../components/common/InputTextArea";
import InputField from "../../../components/common/InputField";
import useNote from "../../../hooks/useNote";
import useDeleteNote from "../../../hooks/useDeleteNote";

export default function NoteEdit() {
	const navigate = useNavigate();
	const { id } = useParams();
	const { state: auth } = useAuth();
	const { result: resultDel, isLoading: isLoadingDel, handler: handlerDel } = useDeleteNote(id);
	const { result: resultGet, isLoading: isLoadingGet } = useNote(id);
	const {
		register,
		reset,
		handleSubmit,
		handler,
		formState: { isSubmitting, errors },
		submitResult,
	} = useEditNoteForm(id);

	useEffect(() => {
		if (submitResult?.success) navigate("/notes", { replace: true });
	}, [navigate, submitResult]);

	useEffect(() => {
		if (resultDel?.success) navigate("/notes", { replace: true });
	}, [navigate, resultDel]);

	useEffect(() => {
		if (!auth.isAuthenticated) navigate("/", { replace: true });
	}, [navigate, auth]);

	useEffect(() => {
		if (resultGet?.success) {
			const { content } = resultGet.result.data;

			reset({ content });
		}
	}, [reset, resultGet]);

	const note = resultGet?.result.data || {};

	const handleDelete = () => {
		const confirmation = window.confirm("Are you sure you want to delete this note?");

		console.log(confirmation);

		if (confirmation) handlerDel();
	};

	const cxMain = "flex flex-col flex-grow p-4";
	const cxForm = "flex flex-col gap-4";
	const cxTitle = "text-4xl text-gray-700 ";
	const cxRule = "mt-2 mb-4";
	const cxAttachment = "text-blue-700 hover:text-blue-500 font-semibold";
	const cxAside = classNames(
		"text-center p-2 my-4",
		submitResult?.success ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
	);

	return (
		<Layout>
			<main className={cxMain}>
				<h1 className={cxTitle}>Edit note</h1>
				<hr className={cxRule} />
				{!isLoadingGet && resultGet?.success === false && <aside className={cxAside}>{resultGet.message}</aside>}
				{!isLoadingGet && resultGet?.success === true && (
					<>
						{submitResult?.message && <aside className={cxAside}>{submitResult.message}</aside>}
						{resultDel?.message && <aside className={cxAside}>{resultDel.message}</aside>}
						<form className={cxForm} onSubmit={handleSubmit(handler)}>
							<InputTextArea label="Content" rows={6} {...register("content")} error={errors.content?.message} />
							<InputField
								label="Attachment"
								type="file"
								accept="image/*"
								{...register("files")}
								error={errors.content?.attachment}
							/>
							{note.attachment && (
								<a className={cxAttachment} target="_blank" rel="noopener noreferrer" href={note.attachmentUrl}>
									{note.attachment}
								</a>
							)}
							<Button full={true} type="submit" disabled={isSubmitting || isLoadingDel}>
								Save
							</Button>
							<Button full={true} type="button" disabled={isSubmitting || isLoadingDel} onClick={handleDelete}>
								Delete
							</Button>
						</form>
					</>
				)}
			</main>
		</Layout>
	);
}
