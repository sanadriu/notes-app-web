import { useEffect, useState } from "react";
import { getNotes } from "../services/notes.service";

export default function useNotes() {
	const [isLoading, setLoading] = useState(false);
	const [result, setResult] = useState(null);

	useEffect(() => {
		const onLoad = async () => {
			if (!isLoading && !result) {
				setLoading(true);

				const result = await getNotes();

				setResult(result);
				setLoading(false);
			}
		};

		onLoad();
	}, [isLoading, result]);

	return { isLoading, result };
}
