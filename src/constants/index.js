import { Apple, Wifi, Battery, Volume2, Moon, Sun } from "lucide-react";

export const navMenus = (activeMenu) => [
	{ id: "apple", label: Apple, alt: "Apple Menu" },
	{ id: activeMenu, label: activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1) },
	{ id: "file", label: "File" },
	{ id: "edit", label: "Edit" },
	{ id: "view", label: "View" },
	{ id: "window", label: "Window" },
	{ id: "help", label: "Help" },
];

export const submenu = ({ setActiveNavMenu }) => ({
	apple: [
		{
			label: "About This App",
			action: () => {
				alert("Pinos - A macOS-like web application");
				setActiveNavMenu(null);
			},
		},
		{ type: "separator" },
		{ label: "System Preferences...", action: () => alert("System Preferences") },
		{ type: "separator" },
		{ label: "Sleep", action: () => alert("Sleep") },
		{ label: "Restart...", action: () => alert("Restart") },
		{ label: "Shut Down...", action: () => alert("Shut Down") },
		{ type: "separator" },
		{
			label: "Log Out User...",
			action: () => {
				alert("Log Out");
				setActiveNavMenu(null);
			},
		},
	],
	file: [
		{ label: "New Window", shortcut: "⌘N", action: () => alert("New window") },
		{
			label: "Close Window",
			shortcut: "⌘W",
			action: () => {
				setActiveNavMenu(null);
				window.close();
			},
		},
		{ type: "separator" },
		{
			label: "Print",
			shortcut: "⌘P",
			action: () => {
				window.print();
				setActiveNavMenu(null);
			},
		},
	],
	edit: [
		{ label: "Undo", shortcut: "⌘Z", action: () => {} },
		{ label: "Redo", shortcut: "⌘⇧Z", action: () => {} },
		{ type: "separator" },
		{ label: "Copy", shortcut: "⌘C", action: () => {} },
		{ label: "Paste", shortcut: "⌘V", action: () => {} },
	],
	view: [
		{ label: "Zoom In", shortcut: "⌘+", action: () => {} },
		{ label: "Zoom Out", shortcut: "⌘-", action: () => {} },
		{
			label: "Enter Full Screen",
			shortcut: "⌃⌘F",
			action: () => {
				if (!document.fullscreenElement) {
					document.documentElement.requestFullscreen();
				} else {
					document.exitFullscreen();
				}
				setActiveNavMenu(null);
			},
		},
	],
	window: [
		{
			label: "Show All Windows",
			shortcut: "F3",
			action: () => {
				setActiveNavMenu(null);
			},
		},
		{
			label: "Minimize All",
			shortcut: "⌘M",
			action: () => {
				setActiveNavMenu(null);
			},
		},
	],
});

export const navIcons = [
	{ alt: "Wifi", icon: Wifi },
	{ alt: "Battery", icon: Battery },
	{ alt: "Volume", icon: Volume2 },
];

export const modeIcon = (isDarkMode) => ({ alt: isDarkMode ? "Toggle Light Mode" : "Toggle Dark Mode", icon: isDarkMode ? Sun : Moon });

// Apps for Dock
import { User, FolderOpen, Award, Mail } from "lucide-react";
export const apps = [
	{ id: "about", icon: User, color: "text-orange-400", label: "About Me" },
	{ id: "projects", icon: FolderOpen, color: "text-blue-400", label: "Projects" },
	{ id: "skills", icon: Award, color: "text-pink-400", label: "Skills" },
	{ id: "contact", icon: Mail, color: "text-purple-400", label: "Contact" },
];

export const tooltipStyle = {
	padding: "0.25rem 0.5rem",
	fontSize: "0.75rem",
	borderRadius: "0.25rem",
	backgroundColor: "var(--color-background)",
	color: "var(--color-foreground)",
	"--tw-ring-color": "var(--ring)",
	"--tw-ring-shadow": "var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor)",
};

// export const apps = [
// 	{ id: "about", icon: '/images/finder.png', label: "About Me" },
// 	{ id: "projects", icon: '/images/folder.png', label: "Projects" },
// 	{ id: "skills", icon: '/images/terminal.png', label: "Skills" },
// 	{ id: "contact", icon: '/images/safari.png', label: "Contact" },
// 	{ id: "trash", icon: '/images/trash.png', label: "Trash" },
// ];

export const INITIAL_Z_INDEX = 1;

// Window state configurations
export const WINDOW_DEFAULTS = {
	width: 600,
	height: 400,
	minWidth: 400,
	minHeight: 300,
	isOpen: false,
	isMinimized: false,
	isMaximized: false,
	dockIconPosition: { x: 0, y: 0 },
	position: { x: innerWidth / 2 - 300, y: innerHeight / 2 - 200 },
	zIndex: INITIAL_Z_INDEX,
	data: null,
};

export const WINDOW_IDS = {
	ABOUT: "about",
	PROJECTS: "projects",
	SKILLS: "skills",
	CONTACT: "contact",
};

export const INITIAL_WINDOW_STATES = {
	[WINDOW_IDS.ABOUT]: {
		...WINDOW_DEFAULTS,
	},
	[WINDOW_IDS.PROJECTS]: {
		...WINDOW_DEFAULTS,
	},
	[WINDOW_IDS.SKILLS]: {
		...WINDOW_DEFAULTS,
	},
	[WINDOW_IDS.CONTACT]: {
		...WINDOW_DEFAULTS,
	},
};

export const projects = [
	{
		title: "E-Commerce Platform",
		description: "A full-stack e-commerce solution with real-time inventory management, payment processing, and analytics dashboard.",
		image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop",
		tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
		github: "#",
		demo: "#",
	},
	{
		title: "Task Management App",
		description: "Collaborative task management tool with drag-and-drop interface, team workspaces, and real-time synchronization.",
		image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
		tech: ["TypeScript", "React", "Firebase", "Tailwind CSS"],
		github: "#",
		demo: "#",
	},
];