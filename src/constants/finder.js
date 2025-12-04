import { PencilRuler, Clock9, File, House, Image, Trash } from "lucide-react";
import { WINDOW_IDS } from "./index.js";

const SIDEBAR_ITEMS = [
	{ id: "applications", label: "Applications", icon: PencilRuler },
	{ id: "recents", label: "Recents", icon: Clock9 },
	{ id: "documents", label: "Documents", icon: File },
	{ id: "user", label: "user", icon: House },
	{ id: "images", label: "Images", icon: Image },
	{ id: "trash", label: "Trash", icon: Trash },
];

const INITIAL_FINDER_FILES = {
	documents: [
		{
			label: "Resume.pdf",
			icon: "/images/resume.png",
			position: "top-10 left-10",
		},
		{
			label: "helloworld.py",
			icon: "/images/plain.png",
			position: "top-40 left-60",
		},
		{
			label: "Notes.txt",
			icon: "/images/plain.png",
			position: "top-40 left-20",
		},
	],
	images: [
		{ label: "Vacation.jpg", icon: "/images/plain.png", position: "top-20 left-30", action: () => {} },
		{ label: "Profile.png", icon: "/images/plain.png", position: "top-15 left-10", action: () => {} },
	],
	applications: [
		{
			label: "Terminal.app",
			icon: "/images/terminal.png",
			position: "top-10 right-20",
		},
		{
			label: "Safari.app",
			icon: "/images/safari.png",
			position: "top-10 left-35",
		},
		{
			label: "TextEdit.app",
			icon: "/images/textedit.png",
			position: "top-10 left-10",
		},
	],
	recents: [
		{
			label: "ecommerce",
			icon: "/images/plain.png",
			position: "top-20 left-60",
		},
	],
	user: [
		{
			label: "Documents",
			icon: "/images/folder.png",
			position: "top-20 left-20",
		},
		{
			label: "Pictures",
			icon: "/images/folder.png",
			position: "top-50 left-20",
		},
		{
			label: "Desktop",
			icon: "/images/folder.png",
			position: "top-10 left-40",
		},
	],
	trash: [],
	desktop: [
		{ label: "resume.pdf", icon: "/images/resume.png", position: "bottom-30 right-10" },
		{ label: "credits.txt", icon: "/images/plain.png", position: "bottom-60 right-10" },
	],
};

const createFileActions = (openWindow, setActiveFolder, setHistory) => ({
	documents: (file) => {
		if (file.label === "Resume.pdf") {
			openWindow(WINDOW_IDS.RESUME);
		} else if (file.label === "helloworld.py") {
			openWindow(WINDOW_IDS.TEXTEDIT, 'print("hello world")', "helloworld.py");
		}
	},
	images: (file) => {},
	applications: (file) => {
		if (file.label === "Terminal.app") {
			openWindow(WINDOW_IDS.TERMINAL);
		} else if (file.label === "Safari.app") {
			openWindow(WINDOW_IDS.SAFARI);
		} else if (file.label === "TextEdit.app") {
			openWindow(WINDOW_IDS.TEXTEDIT);
		}
	},
	user: (file) => {
		if (file.label === "Documents") {
			setActiveFolder("documents");
			setHistory("documents");
		} else if (file.label === "Pictures") {
			setActiveFolder("images");
			setHistory("images");
		} else if (file.label === "Desktop") {
			setActiveFolder("desktop");
			setHistory("desktop");
		}
	},
	recents: (file) => {
		if (file.label === "ecommerce") {
			openWindow(WINDOW_IDS.SAFARI, "https://ecommerce.pinkaew.me", "ecommerce");
		}
	},
});

export { SIDEBAR_ITEMS, INITIAL_FINDER_FILES, createFileActions };
