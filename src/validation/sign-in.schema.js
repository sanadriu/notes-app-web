import * as yup from "yup";

const schema = yup.object({
	email: yup.string().required("Email address is required").email("Email is invalid").max(64),
	password: yup.string().required("Password is required"),
});

export default schema;
