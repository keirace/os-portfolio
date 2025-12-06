import React, { useCallback } from "react";
import { X, Minus, Maximize2 } from "lucide-react";
import useWindowsStore from "@store/window";

const WindowControls = ({ title }) => {
	const closeWindow = useWindowsStore((state) => state.closeWindow);
	const minimizeWindow = useWindowsStore((state) => state.minimizeWindow);
	const maximizeWindow = useWindowsStore((state) => state.maximizeWindow);

	const scheduleAction = useCallback((fn) => {
		// If SSR, run immediately
		if (typeof window === "undefined") {
			fn();
			return;
		}

		// Schedule heavier work during idle time
		requestAnimationFrame(() => {
			if ("requestIdleCallback" in window) {
				requestIdleCallback(() => fn(), { timeout: 200 });
			} else {
				// Fallback for browsers without requestIdleCallback
				setTimeout(() => fn(), 0);
			}
		});
	}, []);

	const handleClose = useCallback(
		(id) => {
			scheduleAction(() => closeWindow(id));
		},
		[closeWindow, scheduleAction]
	);

	const handleMinimize = useCallback(
		(id) => {
			scheduleAction(() => minimizeWindow(id));
		},
		[minimizeWindow, scheduleAction]
	);

	const handleMaximize = useCallback(
		(id) => {
			scheduleAction(() => maximizeWindow(id));
		},
		[maximizeWindow, scheduleAction]
	);

	return (
		<div className="flex items-center gap-2 group">
			{/* Close */}
			<button onClick={() => handleClose(title)} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors active:scale-95 group" title="Close" aria-label={`Close ${title}`}>
				<X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100 mx-auto" />
			</button>

			{/* Minimize */}
			<button
				onClick={() => handleMinimize(title)}
				className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors active:scale-95 group"
				title="Minimize"
				aria-label={`Minimize ${title}`}
			>
				<Minus className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100 mx-auto" />
			</button>

			{/* Maximize */}
			<button
				onClick={() => handleMaximize(title)}
				className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors active:scale-95 group"
				title="Maximize"
				aria-label={`Maximize ${title}`}
			>
				<Maximize2 className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100 mx-auto" />
			</button>
		</div>
	);
};

export default WindowControls;
