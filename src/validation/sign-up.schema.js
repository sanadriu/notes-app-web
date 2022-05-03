import * as yup from "yup";
import validator from "validator";

const schema = yup.object({
	email: yup.string().required("Email address is required").email("Email is invalid").max(64),
	password: yup
		.string()
		.required("Password is required")
		.test("validate-password", "Password must be more secure", function (value) {
			return value && validator.isStrongPassword(value);
		}),
	passwordConf: yup
		.string()
		.required("Password confirmation is required")
		.test("validate-confirm-password", "Password doesn't match", function (value) {
			return value === this.parent.password;
		}),
});

export default schema;
