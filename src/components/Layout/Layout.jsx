import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthContext";

export default function Layout({ children }) {
	const {
		state: { isAuthenticated },
		handleSignOut,
	} = useAuth();
	const cxLayout = "flex flex-col gap-4 mx-auto min-h-screen p-8";
	const cxHeader =
		"flex justify-center items-center p-4 gap-6 bg-gray-200 border-2 border-gray-300 text-gray-700 shadow-md rounded-sm";
	const cxTitle = "m-0 p-0 hidden sm:block text-2xl";
	const cxNavLinks = "flex mt-1 flex-grow";
	const cxAuthLinks = "flex";

	const cxLink = "hover:text-gray-500 text-center inline-block min-w-[5rem]";

	const cxActiveLink = ({ isActive }) => classNames(isActive && "font-bold", cxLink);

	return (
		<div className={cxLayout}>
			<header className={cxHeader}>
				<h1 className={cxTitle}>Notes App</h1>
				<ul className={cxNavLinks}>
					<li>
						<NavLink to="/" className={cxActiveLink}>
							Home
						</NavLink>
					</li>
					{isAuthenticated && (
						<li>
							<NavLink to="/notes" className={cxActiveLink}>
								Notes
							</NavLink>
						</li>
					)}
					{isAuthenticated && (
						<li>
							<NavLink to="/notes/create" className={cxActiveLink}>
								Create
							</NavLink>
						</li>
					)}
				</ul>
				<ul className={cxAuthLinks}>
					{!isAuthenticated && (
						<li>
							<NavLink to="/sign-up" className={cxActiveLink}>
								Sign up
							</NavLink>
						</li>
					)}
					{!isAuthenticated && (
						<li>
							<NavLink to="/sign-in" className={cxActiveLink}>
								Sign in
							</NavLink>
						</li>
					)}
					{isAuthenticated && (
						<li>
							<NavLink to="/settings" className={cxActiveLink}>
								Settings
							</NavLink>
						</li>
					)}
					{isAuthenticated && (
						<li>
							<button className={cxLink} onClick={() => handleSignOut()}>
								Sign out
							</button>
						</li>
					)}
				</ul>
			</header>
			{children}
		</div>
	);
}
