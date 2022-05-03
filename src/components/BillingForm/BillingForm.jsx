import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthContext";
import InputField from "../common/InputField";
import Button from "../common/Button";
import useBillingForm from "../../hooks/useBillingForm";
import classNames from "classnames";
import InputCard from "../common/InputCard";

export default function BillingForm() {
	const navigate = useNavigate();
	const { state: auth } = useAuth();
	const {
		handler,
		handleSubmit,
		submitResult,
		register,
		setValue,
		formState: { isSubmitting, errors },
	} = useBillingForm();

	useEffect(() => {
		if (submitResult?.success) navigate("/notes", { replace: true });
	}, [navigate, submitResult]);

	useEffect(() => {
		if (!auth.isAuthenticated) navigate("/", { replace: true });
	}, [navigate, auth]);

	const cxForm = "flex flex-col gap-4";
	const cxAside = classNames(
		"text-center p-2 my-4",
		submitResult?.success ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
	);

	return (
		<>
			{submitResult?.message && <aside className={cxAside}>{submitResult.message}</aside>}
			<form className={cxForm} onSubmit={handleSubmit(handler)}>
				<InputField
					label="Storage"
					type="number"
					placeholder="Number of notes to store"
					{...register("storage")}
					error={errors.storage?.message}
				/>
				<InputField
					label="Cardholder name"
					placeholder="Name on the card"
					{...register("name")}
					error={errors.name?.message}
				/>
				<InputCard
					label="Card details"
					onChange={(e) => setValue("completed", e.complete)}
					error={errors.completed?.message}
				/>
				<Button type="submit" disabled={isSubmitting}>
					Purchase
				</Button>
			</form>
		</>
	);
}
