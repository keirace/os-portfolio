import "./App.css";
import { useEffect, useMemo } from "react";
import Navbar from "@components/Navbar";
import Dock from "@components/Dock";
import Desktop from "@components/Desktop";
import BootingScreen from "@components/BootingScreen";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import useSystemStore from "@store/system";
import { WINDOW_IDS } from "@constants";
import { About, Contact, Projects, Resume, Skills, Terminal, Finder, TextEdit, Safari, Settings, Game } from "@windows";

gsap.registerPlugin(Draggable);

function App() {
	const isDarkMode = useSystemStore((state) => state.isDarkMode);
	const setIsDarkMode = useSystemStore((state) => state.setIsDarkMode);
	const isBooting = useSystemStore((state) => state.isBooting);

	const mediaQueryList = useMemo(() => window.matchMedia("(prefers-color-scheme: dark)"), []);

	// Toggle dark mode based on system preference changes
	useEffect(() => {
		const handleChange = (e) => {
			setIsDarkMode(e.matches);
		};
		mediaQueryList.addEventListener("change", handleChange);

		return () => {
			mediaQueryList.removeEventListener("change", handleChange);
		};
	}, [mediaQueryList, setIsDarkMode]);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", isDarkMode);
	}, [isDarkMode]);

	if (isBooting) {
		return <BootingScreen />;
	}

	return (
		<main>
			<Navbar />
			<Dock />
			<About />
			<Projects />
			<Resume />
			<Skills />
			<Contact />
			<Terminal />
			<Finder />
			<TextEdit />
			<Safari	/>
			<Settings />
			<Game gameId={WINDOW_IDS.CLAWSTRIKE} />
			<Game gameId={WINDOW_IDS.TRIANGLE} />
			<Game gameId={WINDOW_IDS.RACER} />
			<Desktop />
		</main>
	);
}

export default App;
