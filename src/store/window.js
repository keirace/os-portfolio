import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_WINDOW_STATES, INITIAL_Z_INDEX } from "@constants";

// Define the shape of the store using Zustand with Immer for immutability
const useWindowsStore = create(
	immer((set) => ({
		windows: INITIAL_WINDOW_STATES,
		nextZIndex: INITIAL_Z_INDEX,

		setDockIconPosition: (id, position) => {
			set((state) => {
				const window = state.windows[id];
				if (window) {
					window.dockIconPosition = position;
				}
			})
		},
		openWindow: (id, data = null) => {
			set((state) => {
				const window = state.windows[id];
				if (window) {
					window.isOpen = true;
					window.isMinimized = false;
					window.zIndex = state.nextZIndex;
					state.nextZIndex += 1;
					window.data = data;
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
	}))
);

export default useWindowsStore;