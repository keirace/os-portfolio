import Window from "../components/Window";
import { useMemo } from "react";
import { apps } from "@constants";
import useWindowsStore from "@store/window";

const Game = ({ link, id }) => {
	const isOpen = useWindowsStore((state) => state.windows[id].isOpen);
	const src = useMemo(() => `https://play.js13kgames.com/${link}`, [link]);
	if (!isOpen) return null;
	return (
		<iframe
			src={src}
			title={apps[id]?.label ?? "Game"}
			width="100%"
			height="100%"
			loading="lazy"
			sandbox="allow-scripts allow-same-origin"
			allow="fullscreen; autoplay;"
			className="bg-secondary w-full h-[94%] mb-8 select-none"
		/>
	);
};

const GameWindow = ({ gameId }) => {
	const app = apps[gameId];
	if (!app) {
		return Window({
			id: gameId,
			title: "Game",
			children: <div className="p-4">Game not found</div>,
		});
	}

	const title = app.label;
	return Window({
		id: gameId,
		title: title,
		children: <Game link={apps[gameId].id} id={gameId} />,
	});
};
export default GameWindow;
