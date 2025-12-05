import Window from "./Window";
import React from "react";
import { WINDOW_IDS, apps } from "@constants";
import useWindowsStore from "@store/window";

const Game = ({ link, id }) => {
    const isOpen = useWindowsStore((state) => state.windows[id].isOpen);
    if (!isOpen) return null;
	return <iframe src={`https://play.js13kgames.com/${link}`} width="100%" height="100%" className="bg-secondary w-full h-[94%] mb-8 select-none" />;
};

const GameWindow = ({gameId}) => {
	const title = apps[gameId].label;
	return Window({
		id: gameId,
		title: title,
		children: <Game link={apps[gameId].id} id={gameId} />,
	});
};
export default GameWindow;
