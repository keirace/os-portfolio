import { create } from "zustand";

const useThemeStore = create((set) => ({
	isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
	setIsDarkMode: () =>
		set((state) => ({
			isDarkMode: !state.isDarkMode,
		})),
}));

export default useThemeStore;
