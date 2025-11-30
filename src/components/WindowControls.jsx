import React from "react";
import { X, Minus, Maximize2 } from "lucide-react";
import useWindowsStore from "@store/window";

const WindowControls = ({ title }) => {
    const { closeWindow, minimizeWindow, maximizeWindow } = useWindowsStore();

	return (
		<div className="flex items-center gap-2 group">
			{/* Close */}
			<button onClick={() => closeWindow(title)} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors group" title="Close">
				<X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100 mx-auto" />
			</button>
			{/* Minimize */}
			<button onClick={() => minimizeWindow(title)} className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors group" title="Minimize">
				<Minus className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100 mx-auto" />
			</button>
			{/* Maximize */}
			<button onClick={() => maximizeWindow(title)} className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors group" title="Maximize">
				<Maximize2 className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100 mx-auto" />
			</button>
		</div>
	);
};

export default WindowControls;
