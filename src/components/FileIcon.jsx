import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/all";
import { useRef } from "react";

const FileIcon = ({ label, icon, onDoubleClick, position }) => {
	const iconRef = useRef(null);
	
	useGSAP(() => {
		if (!Draggable) return;
		const [draggable] = Draggable.create(iconRef.current, {
			bounds: "main",
			inertia: true,
			edgeResistance: 0.65,
			type: "x,y",
			zIndexBoost: false,
			cursor: "default",
			liveSnap: {
				points: (endValue) => {
					const step = 150;
					return {
						x: Math.round(endValue.x / step) * step,
						y: Math.round(endValue.y / step) * step,
					};
				},
			},
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
			className={`draggable icons absolute group ${position}`}
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
