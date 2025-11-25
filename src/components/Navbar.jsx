import { useState, createElement, useEffect, useRef } from "react";
import { navMenus, navIcons, modeIcon, submenu } from "@constants";
import { getDateTime } from "@utilities/navbar";

const getButtonContent = ({ label }) => {
	return typeof label === "string" ? label : createElement(label, { className: "w-4 h-4" });
};

const Navbar = ({ mode, setIsDarkMode }) => {
	const menuRef = useRef(null);
	const [activeMenu, setActiveMenu] = useState(null);
	const [dropdownXPosition, setDropdownXPosition] = useState(0);
	const [currentDate, setCurrentDate] = useState(() => getDateTime());

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
				setActiveMenu(null);
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

		setActiveMenu(id === activeMenu ? null : id);
	};

	return (
		<nav ref={menuRef}>
			{/* Left menu */}
			<div>
				<ul>
					{navMenus.map(({ id, label, alt }) => (
						<li key={id}>
							<button aria-label={alt ?? label} onClick={(e) => handleMenuClick(e, id)}>
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
						<button aria-label={modeIcon(mode).alt} onClick={() => setIsDarkMode(!mode)}>
							{getButtonContent({ label: modeIcon(mode).icon })}
						</button>
					</li>
				</ul>
				<p>{currentDate}</p>
			</div>

			{/* Dropdown menu */}
			{activeMenu && (
				<div className="dropdown-menu" style={{ left: dropdownXPosition }}>
					<ul>
						{submenu({ setActiveMenu })[activeMenu]?.map((item, index) => {
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
