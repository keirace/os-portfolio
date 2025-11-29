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
import { useGSAP } from "@gsap/react";

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

	useGSAP(() => {
		const tl = gsap.timeline({duration: 1, ease: "power2.out", stagger: 0.2});
		tl.fromTo(
			"nav",
			{ opacity: 0 },
			{ opacity: 1},
		);
		tl.fromTo(
			"#dock",
			{ opacity: 0 },
			{ opacity: 1 },
		);
	}, [isBooting]);

	if (isBooting) {
		return <BootingScreen />;
	}

	return (
		<main>
			<Navbar />
			<About />
			<Projects />
			<Dock />
			<Resume />
		</main>
	);
}

export default App;
