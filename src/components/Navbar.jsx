import { useState, createElement, useEffect, useRef, useMemo } from "react";
import { navMenus, navIcons, modeIcon, submenu, apps } from "@constants";
import { getDateTime } from "@utilities/navbar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useSystemStore from "@store/system";
import useWindowsStore from "@store/window";

const getButtonContent = ({ label }) => {
	return typeof label === "string" ? label : createElement(label, { className: "w-4 h-4" });
};

const Navbar = () => {
	const menuRef = useRef(null);
	const themeRef = useRef(null);
	const [activeNavMenu, setActiveNavMenu] = useState(null);
	const [dropdownXPosition, setDropdownXPosition] = useState(0);
	const [currentDate, setCurrentDate] = useState(() => getDateTime());
	const isDarkMode = useSystemStore((state) => state.isDarkMode);
	const setIsDarkMode = useSystemStore((state) => state.setIsDarkMode);
	const activeMenu = useWindowsStore((state) => state.activeMenu);
	const activeMenuLabel = apps[activeMenu]?.label || "portfolio";
	const menuItems = useMemo(() => navMenus(activeMenuLabel), [activeMenuLabel]);
	const submenuItems = useMemo(() => submenu({ setActiveNavMenu }), [setActiveNavMenu]);

	useEffect(() => {
		// Update current date every minute
		const interval = setInterval(() => {
			setCurrentDate(getDateTime());
		}, 60000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		// Close dropdown when clicking outside
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setActiveNavMenu(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Handle menu button click to toggle dropdown
	const handleMenuClick = (e, id) => {
		// Calculate dropdown position
		const rect = e.currentTarget.getBoundingClientRect();
		setDropdownXPosition(rect.left);

		setActiveNavMenu(id === activeNavMenu ? null : id);
	};

	// Animate theme icon on mode change
	useGSAP(() => {
		gsap.fromTo(themeRef.current, { opacity: 0, color: "var(--color-foreground)" }, { opacity: 1, color: "var(--color-foreground)", duration: 0.8 });
	}, [isDarkMode]);

	useGSAP(() => {
		gsap.fromTo(menuRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" });
	}, []);

	return (
		<nav ref={menuRef}>
			<div className="nav-container">
				{/* Left menu */}
				<div>
					<ul>
						{menuItems.map(({ id, label, alt }) => (
							<li key={id}>
								<button aria-label={alt ?? label} onClick={(e) => handleMenuClick(e, id)} className={`capitalize ${activeMenu === id ? "font-semibold" : "font-normal"}`}>
									{getButtonContent({ label })}
								</button>
							</li>
						))}
					</ul>
				</div>

				{/* Right icons and date */}
				<div>
					<ul>
						{navIcons.map(({ alt, icon }) => (
							<li key={alt}>
								<button aria-label={alt}>{getButtonContent({ label: icon })}</button>
							</li>
						))}
						<li>
							<button aria-label={modeIcon(isDarkMode ? "dark" : "light").alt} onClick={setIsDarkMode} ref={themeRef}>
								{getButtonContent({ label: modeIcon(isDarkMode).icon })}
							</button>
						</li>
					</ul>
					{/* Responsive date and time */}
					<p className="sm:hidden">{currentDate.short}</p>
					<p className="hidden sm:block">{currentDate.long}</p>
				</div>
			</div>
			{/* Dropdown menu */}
			{activeMenu && submenuItems[activeNavMenu] && (
				<div className="dropdown-menu" style={{ left: dropdownXPosition }}>
					<ul>
						{submenuItems[activeNavMenu]?.map((item, index) => {
							if (item.type === "separator") {
								return <hr key={index} />;
							}
							return (
								<li
									key={index}
									onClick={() => {
										item.action();
									}}
								>
									<span>{item.label}</span>
									{item.shortcut && <span className="ml-8 text-xs text-muted-foreground">{item.shortcut}</span>}
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
