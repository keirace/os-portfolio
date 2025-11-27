import "./App.css";
import { useState, useEffect, useMemo } from "react";
import Navbar from "@components/Navbar";
import Dock from "@components/Dock";
import About from "@components/About";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

function App() {
	const [isDarkMode, setIsDarkMode] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);
	const [activeMenu, setActiveMenu] = useState("portfolio");
  const colorSchemeMedia = useMemo(() => window.matchMedia("(prefers-color-scheme: dark)"), []);

	// Detect system color scheme preference on initial load and on changes
	useEffect(() => {
		const handleChange = (e) => {
			setIsDarkMode(e.matches);
		};

		colorSchemeMedia.addEventListener("change", handleChange);

		return () => {
			colorSchemeMedia.removeEventListener("change", handleChange);
		};
	}, [colorSchemeMedia]);

	// 
	useEffect(() => {
		document.documentElement.classList.toggle("dark", isDarkMode);
	}, [isDarkMode]);

	return (
		<main>
			<Navbar mode={isDarkMode} setIsDarkMode={setIsDarkMode} activeMenu={activeMenu} />
			<About />
			<Dock activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
		</main>
	);
}

export default App;
