import { Document, pdfjs, Page } from "react-pdf";
import Window from "./Window";
import { CircleArrowDown, ChevronDown, Share, PanelLeftIcon, ZoomIn, ZoomOut, Info, Search } from "lucide-react";
import useWindowsStore from "@store/window";
import { WINDOW_IDS, apps } from "@constants";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import WindowControls from "./WindowControls";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

const Controls = () => {
	const { zoomIn, zoomOut } = useControls();

	return (
		<div>
			<button onClick={() => zoomIn()}>
				<ZoomIn />
			</button>
			<button onClick={() => zoomOut()}>
				<ZoomOut />
			</button>
		</div>
	);
};

const Resume = () => {
	return (
		<TransformWrapper initialScale={1} initialPositionX={0} initialPositionY={0} wheel={{ wheelDisabled: true, step: 1, smoothStep: 0.01 }} panning={{ wheelPanning: true }}>
			<div className="resume bg-secondary mb-8 flex justify-center">
				<TransformComponent>
					<Document file="/files/Pin_Horputra_Resume.pdf" loading="Loading resume..." className="flex justify-center">
						<Page pageNumber={1} width={600} renderTextLayer renderAnnotationLayer className="bg-black" />
					</Document>
				</TransformComponent>
			</div>
		</TransformWrapper>
	);
};

const TitleBar = () => {
	const window = useWindowsStore((state) => state.windows[WINDOW_IDS.RESUME]);
	const isMobile = window?.width <= 768;

	return (
		<div className="title-bar-container flex-col border-b">
			<div className="resume title-bar flex items-start justify-between text-muted-foreground">
				<div className="resume-group">
				<WindowControls title={WINDOW_IDS.RESUME} />
					<button className="ml-3 mr-1">
						<PanelLeftIcon className="py-0 px-1 w-7 h-7"/>
						<ChevronDown className="py-0 px-1 w-5 h-5"/>
					</button>
					<div className="flex flex-col items-start justify-center">
						<h3 className="text-sm font-medium text-accent-foreground">resume.pdf</h3>
						<p className="text-xs">1 page</p>
					</div>
				</div>
				<div className="resume-group">
					{/* <Controls /> */}
					<button>
						<Info />
					</button>
					<button>
						<ZoomIn />
					</button>
					<button>
						<ZoomOut />
					</button>
					<button>
						<Share />
					</button>
					<a href="files/Pin_Horputra_Resume.pdf" download>
						<CircleArrowDown />
					</a>
					{isMobile ? <button><Search /></button> : <input type="text" className="border border-muted-foreground/20" placeholder="Search" />}
				</div>
			</div>
			<div className="resume-group text-center text-xs">resume.pdf</div>
		</div>
	);
};

const ResumeWindow = () => {
	return (
		// <TransformWrapper initialScale={1} initialPositionX={200} initialPositionY={100}>
		// 	{({ zoomIn, zoomOut, ...rest }) => {
		Window({
			id: WINDOW_IDS.RESUME,
			title: apps[WINDOW_IDS.RESUME].label,
			children: <Resume />,
			customizeTitleBar: <TitleBar />,
		})
		// 	}}
		// </TransformWrapper>
	);
};

export default ResumeWindow;
