import { apps, tooltipStyle } from "@constants";
import { useGSAP } from "@gsap/react";
import { useRef, createElement } from "react";
import { gsap } from "gsap";
import { Tooltip } from "react-tooltip";

const Dock = ({ activeMenu, setActiveMenu }) => {
	const dockRef = useRef(null);

	useGSAP(() => {
		const icons = dockRef.current.querySelectorAll(".dock-icon");
		const { left } = dockRef.current.getBoundingClientRect();

		const animateIcons = (mouseX) => {
			icons.forEach((icon) => {
				const iconRect = icon.getBoundingClientRect();
				const iconCenter = iconRect.left + iconRect.width / 2 - left; // Center of the icon
				const distance = Math.abs(mouseX - iconCenter); // Distance from mouse to icon center
				const scale = Math.max(0, 1 - distance / 120); // Scale based on distance (adjust 150 for effect range)

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
	}, []);
	return (
		<section id="dock" ref={dockRef}>
			<div className="dock-container">
				{apps.map(({ id, icon, color, label }) => {
					const isActive = activeMenu === id;
					return (
						<button
							key={id}
							aria-label={label}
							className={`group dock-icon bg-white ${isActive ? "shadow-lg active:bg-muted-foreground" : "shadow-md active:bg-muted-foreground"} `}
							onClick={() => setActiveMenu(id)}
							data-tooltip-id={`tooltip-${id}`}
							data-tooltip-content={label}
							data-tooltip-place="top"
						>
							{createElement(icon, { className: `w-10 h-10 stroke-2 ${color}` })}
							{/* <button
						 	key={id}
						 	aria-label={label}
						 	className={`dock-icon `}
						 	onClick={() => setActiveMenu(id)}
						 	data-tooltip-id={`tooltip-${id}`}
						 	data-tooltip-content={label}
						 	data-tooltip-place="top"
						 > */}
							{/* <img src={Icon} alt={label} className="dock-icon" /> */}
							<Tooltip id={`tooltip-${id}`} border="1px solid var(--border-white)" opacity={0.6} style={tooltipStyle} />
							{isActive && <div className="dock-pointer" />}
						</button>
					);
				})}
			</div>
		</section>
	);
};

export default Dock;
