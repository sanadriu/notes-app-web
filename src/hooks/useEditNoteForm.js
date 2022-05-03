import { useForm } from "react-hook-form";
import { useState } from "react";

import { updateNote } from "../services/notes.service";
import { uploadFile } from "../services/storage.service";
import { onFailure } from "../utils/results";

export default function useCreateNoteForm(id) {
	const [submitResult, setSubmitResult] = useState();
	const form = useForm();

	const handler = async (values) => {
		try {
			const { content, attachment, files } = values;
			const file = files[0];

			const note = { id, content };

			if (file) {
				const upload = await uploadFile(file);

				if (!upload.success) throw new Error(upload.message);

				note.attachment = upload.result;
			} else {
				note.attachment = attachment;
			}

			const result = await updateNote(note);

			setSubmitResult(result);
		} catch (error) {
			setSubmitResult(onFailure(error.message));
		}
	};

	return { ...form, handler, submitResult };
}
