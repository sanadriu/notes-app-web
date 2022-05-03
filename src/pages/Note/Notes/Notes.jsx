import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/auth/AuthContext";
import Layout from "../../../components/Layout";
import NoteList from "../../../components/NoteList";
import useNotes from "../../../hooks/useNotes";

export default function Notes() {
	const navigate = useNavigate();
	const { state: auth } = useAuth();
	const { result, isLoading } = useNotes();

	useEffect(() => {
		if (!auth.isAuthenticated) navigate("/", { replace: true });
	}, [navigate, auth]);

	const cxMain = "flex flex-col flex-grow p-4";
	const cxTitle = "text-4xl text-gray-700 ";
	const cxRule = "mt-2 mb-4";
	const cxAside = "text-center p-2 my-4 bg-red-200 text-red-700";

	return (
		<Layout>
			<main className={cxMain}>
				<h1 className={cxTitle}>Note list</h1>
				<hr className={cxRule} />
				{!isLoading && result?.success === false && <aside className={cxAside}>{result.message}</aside>}
				{!isLoading && result?.success === true && <NoteList notes={result.result.data} />}
			</main>
		</Layout>
	);
}
