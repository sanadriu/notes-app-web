import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/auth/AuthContext";
import Home from "./pages/Home";
import NoteCreate from "./pages/Note/NoteCreate";
import NoteEdit from "./pages/Note/NoteEdit";
import Notes from "./pages/Note/Notes";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SignUpConfirm from "./pages/SignUpConfirm";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route index element={<Home />} />
					<Route path="sign-in" element={<SignIn />} />
					<Route path="sign-up" element={<SignUp />} />
					<Route path="verify-account" element={<SignUpConfirm />} />
					<Route path="notes">
						<Route index element={<Notes />} />
						<Route path="create" element={<NoteCreate />} />
						<Route path="edit/:id" element={<NoteEdit />} />
					</Route>
					<Route path="settings" element={<Settings />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
