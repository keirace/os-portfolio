import useWindowsStore from "@store/window";
import { Draggable } from "gsap/all";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import WindowControls from "./WindowControls";

const Window = ({ title, children }) => {
	const { windows, dragWindow } = useWindowsStore();
	const window = windows[title];
	const { height, width, isOpen, position, isMinimized, isMaximized, dockIconPosition } = window || {};
	const draggableRef = useRef(null);
	const titleBarRef = useRef(null);

	useGSAP(() => {
		const [instance] = Draggable.create(draggableRef.current, {
			trigger: titleBarRef.current,
			bounds: { top: 30, left: -width + 10, right: window.innerWidth - width - 100, bottom: window.innerHeight - height - 100 },
			edgeResistance: 0.65,
			inertia: true,
			type: "x,y",
			cursor: "default",
			onPress() {},
			onRelease() {
				draggableRef.current.style.zIndex = this.startZIndex; // Reset z-index after drag
				dragWindow(title, { x: this.x, y: this.y });
			},
		});
		return () => {
			instance.kill();
		};
	}, []);

	// Open animation
	useGSAP(() => {
		if (isOpen) {
			gsap.fromTo(draggableRef.current, { opacity: 0, scale: 0, x: dockIconPosition.x, y: dockIconPosition.y }, { opacity: 1, scale: 1, duration: 1, ease: "power3.out", x: 100, y: 100 });
		}

		draggableRef.current.style.display = isOpen ? "block" : "none";
	}, [isOpen]);

	// Minimize animation
	useGSAP(() => {
		if (isMinimized) {
			gsap.to(draggableRef.current, { opacity: 0, scale: 0, x: dockIconPosition.x, y: dockIconPosition.y, duration: 1, ease: "power3.out" });
			return;
		}
		gsap.fromTo(
			draggableRef.current,
			{ opacity: 0, scale: 0, ease: "power3.out", x: dockIconPosition.x, y: dockIconPosition.y },
			{ opacity: 1, scale: 1, duration: 1, x: window.position.x, y: window.position.y }
		);
	}, [isMinimized, height, width]);

	// Maximize animation
	useGSAP(() => {
		if (isMaximized) {
			gsap.to(draggableRef.current, { top: 0, left: 0, width: "100%", height: "100%", x: 0, y: 0, duration: 0.5, ease: "power3.out" });
			return;
		}
		gsap.to(draggableRef.current, { width: window.width, height: window.height, x: position.x, y: position.y, duration: 0.5, ease: "power3.out" });
	}, [isMaximized]);

	return (
		<div ref={draggableRef} id={title} className={`absolute bg-primary-foreground rounded-xl flex flex-col overflow-hidden glassmorphism`}>
			{/* Window Title Bar */}
			<div ref={titleBarRef} className="h-8 border-b border-border flex items-center justify-between px-4 shrink-0">
				<WindowControls title={title} />
				<div className="absolute left-1/2 -translate-x-1/2 text-secondary-foreground">{title}</div>
			</div>

			{/* Window Content */}
			<div className="flex-1 overflow-y-auto">{children}</div>
		</div>
	);
};

export default Window;
