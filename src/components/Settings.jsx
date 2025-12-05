import Window from "./Window";
import { WINDOW_IDS, apps, WALLPAPERS, ACCENT_COLORS } from "@constants";
import { RenderSidebar, TitleBar } from "./FinderComponents";
import useWindowsStore from "@store/window";
import useSystemStore from "@store/system";
import { useState, useEffect } from "react";
import { SIDEBAR_ITEMS } from "@constants/settings";

const Settings = ({ activeFolder, setActiveFolder }) => {
	const window = useWindowsStore((state) => state.windows[WINDOW_IDS.SETTINGS]);
	const isMobile = window.width <= 640;
	const { isDarkMode, setIsDarkMode } = useSystemStore();

	const [wallpaper, setWallpaper] = useState(WALLPAPERS[0].url);
	const [accentColor, setAccentColor] = useState(ACCENT_COLORS[0].class);

	const selected = WALLPAPERS.find((wp) => wp.url === wallpaper)?.id;
	const selectedAccent = ACCENT_COLORS.find((ac) => ac.class === accentColor)?.name;
	useEffect(() => {
		document.body.style.backgroundImage = `url("${wallpaper}")`;
	}, [wallpaper]);

	useEffect(() => {
		document.documentElement.style.setProperty("--accent", accentColor);
	}, [accentColor]);

	return (
		<div className="finder">
			<div className="sidebar">
				<h2 className="text-xs font-semibold text-gray-400">Settings</h2>
				<RenderSidebar items={SIDEBAR_ITEMS} activeFolder={activeFolder} setActiveFolder={setActiveFolder} />
			</div>

			<div className="main-content p-4 overflow-y-auto select-none">
				{activeFolder === "wallpaper" && (
					<div className={`grid grid-cols-2 ${isMobile ? "sm:grid-cols-2" : "sm:grid-cols-4"} gap-4`}>
						{WALLPAPERS.map((wp) => (
							<div key={wp.id} className="relative" onClick={() => setWallpaper(wp.url)}>
								<img src={wp.url} alt={wp.name} className={`w-full aspect-16/10 object-cover rounded-lg transition-all ${selected === wp.id && "ring-4 ring-accent"}`} />
							</div>
						))}
					</div>
				)}

				{activeFolder === "appearance" && (
					<div className="mt-6 text-sm text-muted-foreground border-muted-foreground/20 border p-4 rounded-lg">
						<div className="flex justify-between items-center border-b border-b-muted-foreground/20 pb-2 mb-2">
							<h3>Dark Mode</h3>
							<label className="inline-flex relative items-center">
								<input
									type="checkbox"
									className="sr-only peer"
									checked={isDarkMode}
									onChange={() => {
										setIsDarkMode(!isDarkMode);
									}}
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-accent"></div>
							</label>
						</div>
						<div className="flex justify-between items-center">
							<h3>Accent Color</h3>
							<div className="flex justify-center items-center gap-2 flex-wrap">
								{ACCENT_COLORS.map((color) => (
									<button
										key={color.name}
										className={`rounded-full w-4 h-4 glassmorphism relative`}
										style={{ backgroundColor: color.class }}
										onClick={() => setAccentColor(color.class)}
									>
										<div className={`absolute abs-center w-1.5 h-1.5 rounded-full ${selectedAccent === color.name ? "bg-white" : "bg-transparent"}`}></div>
									</button>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

const SettingsWindow = () => {
	const [activeFolder, setActiveFolder] = useState("wallpaper");

	return Window({
		id: WINDOW_IDS.SETTINGS,
		title: apps[WINDOW_IDS.SETTINGS].name,
		children: <Settings activeFolder={activeFolder} setActiveFolder={setActiveFolder} />,
		customizeTitleBar: <TitleBar id={WINDOW_IDS.SETTINGS} title={apps[WINDOW_IDS.SETTINGS].name} items={SIDEBAR_ITEMS} activeFolder={activeFolder} />,
	});
};

export default SettingsWindow;
