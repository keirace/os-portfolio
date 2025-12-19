import React, { useRef, useEffect, useCallback } from "react";
import { Draggable } from "gsap/all";
import { useDoubleTap } from "use-double-tap";

const FileIcon = ({ label, icon, onDoubleClick, position }) => {
	const iconRef = useRef(null);
	const parentRef = useRef(null);
	const draggableRef = useRef(null);
	const createdRef = useRef(false);

	useEffect(() => {
		// Cache parent element for bounds (read once)
		parentRef.current = iconRef.current?.parentElement;
	}, []);

	const createDraggable = useCallback(() => {
		if (createdRef.current || !iconRef.current || !parentRef.current || !Draggable) return;
		createdRef.current = true;
		const draggable = Draggable.create(iconRef.current, {
			bounds: parentRef.current,
			inertia: true,
			edgeResistance: 0.65,
			zIndexBoost: false,
			onPress() {
				this.target.focus();
			},
			onDragStart() {
				this.startZIndex = this.target.style.zIndex;
				this.target.style.zIndex = 1000;
			},
			onDragEnd() {
				this.target.style.zIndex = this.startZIndex;
			},
			cursor: "default",
		});
		draggableRef.current = draggable && draggable.length ? draggable[0] : null;
	}, []);

	// Create Draggable lazily on first pointerdown / touchstart
	useEffect(() => {
		if (!iconRef.current) return;
		const tempRef = iconRef.current;
		tempRef.addEventListener("pointerdown", createDraggable, { passive: true });
		tempRef.addEventListener("touchstart", createDraggable, { passive: true });
		return () => {
			tempRef.removeEventListener("pointerdown", createDraggable);
			tempRef.removeEventListener("touchstart", createDraggable);
			if (draggableRef.current) {
				draggableRef.current.kill();
			}
		};
	}, [createDraggable]);

	const bind = useDoubleTap(onDoubleClick);

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
			{...bind}
		>
			<div className="icon">{icon ? <img src={icon} alt={label} /> : <span className="text-6xl">📄</span>}</div>
			<p>{label}</p>
		</button>
	);
};

export default React.memo(FileIcon);
