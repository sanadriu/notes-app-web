import { useForm } from "react-hook-form";
import { useState } from "react";

import { createNote } from "../services/notes.service";
import { uploadFile } from "../services/storage.service";
import { onFailure } from "../utils/results";

export default function useCreateNoteForm() {
	const [submitResult, setSubmitResult] = useState();
	const form = useForm();

	const handler = async (values) => {
		try {
			const { content, files } = values;
			const file = files[0];

			const note = { content };

			if (file) {
				const upload = await uploadFile(file);

				if (!upload.success) throw new Error(upload.message);

				note.attachment = upload.result;
			} else {
				note.attachment = null;
			}

			const result = await createNote(note);

			setSubmitResult(result);
		} catch (error) {
			setSubmitResult(onFailure(error.message));
		}
	};

	return { ...form, handler, submitResult };
}
