import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { onFailure } from "../utils/results";
import { billUser } from "../services/notes.service";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import schema from "../validation/billing.schema";

const defaultValues = {
	name: "",
	storage: 0,
	completed: false,
};

export default function useBillingForm() {
	const stripe = useStripe();
	const elements = useElements();
	const [submitResult, setSubmitResult] = useState();
	const form = useForm({
		defaultValues,
		resolver: yupResolver(schema),
	});

	const handler = async (values) => {
		if (!stripe || !elements) return;

		try {
			const cardElement = elements.getElement(CardElement);
			const { storage, name } = values;
			const { token } = await stripe.createToken(cardElement, { name });
			const result = await billUser({ storage, source: token.id });

			setSubmitResult(result);
		} catch (error) {
			setSubmitResult(onFailure(error.message));
		}
	};

	return { ...form, handler, submitResult };
}
