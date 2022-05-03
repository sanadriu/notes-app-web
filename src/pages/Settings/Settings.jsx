import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BillingForm from "../../components/BillingForm";

import Layout from "../../components/Layout";
import config from "../../config";
import { useAuth } from "../../contexts/auth/AuthContext";

const stripePromise = loadStripe(config.stripeKey);

export default function Settings() {
	const navigate = useNavigate();
	const { state: auth } = useAuth();

	useEffect(() => {
		if (auth.isAuthenticated) navigate("/", { replace: true });
	}, [navigate, auth]);

	const cxMain = "flex flex-col flex-grow p-4";
	const cxTitle = "text-4xl text-gray-700 ";
	const cxRule = "mt-2 mb-4";

	return (
		<Layout>
			<main className={cxMain}>
				<h1 className={cxTitle}>Settings</h1>
				<hr className={cxRule} />
				<Elements stripe={stripePromise}>
					<BillingForm />
				</Elements>
			</main>
		</Layout>
	);
}
