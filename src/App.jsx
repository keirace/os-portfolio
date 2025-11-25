import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "@components/Navbar";

function App() {
  
	const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect system color scheme preference on initial load and on changes
  useEffect(() => {
		const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");

		const handleChange = (e) => {
			setIsDarkMode(e.matches);
		};

		matchMedia.addEventListener("change", handleChange);

		return () => {
			matchMedia.removeEventListener("change", handleChange);
		};
	}, [setIsDarkMode]);

  // Apply or remove dark mode class based on isDarkMode state
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

  }, [isDarkMode]);

	return (
		<main>
			<Navbar mode={isDarkMode} setIsDarkMode={setIsDarkMode} />
		</main>
	);
}

export default App;
