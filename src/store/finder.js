import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_FINDER_FILES } from "@constants";

const useFinderStore = create(
	immer((set) => ({
		activeFolder: "user",
		filesInFolder: INITIAL_FINDER_FILES,
		history: [],
		historyIndex: -1,
		setActiveFolder: (folder) => {
			set((state) => {
				state.activeFolder = folder;
			});
		},
		setPosition: (label, position) => {
			set((state) => {
				state.filesInFolder[state.activeFolder] = state.filesInFolder[state.activeFolder].map((file) => {
					if (file.label === label) {
						return { ...file, position };
					}
					return file;
				});
			});
		},
		setHistory: (newHistory) => {
			set((state) => {
				if (state.history[state.history.length - 1] === newHistory) return;
				state.history = [...state.history, newHistory];
				state.historyIndex = state.history.length - 1;
			})
		},
		clearHistory: () => {
			set((state) => {
				state.history = [];
				state.historyIndex = -1;
				console.log("cleared history");
			});
		},
		goToPrevious: () => {
			set((state) => {
				if (state.historyIndex > 0) {
					state.historyIndex -= 1;
					state.activeFolder = state.history[state.historyIndex];
				}
			});
		},
		goToNext: () => {
			set((state) => {
				if (state.historyIndex < state.history.length - 1) {
					state.historyIndex += 1;
					state.activeFolder = state.history[state.historyIndex];
				}
			});
		},
	}))
);

export default useFinderStore;
