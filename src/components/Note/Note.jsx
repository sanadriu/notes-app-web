import { Link } from "react-router-dom";

export default function Note({ ...note }) {
	const cxArticle = "p-2 border border-gray-200 text-gray-700 rounded flex justify-between";
	const cxContent = "overflow-hidden whitespace-nowrap text-ellipsis font-semibold font-sans";
	const cxInfo = "text-sm text-light";
	const cxLinks = "flex gap-2";
	const cxLink =
		"text-2xl text-center block rounded w-8 h-8 border border-gray-300 bg-gray-200 hover:text-gray-500 hover:bg-gray-100";

	return (
		<article className={cxArticle}>
			<div>
				<h2 className={cxContent}>{note.content.trim().split("\n")[0]}</h2>
				<span className={cxInfo}>{`Created: ${new Date(note.createdAt).toLocaleString()}`}</span>
			</div>
			<div className={cxLinks}>
				<Link className={cxLink} to={`/notes/edit/${note.noteId}`}>
					&#9998;
				</Link>
			</div>
		</article>
	);
}
