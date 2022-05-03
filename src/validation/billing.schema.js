import * as yup from "yup";

const schema = yup.object({
	name: yup.string().required("Name is required"),
	storage: yup.number().required("Storage is required").integer("Must be an integer value").min(0, "Must be positive"),
	completed: yup.boolean().isTrue("Card must be complete"),
});

export default schema;
