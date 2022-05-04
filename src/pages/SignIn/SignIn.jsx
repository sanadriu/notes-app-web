import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthContext";

import Layout from "../../components/Layout";
import SignInForm from "../../components/SignInForm";

export default function SignIn() {
	const navigate = useNavigate();
	const { state: auth } = useAuth();

	useEffect(() => {
		if (auth.isAuthenticated) navigate("/", { replace: true });
	}, [navigate, auth]);

	const cxMain = "flex flex-col flex-grow justify-center gap-4";

	return (
		<Layout>
			<main className={cxMain}>
				<SignInForm />
			</main>
		</Layout>
	);
}
