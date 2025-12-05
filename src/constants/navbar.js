import { Apple, Wifi, Battery, Volume2, Moon, Sun } from "lucide-react";
import useSystemStore from "@store/system";

export const navMenus = (activeMenu) => [
	{ id: "apple", label: Apple, alt: "Apple Menu" },
	{ id: activeMenu, label: activeMenu },
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
		{
			label: "Sleep",
			action: () => {
				const setIsBooting = useSystemStore.getState().setIsBooting;
				const setBootingState = useSystemStore.getState().setBootingState;
				setIsBooting(true);
				setBootingState("sleep");
				window.document.body.style.cursor = "none";

				window.addEventListener(
					"mousemove",
					() => {
						setBootingState("ready");
						setTimeout(() => {
							setIsBooting(false);
							window.document.body.style.cursor = "default";
						}, 1000);
					},
					{ once: true }
				);
			},
		},
		{
			label: "Restart...",
			action: () => {
				const setIsBooting = useSystemStore.getState().setIsBooting;
				setIsBooting(true);

				const setBootingState = useSystemStore.getState().setBootingState;
				setBootingState("restart");

				setTimeout(() => {
					setBootingState("ready");
				}, 1000);

				setTimeout(() => {
					setIsBooting(false);
				}, 3000);
			},
		},
		{
			label: "Shut Down...",
			action: () => {
				const setIsBooting = useSystemStore.getState().setIsBooting;
				const setBootingState = useSystemStore.getState().setBootingState;

				setIsBooting(true);
				window.document.body.style.cursor = "none";
				setBootingState("shutdown");

				setTimeout(() => {
					setBootingState("sleep");
				}, 2000);

				window.addEventListener(
					"mousemove",
					() => {
						setBootingState("ready");
						setTimeout(() => {
							setIsBooting(false);
							window.document.body.style.cursor = "default";
						}, 2000);
					},
					{ once: true }
				);
			},
		},
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
