import { Fragment } from "react";
import { ChevronLeft, ChevronRight, Search, Share, Trash } from "lucide-react";
import WindowControls from "./WindowControls";

export const RenderSidebar = ({items, activeFolder, setActiveFolder, setHistory}) => {
	return items.map((item) => (
		<Fragment key={item.id}>
			<button
				className={`flex items-start gap-2 rounded-sm p-1 ${activeFolder === item.id ? "bg-accent/20 font-medium" : "font-normal"}`}
				onClick={() => {
					setActiveFolder && setActiveFolder(item.id);
					setHistory && setHistory(item.id);
				}}
			>
				<item.icon />
				<span className="text-xs text-sidebar-foreground truncate">{item.label}</span>
			</button>
		</Fragment>
	));
};

export const TitleBar = ({ id, items, activeFolder, history, historyIndex, goToPrevious, goToNext }) => {
	return (
		<div className="h-12 flex">
			<div className="w-30 sm:w-40 h-full bg-sidebar/90 backdrop-blur-2xl border-r border-r-background flex p-4">
				<WindowControls title={id} />
			</div>

			<div className="grow bg-primary-foreground pl-2 pr-4 border-b border-b-border">
				<div className="finder title-bar">
					{goToPrevious && goToNext && (
						<div>
							<button onClick={goToPrevious} className={`${historyIndex === 0 ? "opacity-50" : ""}`}>
								<ChevronLeft />
							</button>
							<button onClick={goToNext} className={`${historyIndex >= history.length - 1 ? "opacity-50" : ""}`}>
								<ChevronRight />
							</button>
						</div>
					)}
					<div className="w-full ml-2 justify-start items-center flex">
						<h3>{items.find((item) => item.id === activeFolder)?.label}</h3>
					</div>
					<div className="hidden sm:flex">
						<button>
							<Share />
						</button>
						<button>
							<Trash />
						</button>
					</div>
					<button className="hidden sm:block">
						<Search />
					</button>
				</div>
			</div>
		</div>
	);
};
