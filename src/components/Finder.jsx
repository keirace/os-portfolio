import { Fragment, useEffect, useRef, useMemo } from "react";
import Window from "./Window";
import { WINDOW_IDS, apps, SIDEBAR_ITEMS, createFileActions } from "@constants";
import { Trash, Share, Search, ChevronLeft, ChevronRight } from "lucide-react";
import WindowControls from "./WindowControls";
import FileIcon from "./FileIcon";
import useFinderStore from "@store/finder";
import useWindowsStore from "@store/window";

const Finder = ({ isTrash = false }) => {
	const { activeFolder, setActiveFolder, setPosition, filesInFolder, setHistory } = useFinderStore();
	const { openWindow } = useWindowsStore();
	const mainContentRef = useRef(null);

	useEffect(() => {
		if (isTrash) {
			setActiveFolder("trash");
			setHistory("trash");
		} else {
			setHistory("user");
		}
	}, [isTrash, setActiveFolder, setHistory]);

	const fileActions = useMemo(() => createFileActions(openWindow, setActiveFolder, setHistory), [openWindow, setActiveFolder, setHistory]);

	return (
		<div className="finder">
			{/* Sidebar */}
			<div className="sidebar">
				<p className="text-xs font-semibold text-gray-400">Favorites</p>
				{SIDEBAR_ITEMS.map((item) => (
					<Fragment key={item.id}>
						<button
							className={`flex items-center gap-2 rounded-sm px-1  ${activeFolder === item.id ? "bg-accent/20 font-medium" : "font-normal"}`}
							onClick={() => {
								setActiveFolder(item.id);
								setHistory(item.id);
							}}
						>
							<item.icon />
							<span className="text-xs text-sidebar-foreground">{item.label}</span>
						</button>
					</Fragment>
				))}
			</div>
			{/* Main Content */}
			<div className="main-content" ref={mainContentRef}>
				{/* Files Display */}
				{filesInFolder[activeFolder]?.map((file, index) => (
					<FileIcon
						key={activeFolder + index}
						label={file.label}
						icon={file.icon}
						position={file.position}
						onDoubleClick={() => fileActions[activeFolder]?.(file)}
						setPosition={setPosition}
					/>
				))}
				{/* Address Bar */}
				{/* <div className="flex items-center gap-1 absolute bottom-10 w-full h-10 border-t border-t-primary/10 backdrop-blur-xl"></div> */}
			</div>
		</div>
	);
};

export const TitleBar = ({ id }) => {
	const { activeFolder, history, historyIndex, goToPrevious, goToNext } = useFinderStore();

	return (
		<div className="h-12 flex">
			<div className="w-40 h-full bg-sidebar/90 backdrop-blur-2xl border-r border-r-background flex p-4">
				<WindowControls title={id} />
			</div>

			<div className="grow bg-primary-foreground pl-2 pr-4 border-b border-b-border">
				<div className="finder title-bar">
					<div>
						<button onClick={goToPrevious} className={`${historyIndex === 0 ? "opacity-50" : ""}`}>
							<ChevronLeft />
						</button>
						<button onClick={goToNext} className={`${historyIndex >= history.length - 1 ? "opacity-50" : ""}`}>
							<ChevronRight />
						</button>
					</div>
					<div className="w-full ml-2 justify-start items-center flex">
						<h3>{SIDEBAR_ITEMS.find((item) => item.id === activeFolder)?.label}</h3>
					</div>
					<div>
						<button>
							<Share />
						</button>
						<button>
							<Trash />
						</button>
					</div>
					<button>
						<Search />
					</button>
				</div>
			</div>
		</div>
	);
};

const FinderWindow = () => {
	const { activeMenu } = useWindowsStore();
	const isTrash = activeMenu === "trash";

	return Window({
		id: isTrash ? WINDOW_IDS.TRASH : WINDOW_IDS.FINDER,
		title: isTrash ? apps[WINDOW_IDS.TRASH].label : apps[WINDOW_IDS.FINDER].label,
		children: <Finder isTrash={isTrash} />,
		customizeTitleBar: <TitleBar id={isTrash ? WINDOW_IDS.TRASH : WINDOW_IDS.FINDER} />,
	});
};
export default FinderWindow;
