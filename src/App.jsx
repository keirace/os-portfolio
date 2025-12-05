import "./App.css";
import { useEffect, useMemo } from "react";
import Navbar from "@components/Navbar";
import Dock from "@components/Dock";
import About from "@components/About";
import Resume from "@components/Resume";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import Projects from "@components/Projects";
import BootingScreen from "@components/BootingScreen";
import useSystemStore from "@store/system";
import Desktop from "@components/Desktop";
import Skills from "@components/Skills";
import Contact from "@components/Contact";
import Terminal from "@components/Terminal";
import Finder from "@components/Finder";
import TextEdit from "@components/TextEdit";
import Safari from "@components/Safari";
import Settings from "@components/Settings";
import Game from "@components/Game";
import { WINDOW_IDS } from "@constants";

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
