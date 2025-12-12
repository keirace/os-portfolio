import Window from "../components/Window";
import useWindowsStore from "@store/window";
import { WINDOW_IDS } from "@constants";
import { useRef } from "react";

const TextEdit = () => {
	const window = useWindowsStore((state) => state.windows[WINDOW_IDS.TEXTEDIT]);
	const contentRef = useRef(null);
	const data = window.data || "";

	return (
		<div className="h-full bg-background px-2 text-sm">
			<div contentEditable suppressContentEditableWarning ref={contentRef} className="relative w-full h-[90%] grow focus:outline-none whitespace-pre-wrap overflow-y-auto">
				{data}
			</div>
		</div>
	);
};

const TextEditWindow = () => {
	const title = useWindowsStore((state) => state.windows[WINDOW_IDS.TEXTEDIT].title);
	return Window({
		id: WINDOW_IDS.TEXTEDIT,
		title: title || "TextEdit",
		children: <TextEdit />,
	});
};

export default TextEditWindow;
