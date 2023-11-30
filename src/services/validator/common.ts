import * as Yup from "yup";
import { EMAIL_REGEX } from "../../constants/regex";

const email = Yup.string()
	.required("Please enter your email.")
	.matches(EMAIL_REGEX, "Please enter a valid email address.");

const password = Yup.string()
	.trim()
	.required("Please enter your password.")
	.min(6, "Password must be at least 6 characters");

export { email, password };
