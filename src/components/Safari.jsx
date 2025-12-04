import { Fragment} from "react";
import { WINDOW_IDS, apps } from "@constants";
import useWindowsStore from "@store/window";
import { ChevronDown, ChevronLeft, ChevronRight, CircleArrowDown, Plus, ChevronsRight,X, Search } from "lucide-react";
import { PanelLeftIcon } from "lucide-react";
import Window from "./Window";
import WindowControls from "./WindowControls";


const Safari = ({ address }) => {
	const { windows } = useWindowsStore();
	const window = windows[WINDOW_IDS.SAFARI];

	return <div className="bg-secondary w-full h-full">
		{address && <iframe src={address} title="Safari Window" className="object-contain w-full h-full" /> }
	</div>;
};

const TitleBar = ({address}) => {
	const window = useWindowsStore((state) => state.windows[WINDOW_IDS.SAFARI]);
	const isMobile = window?.width <= 640;
	address = address.split("//")[1]?.replace("www.", "") || "";

	return (
		<div className="title-bar-container">
			<WindowControls title={WINDOW_IDS.SAFARI} />
			<div className="safari title-bar">
				<div className="safari-group ml-3">
					<button>
						<PanelLeftIcon />
					</button>
					<hr className="border-r border-secondary h-6" />
					<button>
						<ChevronDown className="w-5 h-5" />
					</button>
				</div>
				<div className="safari-group">
					<button>
						<ChevronLeft />
					</button>
					<button>
						<ChevronRight />
					</button>
				</div>
				<div className="address-bar safari-group">
					{/* <input type="text" placeholder="Search or enter website name" className="w-20 bg-muted" /> */}
					{/* <X className="rounded-xs bg-muted-foreground text-input-background" /> */}
					{!address && <Search className="w-4" />}
					<input type="text" placeholder={address || "Search or enter website name"} />
				</div>
				{!isMobile && (
					<div className="safari-group">
						<button>
							<Plus />
						</button>
					</div>
				)}
				{isMobile && (
					<div className="safari-group">
						<button>
							<ChevronsRight />
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

const SafariWindow = () => {
	const window = useWindowsStore((state) => state.windows[WINDOW_IDS.SAFARI]);
	const data = window?.data || "";
	const title = window?.title || apps[WINDOW_IDS.SAFARI].label;

	return Window({
		id: WINDOW_IDS.SAFARI,
		title: title,
		children: <Safari address={data} />,
		customizeTitleBar: <TitleBar address={data} />,
	});
};

export default SafariWindow;
