export function onSuccess(result, message = "Successful") {
	return { result, success: true, message };
}

export function onFailure(message = "Something went wrong") {
	return { result: null, success: false, message };
}
