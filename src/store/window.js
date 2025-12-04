import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_WINDOW_STATES, INITIAL_Z_INDEX } from "@constants";

// Define the shape of the store using Zustand with Immer for immutability
const useWindowsStore = create(
	immer((set) => ({
		windows: INITIAL_WINDOW_STATES,
		nextZIndex: INITIAL_Z_INDEX,
		activeMenu: "portfolio",
		setDockIconPosition: (id, position) => {
			set((state) => {
				const window = state.windows[id];
				if (window) {
					window.dockIconPosition = position;
				}
			})
		},
		openWindow: (id, data = null, title = null) => {
			set((state) => {
				const window = state.windows[id];
				if (window) {
					window.isOpen = true;
					window.isMinimized = false;
					window.zIndex = state.nextZIndex;
					state.nextZIndex += 1;
					window.data = data;
					window.title = title;
				}
			});
		},
		closeWindow: (id, data = null) => {
			set((state) => {
				const window = state.windows[id];
				if (window) {
					window.isOpen = false;
					window.isMinimized = false;
					window.data = data;
					window.position = { x: innerWidth / 2 - window.width / 2, y: innerHeight / 2 - window.height / 2 };
				}
			});
		},
		minimizeWindow: (id) => {
			set((state) => {
				const window = state.windows[id];
				if (window) {
					window.isMinimized = true;
				}
			});
		},
		maximizeWindow: (id) => {
			set((state) => {
				const window = state.windows[id];
				if (window) {
					if (window.isMaximized) {
						window.zIndex = state.nextZIndex;
						state.nextZIndex += 1;
					} else {
						window.zIndex = 9999;
					}
					window.isMaximized = !window.isMaximized;
				}
			});
		},
		focusWindow: (id) => {
			set((state) => {
				const window = state.windows[id];
				if (window) {
					state.activeMenu = id;
					window.zIndex = state.nextZIndex;
					state.nextZIndex += 1;
				}
			});
		},
		dragWindow: (id, position) => {
			set((state) => {
				const window = state.windows[id];
				if (window) {
					window.position = position;
				}
			});
		},
		resizeWindow: (id, size) => {
			set((state) => {
				const window = state.windows[id];
				if (window) {
					window.width = size.width;
					window.height = size.height;
				}
			});
		},
		closeAllWindows: () => {
			set((state) => {
				if (state.windows === null) return;
				for (const id in state.windows) {
					state.windows[id].isOpen = false;
					state.windows[id].isMinimized = false;
					state.windows[id].position = { x: innerWidth / 2 - state.windows[id].width / 2, y: innerHeight / 2 - state.windows[id].height / 2 };
				}
			});
		}
	}))
);

export default useWindowsStore;