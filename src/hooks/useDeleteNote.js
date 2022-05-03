import { useState } from "react";
import { deleteNote } from "../services/notes.service";

export default function useDeleteNote(id) {
	const [isLoading, setLoading] = useState(false);
	const [result, setResult] = useState();

	const handler = async () => {
		if (!isLoading && !result) {
			setLoading(true);

			const result = await deleteNote(id);

			setResult(result);
			setLoading(false);
		}
	};

	console.log(isLoading, result);

	return { result, isLoading, handler };
}
