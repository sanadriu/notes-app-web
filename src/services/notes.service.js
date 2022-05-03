import { API } from "aws-amplify";
import { onFailure, onSuccess } from "../utils/results";

export async function createNote(note) {
	try {
		const result = await API.post("notes", "/notes", { body: note });

		return onSuccess(result, "Note created successfully");
	} catch (error) {
		return onFailure(error.message);
	}
}

export async function updateNote(note) {
	try {
		const result = await API.patch("notes", `/notes/${note.id}`, { body: note });

		return onSuccess(result, "Note created successfully");
	} catch (error) {
		return onFailure(error.message);
	}
}

export async function deleteNote(id) {
	try {
		const result = await API.del("notes", `/notes/${id}`);

		return onSuccess(result, "Notes fetched successfully");
	} catch (error) {
		return onFailure(error.message);
	}
}

export async function getNotes() {
	try {
		const result = await API.get("notes", "/notes");

		return onSuccess(result, "Notes fetched successfully");
	} catch (error) {
		return onFailure(error.message);
	}
}

export async function getNote(id) {
	try {
		const result = await API.get("notes", `/notes/${id}`);

		return onSuccess(result, "Notes fetched successfully");
	} catch (error) {
		return onFailure(error.message);
	}
}

export async function billUser(details) {
	try {
		const result = await API.post("notes", "/billing", { body: details });

		return onSuccess(result, "User bill created successfully");
	} catch (error) {
		return onFailure(error.message);
	}
}
