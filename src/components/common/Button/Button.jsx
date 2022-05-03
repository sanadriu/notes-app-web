import classNames from "classnames";
import React from "react";

export default function Button({
	size = "md",
	full = false,
	children = "Button",
	disabled,
	...rest
}) {
	const cx = classNames(
		"py-1 border border-gray-400 rounded shadow font-medium text-gray-100 ease-out duration-100",
		!disabled && "bg-gray-600",
		!disabled && "hover:bg-gray-400",
		!disabled && "active:bg-gray-400 active:scale-[0.98]",
		disabled && "bg-gray-100 border-gray-500 text-gray-500 cursor-not-allowed",
		size === "sm" && "min-w-[4rem] px-2 py-1 text-sm",
		size === "md" && "min-w-[6rem] px-3 py-2 text-md",
		size === "lg" && "min-w-[8rem] px-5 py-3 text-lg",
		full && "w-[100%]"
	);

	return (
		<button className={cx} {...rest}>
			{children}
		</button>
	);
}
