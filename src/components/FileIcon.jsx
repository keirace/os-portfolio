import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/all";
import { useLayoutEffect, useRef } from "react";

const FileIcon = ({ label, icon, onDoubleClick, position,  }) => {
	const iconRef = useRef(null);
	const parentRef = useRef(null);

	useLayoutEffect(() => {
		parentRef.current = iconRef.current?.parentElement;
	}, []);

	useGSAP(() => {
		if (!Draggable) return;
		const draggable = Draggable.create(iconRef.current, {
			bounds: parentRef.current,
			inertia: true,
			edgeResistance: 0.65,
			zIndexBoost: false,
			onPress() {
				this.target.focus();
			},
			onDragStart: function () {
				this.startZIndex = this.target.style.zIndex;
				this.target.style.zIndex = 1000;
			},
			onDragEnd: function () {
				this.target.style.zIndex = this.startZIndex;
				// if (setPosition) {
				// 	const parentRect = parentRef.current.getBoundingClientRect();
				// 	const iconRect = this.target.getBoundingClientRect();
				// 	const top = iconRect.top - parentRect.top;
				// 	const left = iconRect.left - parentRect.left;
				// 	const position = `top-${Math.round(top)} left-${Math.round(left)}`;
				// 	setPosition(label, position);
				// }
			},
			cursor: "default",
		});
		return () => {
			if (draggable && draggable.length > 0) {
				draggable[0].kill();
			}
		};
	}, [parentRef.current]);

	return (
		<button
			aria-label={label}
			ref={iconRef}
			className={`icon-container absolute group ${position}`}
			tabIndex={0}
			onDoubleClick={onDoubleClick}
			onKeyDown={(e) => {
				if (e.key === "Enter") onDoubleClick();
			}}
		>
			<div className="icon">{icon ? <img src={icon} alt={label} /> : <span className="text-6xl">📄</span>}</div>
			<p>{label}</p>
		</button>
	);
};

export default FileIcon;
