import { apps, tooltipStyle } from "@constants";
import { useGSAP } from "@gsap/react";
import { useRef, createElement, useEffect } from "react";
import { gsap } from "gsap";
import { Tooltip } from "react-tooltip";
import useWindowsStore from "@store/window";

const Dock = () => {
	const { openWindow, setDockIconPosition, windows, activeMenu, focusWindow } = useWindowsStore();
	const dockRef = useRef(null);

	useEffect(() => {
		// Set initial icon positions
		const icons = dockRef.current.querySelectorAll(".dock-icon");
		icons.forEach((icon) => {
			const rect = icon.getBoundingClientRect();
			const position = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
			const id = icon.getAttribute("id");
			setDockIconPosition(id, position);
		});
	}, [setDockIconPosition]);

	useGSAP(() => {
		const icons = dockRef.current.querySelectorAll(".dock-icon");
		const { left } = dockRef.current.getBoundingClientRect();

		const animateIcons = (mouseX) => {
			icons.forEach((icon) => {
				const iconRect = icon.getBoundingClientRect();
				const iconCenter = iconRect.left + iconRect.width / 2 - left; // Center of the icon
				const distance = Math.abs(mouseX - iconCenter); // Distance from mouse to icon center
				const scale = Math.max(0, 1 - distance / 120); // Scale based on distance

				gsap.to(icon, { scale: 1 + 0.25 * scale, y: -20 * scale, duration: 0.3, ease: "power1.out" });
			});
		};

		const handleMouseMove = (e) => {
			const mouseX = e.clientX - left; // Mouse X relative to dock
			animateIcons(mouseX);
		};

		const resetIcons = () => {
			icons.forEach((icon) => {
				gsap.to(icon, { scale: 1, y: 0, duration: 0.3, ease: "power1.out" });
			});
		};

		const tl = gsap.timeline();
		tl.fromTo(dockRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
		tl.fromTo(
			".dock-icon",
			{ scale: 0.5, opacity: 0 },
			{
				scale: 1,
				opacity: 1,
				stagger: 0.1,
				ease: "back.out(1.7)",
			}
		);

		dockRef.current.addEventListener("mousemove", handleMouseMove);
		dockRef.current.addEventListener("mouseleave", resetIcons);
		return () => {
			dockRef.current.removeEventListener("mousemove", handleMouseMove);
			dockRef.current.removeEventListener("mouseleave", resetIcons);
		};
	}, []);

	const toggleWindow = ({ id, canOpen }) => {
		if (!canOpen) return;
		focusWindow(id);
		const window = windows[id];
		if (window.isOpen && !window.isMinimized) {
			return;
		}
		openWindow(id);
	};

	// useGSAP(() => {
	// 	gsap.fromTo(
	// 		"#"+activeMenu,
	// 		{ opacity: 0, y: 50 },
	// 		{ opacity: 1, y: 0, duration: 1, ease: "power3.out" }
	// 	 );
	// }, [windows[activeMenu]]);

	return (
		<section id="dock" ref={dockRef}>
			<div className="dock-container">
				{Object.values(apps).map(({ id, icon, color, label, hidden }) => {
					const isActive = activeMenu === id;
					if (hidden && !windows[id]?.isOpen) return null;
					return typeof icon === "string" ? (
						<button
							key={id}
							id={id}
							aria-label={label}
							className={`w-17 dock-icon ${isActive ? "drop-shadow-lg" : "drop-shadow-md"}`}
							onClick={() => toggleWindow({ id, canOpen: true })}
							data-tooltip-id={`tooltip-${id}`}
							data-tooltip-content={label}
							data-tooltip-place="top"
						>
							<img src={icon} alt={label} className="object-contain aspect-square" />
							<Tooltip id={`tooltip-${id}`} border="1px solid var(--border-white)" opacity={0.6} style={tooltipStyle} />
							{windows[id]?.isOpen && <div className="dock-pointer" />}
						</button>
					) : (
						<button
							key={id}
							id={id}
							aria-label={label}
							className={`group dock-icon bg-white ${isActive ? "shadow-lg" : "shadow-md active:bg-muted-foreground"} `}
							onClick={() => toggleWindow({ id, canOpen: true })}
							data-tooltip-id={`tooltip-${id}`}
							data-tooltip-content={label}
							data-tooltip-place="top"
						>
							{createElement(icon, { className: `w-10 h-10 stroke-2 ${color}` })}

							<Tooltip id={`tooltip-${id}`} border="1px solid var(--border-white)" opacity={0.6} style={tooltipStyle} />
							{windows[id]?.isOpen && <div className="dock-pointer" />}
						</button>
					);
				})}
			</div>
		</section>
	);
};

export default Dock;
