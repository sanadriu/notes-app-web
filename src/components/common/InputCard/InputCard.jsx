import React from "react";
import classNames from "classnames";
import { CardElement } from "@stripe/react-stripe-js";

const InputCard = React.forwardRef(({ error, label, name, type, className, ...rest }, ref) => {
	const cxLabel = "block mb-2 text-light text-gray-700";
	const cxAside = "block mt-1 text-sm text-red-600";
	const cxField = classNames(
		"w-full p-2 outline-none border rounded shadow",
		error ? "border-red-300 focus:border-red-400" : "border-gray-300 focus:border-gray-400"
	);

	return (
		<div>
			{label && (
				<label className={cxLabel} htmlFor={name}>
					{label}
				</label>
			)}
			<CardElement className={cxField} id={name} name={name} {...rest} ref={ref} />
			{error && <aside className={cxAside}>{error}</aside>}
		</div>
	);
});

export default InputCard;
