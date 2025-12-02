import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/all";
import { useRef } from "react";

const FileIcon = ({ label, icon, onDoubleClick, position }) => {
	const iconRef = useRef(null);
	
	useGSAP(() => {
		if (!Draggable) return;
		if (!iconRef.current || !iconRef.current.parentElement) return;
		const parentBounds = iconRef.current.parentElement.getBoundingClientRect();
		const [draggable] = Draggable.create(iconRef.current, {
			bounds: {
				top: 20,
				left: 0,
				width: parentBounds.width,
				height: parentBounds.height - 20,
			},
			inertia: true,
			edgeResistance: 0.65,
			type: "x,y",
			zIndexBoost: false,
			cursor: "default",
			onPress() {
				this.target.focus();
			},
		});

		return () => {
			draggable?.kill();
		};
	});

	return (
		<div
			ref={iconRef}
			className={`icons absolute group ${position}`}
			tabIndex={0}
			onDoubleClick={onDoubleClick}
			onKeyDown={(e) => {
				if (e.key === "Enter") onDoubleClick();
			}}
		>
			<div className="icon">{icon ? <img src={icon} alt={label} /> : <span className="text-6xl">📄</span>}</div>
			<p>{label}</p>
		</div>
	);
};

export default FileIcon;
