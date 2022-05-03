import { useId } from "react";
import { Link } from "react-router-dom";
import Note from "../Note/Note";

export default function NoteList({ notes }) {
	const id = useId();
	const cxSection = "border border-gray-200 rounded";
	const cxLink = "p-2 hover:text-gray-500 text-center inline-block min-w-[5rem]";
	const cxList = "p-2 border border-gray-200 text-gray-700 flex flex-col gap-2";

	return (
		<section className={cxSection}>
			<header>
				<Link className={cxLink} to="/notes/create">
					<span className="text-bold">{"\uFF0B"}</span> Create a new note
				</Link>
			</header>
			{notes && notes.length > 0 && (
				<ul className={cxList}>
					{notes.map((note, index) => (
						<li key={`${id}-${index}`}>
							<Note {...note} />
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
