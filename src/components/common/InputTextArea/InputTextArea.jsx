import classNames from "classnames";
import React from "react";

const InputTextArea = React.forwardRef(({ error, label, name, type, className, ...rest }, ref) => {
	const cxLabel = "block mb-2 text-light text-gray-700";
	const cxAside = "block mt-1 text-sm text-red-600";
	const cxField = classNames(
		"w-full p-[0.25rem] outline-none border rounded shadow resize-none",
		error ? "border-red-300 focus:border-red-400" : "border-gray-300 focus:border-gray-400"
	);

	return (
		<div>
			{label && (
				<label className={cxLabel} htmlFor={name}>
					{label}
				</label>
			)}
			<textarea
				className={cxField}
				id={name}
				name={name}
				{...rest}
				ref={ref}
			/>
			{error && <aside className={cxAside}>{error}</aside>}
		</div>
	);
});

export default InputTextArea;
