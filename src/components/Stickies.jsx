import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/all";
import { useRef } from "react";
import { PanelTop, Square, TriangleRight } from "lucide-react";

const Stickies = ({ className, children }) => {
	const stickiesRef = useRef(null);
	const stickiesBarRef = useRef(null);

	useGSAP(() => {
		if (!Draggable || !stickiesRef.current) return;

		const [stickiesDraggable] = Draggable.create(stickiesRef.current, {
			trigger: stickiesBarRef.current,
			bounds: "main",
			inertia: true,
			edgeResistance: 0.65,
			type: "x,y",
			zIndexBoost: false,
			cursor: "default",
		});
		return () => {
			stickiesDraggable?.kill();
		};
	});

	return (
		<div ref={stickiesRef} id="stickies" className={className}>
			<div ref={stickiesBarRef} id="stickies-bar" className="group">
				<Square className="mr-2 hidden group-hover:block" />
				<div className="hidden group-hover:flex">
					<TriangleRight />
					<PanelTop className="ml-2" />
				</div>
			</div>

			<div contentEditable suppressContentEditableWarning className="textarea">
				{children}
			</div>
		</div>
	);
};

export default Stickies;
