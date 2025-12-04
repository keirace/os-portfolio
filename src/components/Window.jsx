import useWindowsStore from "@store/window";
import { Draggable } from "gsap/all";
import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import WindowControls from "./WindowControls";

const Window = ({ id, title, children, customizeTitleBar }) => {
	// Store
	const { windows, dragWindow, focusWindow, resizeWindow } = useWindowsStore();
	const window = windows[id];
	const { height, width, isOpen, position, isMinimized, isMaximized, dockIconPosition, zIndex, minWidth, minHeight } = window;

	// Refs
	const windowRef = useRef(null);
	const titleBarRef = useRef(null);
	const draggableRef = useRef(null);

	// State
	const [resizeDir, setResizeDir] = useState(null);

	// Refs for resizing
	const startPos = useRef({ x: 0, y: 0 });
	const startSize = useRef({ width: 0, height: 0, x: 0, y: 0 });

	useLayoutEffect(() => {
		const [instance] = Draggable.create(windowRef.current, {
			trigger: titleBarRef.current,
			bounds: { top: 30, left: -width + 10, right: innerWidth - width - 100, bottom: innerHeight - height - 100 },
			edgeResistance: 0.65,
			inertia: true,
			type: "x,y",
			cursor: "default",
			onRelease() {
				focusWindow(id);
				dragWindow(id, { x: this.x, y: this.y });
			},
		});

		draggableRef.current = instance;

		return () => {
			instance.kill();
		};
	}, []);

	// Open animation
	useGSAP(() => {
		if (isOpen) {
			gsap.fromTo(
				windowRef.current,
				{
					scale: 0,
					opacity: 0,
					x: dockIconPosition.x,
					y: dockIconPosition.y,
					width: 50,
					height: 50,
				},
				{
					opacity: 1,
					scale: 1,
					duration: 1,
					ease: "power3.out",
					x: position.x,
					y: position.y,
					width: width,
					height: height,
				}
			);
		}

		windowRef.current.style.display = isOpen ? "block" : "none";
	}, [isOpen, dockIconPosition]);

	// Minimize animation
	useGSAP(() => {
		if (isMinimized) {
			gsap.to(windowRef.current, { opacity: 0, scale: 0, x: dockIconPosition.x, y: dockIconPosition.y, duration: 1, ease: "power3.out" });
			return;
		}
		gsap.fromTo(
			windowRef.current,
			{ opacity: 0, scale: 0, ease: "power3.out", x: dockIconPosition.x, y: dockIconPosition.y },
			{ opacity: 1, scale: 1, duration: 1, x: window.position.x, y: window.position.y }
		);
	}, [isMinimized, dockIconPosition]);

	// Maximize animation
	useGSAP(() => {
		if (isMaximized) {
			gsap.to(windowRef.current, { top: 0, left: 0, transform: "translate(0, 0)", width: "100%", height: "100%", duration: 0.5, ease: "power3.out" });
			return;
		}
		gsap.to(windowRef.current, { width: window.width, height: window.height, x: position.x, y: position.y, duration: 0.5, ease: "power3.out" });
	}, [isMaximized]);

	// Handle Resize
	const handleResize = (e, direction) => {
		e.preventDefault();
		e.stopPropagation();
		setResizeDir(direction);

		startPos.current = { x: e.clientX, y: e.clientY };

		// Get current GSAP size and position
		startSize.current = { width: windowRef.current.offsetWidth, height: windowRef.current.offsetHeight, x: position.x, y: position.y };

		focusWindow(id);
	};

	useEffect(() => {
		const handleMouseMove = (e) => {
			if (!resizeDir) return;
			const dx = e.clientX - startPos.current.x;
			const dy = e.clientY - startPos.current.y;

			let { newWidth, newHeight, newX, newY } = startSize.current;
			let updatePosition = false;

			if (resizeDir.includes("e")) {
				newWidth = Math.max(minWidth, startSize.current.width + dx);
			}
			if (resizeDir.includes("w")) {
				newWidth = Math.max(minWidth, startSize.current.width - dx);
				if (newWidth !== minWidth) {
					newX = startSize.current.x + dx;
					updatePosition = true;
				}
			}
			if (resizeDir.includes("s")) {
				newHeight = Math.max(minHeight, startSize.current.height + dy);
			}
			if (resizeDir.includes("n")) {
				newHeight = Math.max(minHeight, startSize.current.height - dy);
				if (newHeight !== minHeight) {
					newY = startSize.current.y + dy;
					updatePosition = true;
				}
			}

			gsap.set(windowRef.current, { width: newWidth, height: newHeight, ...(updatePosition && { x: newX, y: newY }) });
			resizeWindow(id, { width: newWidth, height: newHeight });

			// Sync draggable position
			if (updatePosition) {
				draggableRef.current.update();
				dragWindow(id, { x: newX, y: newY });
			}
		};

		const handleMouseUp = () => {
			setResizeDir(null);
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [resizeDir]);

	return (
		<div ref={windowRef} id={id} style={{ visibility: "visible", zIndex: zIndex }} className={`absolute rounded-xl flex flex-col overflow-hidden glassmorphism`}>
			{/* Window Title Bar */}
			<div ref={titleBarRef}>
				{customizeTitleBar ? (
					customizeTitleBar
				) : (
					<div className="title-bar-container relative">
						<WindowControls title={id} />
						<div className="text-center grow text-secondary-foreground -ml-10 text-sm font-medium">{title}</div>
					</div>
				)}
			</div>

			{/* Window Content */}
			<div className="grow overflow-y-auto min-h-0 h-full">{children}</div>

			{/* --- Resize Handles --- */}
			<div className="absolute left-0 top-0 bottom-0 w-2 ew-resize" onMouseDown={(e) => handleResize(e, "w")} />
			<div className="absolute right-0 top-0 bottom-0 w-2 ew-resize" onMouseDown={(e) => handleResize(e, "e")} />
			<div className="absolute left-0 right-0 bottom-0 h-2 ns-resize" onMouseDown={(e) => handleResize(e, "s")} />
			<div className="absolute left-0 right-0 top-0 h-2 ns-resize" onMouseDown={(e) => handleResize(e, "n")} />
			<div className="absolute left-0 top-0 w-2 h-2 nwse-resize" onMouseDown={(e) => handleResize(e, "nw")} />
			<div className="absolute right-0 top-0 w-2 h-2 nesw-resize" onMouseDown={(e) => handleResize(e, "ne")} />
			<div className="absolute left-0 bottom-0 w-2 h-2 nesw-resize" onMouseDown={(e) => handleResize(e, "sw")} />
			<div className="absolute right-0 bottom-0 w-2 h-2 nwse-resize" onMouseDown={(e) => handleResize(e, "se")} />
		</div>
	);
};

export default Window;
