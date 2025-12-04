import Window from "./Window";
import useWindowsStore from "@store/window";
import { WINDOW_IDS } from "@constants";
import { useRef} from "react";

const TextEdit = () => {
	const window = useWindowsStore((state) => state.windows[WINDOW_IDS.TEXTEDIT]);
	const contentRef = useRef(null);
	const data = window.data || "";

	return (
		<div className="p-8 min-h-0 mb-8 h-full bg-primary-foreground relative">
		<div ref={contentRef} contentEditable suppressContentEditableWarning={true} className="textarea" style={{ overflowAnchor: "none" }}>
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
