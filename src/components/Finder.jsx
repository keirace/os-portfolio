import { useEffect, useRef, useMemo, useCallback } from "react";
import Window from "./Window";
import { WINDOW_IDS, apps, SIDEBAR_ITEMS, createFileActions } from "@constants";
import FileIcon from "./FileIcon";
import useFinderStore from "@store/finder";
import useWindowsStore from "@store/window";
import { RenderSidebar, TitleBar } from "./FinderComponents";

const Finder = ({ isTrash = false }) => {
	const { activeFolder, setActiveFolder, setPosition, filesInFolder, setHistory, clearHistory } = useFinderStore();
	const openWindow = useWindowsStore((state) => state.openWindow);
	const isOpen = useWindowsStore((state) => state.windows[isTrash ? WINDOW_IDS.TRASH : WINDOW_IDS.FINDER].isOpen);
	const mainContentRef = useRef(null);

	useEffect(() => {
		if (!isOpen) {
			clearHistory();
			return;
		}
		setActiveFolder(isTrash ? "trash" : "user");
		setHistory(isTrash ? "trash" : "user");
	}, [clearHistory, isOpen, isTrash, setActiveFolder, setHistory]);

	const files = useMemo(() => (filesInFolder ? filesInFolder[activeFolder] || [] : []), [activeFolder, filesInFolder]);

	const fileActions = useMemo(() => createFileActions(openWindow, setActiveFolder, setHistory), [openWindow, setActiveFolder, setHistory]);
	const handleOpenFile = useCallback(
		(file) => {
			fileActions[activeFolder]?.(file);
		},
		[activeFolder, fileActions]
	);

	return (
		<div className="finder">
			{/* Sidebar */}
			<div className="sidebar">
				<p className="text-xs font-semibold text-gray-400">Favorites</p>
				<RenderSidebar items={SIDEBAR_ITEMS} activeFolder={activeFolder} setActiveFolder={setActiveFolder} setHistory={setHistory} />
			</div>
			{/* Main Content */}
			<div className="main-content" ref={mainContentRef}>
				{/* Files Display */}
				{files.map((file) => (
					<FileIcon key={`${activeFolder}-${file.label}`} label={file.label} icon={file.icon} position={file.position} onDoubleClick={() => handleOpenFile(file)} setPosition={setPosition} />
				))}
				{/* Address Bar */}
				{/* <div className="flex items-center gap-1 absolute bottom-10 w-full h-10 border-t border-t-primary/10 backdrop-blur-xl"></div> */}
			</div>
		</div>
	);
};

const FinderWindow = () => {
	const { activeMenu } = useWindowsStore();
	const isTrash = activeMenu === "trash";
	const { activeFolder, history, historyIndex, goToPrevious, goToNext } = useFinderStore();

	return Window({
		id: isTrash ? WINDOW_IDS.TRASH : WINDOW_IDS.FINDER,
		title: isTrash ? apps[WINDOW_IDS.TRASH].label : apps[WINDOW_IDS.FINDER].label,
		children: <Finder isTrash={isTrash} />,
		customizeTitleBar: (
			<TitleBar
				id={isTrash ? WINDOW_IDS.TRASH : WINDOW_IDS.FINDER}
				items={SIDEBAR_ITEMS}
				activeFolder={activeFolder}
				history={history}
				historyIndex={historyIndex}
				goToPrevious={goToPrevious}
				goToNext={goToNext}
			/>
		),
	});
};
export default FinderWindow;
