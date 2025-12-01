import { useState, useRef, useEffect } from "react";
import Window from "./Window.jsx";
import { getDateTime } from "@utilities/navbar.js";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { WINDOW_IDS } from "@constants";

const user = "user";
const host = "pinos";

const Terminal = () => {
	const prompt = `${user}@${host} ~ % `;
	const dateTime = getDateTime();
	const [history, setHistory] = useState([
		{ type: "response", content: `Last login: ${dateTime} on ttys021` },
		{ type: "response", content: "Welcome to PinOS Terminal!" },
		{ type: "response", content: "Type 'help' to get started." },
	]);
	const [input, setInput] = useState("");
	const inputRef = useRef(null);
	const terminalRef = useRef(null);

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
		// Scroll to the bottom of the terminal on history update
		if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
	}, [history]);

    useGSAP(() => {
        const historyElements = gsap.utils.toArray(".history");
        historyElements.forEach((el, index) => {
            gsap.fromTo(
                el,
                { opacity: 0 },
                { opacity: 1, ease: "elastic", delay: index * 0.1 }
            );
        });
        // gsap.fromTo(
        //     '.history',
        //     { opacity: 0},
        //     { opacity: 1, stagger: 0.3, ease: "elastic", delay: 0.5 }
        // );
    }, []);

	return (
		<div ref={terminalRef} className="terminal-window bg-gray-500/70 text-black font-mono text-xs p-4 pt-5 overflow-y-scroll h-full" onClick={() => inputRef.current?.focus()}>
			<div className="terminal-output flex flex-col">
				{history.map((cmd, index) => (
					<div key={index} className="history mb-1 whitespace-pre-wrap">
						{index !== 0 && cmd.type === "command" && <span>{prompt}</span>}
						{cmd.content}
					</div>
				))}
			</div>
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
