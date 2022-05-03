import { Storage } from "aws-amplify";
import { onFailure, onSuccess } from "../utils/results";
import config from "../config";

export async function uploadFile(file) {
	try {
		if (file.size > config.maxAttachmentSize) {
			return onFailure(`File size is bigger than ${config.maxAttachmentSize / 1000} kb.`);
		}

		const key = `${Date.now()}-${file.name}`;

		const uploadedFile = await Storage.vault.put(key, file, { contentType: file.type });

		return onSuccess(uploadedFile.key, "File uploaded successfully");
	} catch (error) {
		return onFailure(error.message);
	}
}

export async function getFileUrl(key) {
	try {
		const fileUrl = await Storage.vault.get(key);

		return onSuccess(fileUrl, "File uploaded successfully");
	} catch (error) {
		return onFailure(error.message);
	}
}
