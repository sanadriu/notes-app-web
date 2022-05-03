import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import BillingForm from "../../components/BillingForm";

import Layout from "../../components/Layout";
import config from "../../config";

const stripePromise = loadStripe(config.stripeKey);

export default function Settings() {
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
