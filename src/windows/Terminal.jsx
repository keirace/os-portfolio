import { useState, useRef, useEffect, startTransition } from "react";
import Window from "../components/Window.jsx";
import { getDateTime } from "@utilities/navbar.js";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { WINDOW_IDS } from "@constants";
import useWindowsStore from "@store/window";

const user = "user";
const host = "pinos";

const getInitialHistory = () => {
	return [
		{ type: "response", content: `Last login: ${getDateTime()} on ttys021` },
		{ type: "response", content: "Welcome to PinOS Terminal!" },
		{ type: "response", content: "Type 'help' to get started." },
	];
};

const Terminal = () => {
	const isOpen = useWindowsStore((state) => state.windows[WINDOW_IDS.TERMINAL].isOpen);

	const prompt = `${user}@${host} ~ % `;
	const [history, setHistory] = useState(getInitialHistory());
	const [input, setInput] = useState("");
	const inputRef = useRef(null);
	const terminalRef = useRef(null);
	const [isReady, setIsReady] = useState(false);

	const handleCommand = (command) => {
		setHistory([...history, command]);
		command = command.toLowerCase().trim();
		let response = "";
		switch (command) {
			case "help":
				response = `Available commands:
- help: Show this help message
- about: Information about me
- skills: List my skills
- contact: How to contact me
- clear: Clear the terminal`;
				break;

			case "about":
				response = "Hey there! 👋 I am Pin, a passionate full-stack developer with expertise in building modern web applications.";
				break;

			case "skills":
				response = "Skills: JavaScript, TypeScript, React, Next.js, Node.js, GSAP, Three.js, Python, Java, MySQL, MongoDB, AWS.";
				break;

			case "contact":
				response = "You can reach me at: work@pinkaew.me";
				break;

			case "clear":
				setHistory([]);
				setInput("");
				return;

			case "":
				response = "";
				break;

			default:
				response = `Command not found: ${command}`;
				break;
		}

		setHistory((prev) => [...prev, { type: "command", content: command }, { type: "response", content: response }]);
		setInput("");
	};

	useEffect(() => {
		if (!isOpen) {
			// schedule state updates as a non-urgent transition to avoid cascading renders
			startTransition(() => {
				setHistory(getInitialHistory());
				setInput("");
				setIsReady(false);
			});
		}
	}, [isOpen]);

	useEffect(() => {
		// Scroll to the bottom of the terminal on history update
		if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
	}, [history]);

	useGSAP(() => {
		const randomDelay = Math.random() * 2 + 1; // Random delay between 1 to 3 seconds
		gsap.fromTo(".history", { display: "none" }, { display: "block", stagger: 0.5, ease: "power2.inOut", delay: randomDelay });
		setTimeout(() => {
			setIsReady(true);
		}, randomDelay * 1000 * history.length); // Estimate when typing is done
	}, [isOpen]);

	return (
		<div ref={terminalRef} className="terminal-window bg-gray-400/60 text-black font-mono font-semibold text-xs p-4 pt-5 overflow-y-scroll h-full" onClick={() => inputRef.current?.focus()}>
			<div className="terminal-output flex flex-col">
				{history.map((cmd, index) => (
					<div key={index} className="history mb-1 whitespace-pre-wrap">
						{cmd.type === "command" && <span>{prompt}</span>}
						{cmd.content}
					</div>
				))}
			</div>
			{isReady && (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleCommand(input);
					}}
					className="mt-1 flex mb-5"
				>
					<span className="mr-2">{prompt}</span>
					<input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} className="focus:outline-none flex-1 whitespace-pre-wrap" autoFocus />
				</form>
			)}
		</div>
	);
};

const TerminalWindow = () =>
	Window({
		id: WINDOW_IDS.TERMINAL,
		title: "user - zsh",
		children: <Terminal />,
	});

export default TerminalWindow;
