import { useEffect, useState } from "react";
import { getNote } from "../services/notes.service";
import { getFileUrl } from "../services/storage.service";

export default function useNote(id) {
	const [isLoading, setLoading] = useState(false);
	const [result, setResult] = useState(null);

	useEffect(() => {
		const onLoad = async () => {
			if (!isLoading && !result) {
				setLoading(true);

				const result = await getNote(id);

				if (result?.result?.data.attachment) {
					result.result.data.attachmentUrl = (await getFileUrl(result.result.data.attachment)).result;
				}

				setResult(result);
				setLoading(false);
			}
		};

		onLoad();
	}, [isLoading, result, id]);

	return { isLoading, result };
}
