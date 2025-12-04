import { apps, tooltipStyle } from "@constants";
import { useGSAP } from "@gsap/react";
import { useRef, createElement, useEffect, Fragment, useMemo } from "react";
import { gsap } from "gsap";
import { Tooltip } from "react-tooltip";
import useWindowsStore from "@store/window";

const Dock = () => {
	const { openWindow, setDockIconPosition, windows, activeMenu, focusWindow } = useWindowsStore();
	const dockRef = useRef(null);
	const previousVisibleIds = useRef(new Set());

	const visibleApps = useMemo(() => {
		return Object.values(apps).filter(({ id, hidden }) => !(hidden && !windows[id]?.isOpen));
	}, [windows]);

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

	// Dock icon magnification effect
	useGSAP(() => {
		if (!dockRef.current) return;

		const icons = dockRef.current.querySelectorAll(".dock-icon");
		const { left } = dockRef.current.getBoundingClientRect();

		if (!icons.length) return;

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

		dockRef.current.addEventListener("mousemove", handleMouseMove);
		dockRef.current.addEventListener("mouseleave", resetIcons);
		return () => {
			dockRef.current.removeEventListener("mousemove", handleMouseMove);
			dockRef.current.removeEventListener("mouseleave", resetIcons);
		};
	}, [visibleApps]);

	// Initial dock fade-in animation
	useGSAP(() => {
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
	}, []);

	useGSAP(() => {
		const currentVisibleIds = new Set(visibleApps.map((app) => app.id));
		const newlyVisibleIds = [...currentVisibleIds].filter((id) => !previousVisibleIds.current.has(id));

		if (newlyVisibleIds.length > 0) {
			const tl = gsap.timeline();
			newlyVisibleIds.forEach((id) => {
				const icon = dockRef.current.querySelector(`#${id}`);
				if (icon) {
					tl.fromTo(icon, { opacity: 0, y: 0 }, { opacity: 1, y: -50, duration: 0.8, ease: "power3.out" });
					tl.to(icon, { y: 0, duration: 0.5, ease: "bounce.Out" }, "-=0.3");
				}
			});
		}

		previousVisibleIds.current = currentVisibleIds;
	}, [visibleApps]);

	const toggleWindow = ({ id, canOpen }) => {
		if (!canOpen) return;
		focusWindow(id);
		const window = windows[id];
		if (window.isOpen && !window.isMinimized) {
			return;
		}
		openWindow(id);
	};

	return (
		<section id="dock" ref={dockRef}>
			<div className="dock-container">
				{visibleApps.map(({ id, icon, color, label }) => {
					const isActive = activeMenu === id;
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
