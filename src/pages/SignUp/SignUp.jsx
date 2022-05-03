import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthContext";

import Layout from "../../components/Layout";
import { SignUpConsumer, SignUpProvider } from "../../contexts/auth/SignUpContext";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import VerifyAccountForm from "../../components/VerifyAccountForm";

export default function SignUp() {
	const navigate = useNavigate();
	const { state: auth } = useAuth();

	useEffect(() => {
		if (auth.isAuthenticated) navigate("/", { replace: true });
	}, [navigate, auth]);

	const cxMain = "flex flex-col flex-grow justify-center gap-4";

	return (
		<Layout>
			<main className={cxMain}>
				<SignUpProvider>
					<SignUpConsumer>
						{({ credentials }) => {
							return credentials ? <VerifyAccountForm /> : <SignUpForm />;
						}}
					</SignUpConsumer>
				</SignUpProvider>
			</main>
		</Layout>
	);
}
