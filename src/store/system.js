import { create } from "zustand";

export const BOOTING_IDS = {
	RESTART: "restart",
	READY: "ready",
	SHUTDOWN: "shutdown",
	SLEEP: "sleep",
};

export const BOOTING_TEXT_MAP = {
	[BOOTING_IDS.RESTART]: "Booting OS...",
	[BOOTING_IDS.READY]: "Welcome!",
	[BOOTING_IDS.SHUTDOWN]: "Shutting Down...",
	[BOOTING_IDS.SLEEP]: ""
};

const useSystemStore = create((set) => ({
    // booting state
    isBooting: false,
    setIsBooting: (isBooting) => set({ isBooting }),
	bootingText: BOOTING_TEXT_MAP.restart,
	setBootingState: (stateKey) => set({ bootingText: BOOTING_TEXT_MAP[stateKey] }),
    
    // theme state
	isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
	setIsDarkMode: () =>
		set((state) => ({
			isDarkMode: !state.isDarkMode,
		})),
}));

export default useSystemStore;