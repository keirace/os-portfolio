import { Apple, Wifi, Battery, Volume2, Moon, Sun } from "lucide-react";

export const navMenus = [
	{ id: "apple", label: Apple, alt: "Apple Menu" },
	{ id: "portfolio", label: "Portfolio" },
	{ id: "file", label: "File" },
	{ id: "edit", label: "Edit" },
	{ id: "view", label: "View" },
	{ id: "window", label: "Window" },
	{ id: "help", label: "Help" },
];

export const submenu = ({ setActiveMenu }) => ({
	apple: [
		{
			label: "About This App",
			action: () => {
				alert("Pinos - A macOS-like web application");
				setActiveMenu(null);
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
				setActiveMenu(null);
			},
		},
	],
	file: [
		{ label: "New Window", shortcut: "⌘N", action: () => alert("New window") },
		{
			label: "Close Window",
			shortcut: "⌘W",
			action: () => {
				setActiveMenu(null);
				window.close();
			},
		},
		{ type: "separator" },
		{
			label: "Print",
			shortcut: "⌘P",
			action: () => {
				window.print();
				setActiveMenu(null);
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
		{
			label: "Show All Windows",
			shortcut: "F3",
			action: () => {
				setActiveMenu(null);
			},
		},
		{
			label: "Minimize All",
			shortcut: "⌘M",
			action: () => {
				setActiveMenu(null);
			},
		},
		{ type: "separator" },
		{
			label: "Enter Full Screen",
			shortcut: "⌃⌘F",
			action: () => {
				if (!document.fullscreenElement) {
					document.documentElement.requestFullscreen();
				} else {
					document.exitFullscreen();
				}
				setActiveMenu(null);
			},
		},
	],
});

export const appleIcon = { alt: "Apple", icon: Apple };

export const navIcons = [
	{ alt: "Wifi", icon: Wifi },
	{ alt: "Battery", icon: Battery },
	{ alt: "Volume", icon: Volume2 },
];

export const modeIcon = (isDarkMode) => ({ alt: isDarkMode ? "Toggle Light Mode" : "Toggle Dark Mode", icon: isDarkMode ? Sun : Moon });
