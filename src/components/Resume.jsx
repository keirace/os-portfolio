import { Document, pdfjs, Page } from "react-pdf";
import Window from "./Window";
import { CircleArrowDown, ChevronDown, Share, PanelLeftIcon, ZoomIn, ZoomOut, Info, Search, Rotate3D, RotateCw } from "lucide-react";
import useWindowsStore from "@store/window";
import { WINDOW_IDS, apps } from "@constants";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import WindowControls from "./WindowControls";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

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
	const window = useWindowsStore((state) => state.windows[WINDOW_IDS.RESUME]);
    const containerWidth = window?.width;
	return (
		<div className="bg-secondary flex justify-center items-start h-full w-full overflow-auto">
			<TransformComponent>
				<Document
					file="/files/Pin_Horputra_Resume.pdf"
					loading="Loading resume..."
					onLoadError={(error) => console.error("Error while loading document!", error)}
				>
					<Page pageNumber={1} width={containerWidth} renderTextLayer renderAnnotationLayer />
				</Document>
			</TransformComponent>
		</div>
	);
};

const TitleBar = () => {
	const window = useWindowsStore((state) => state.windows[WINDOW_IDS.RESUME]);
	const isMobile = window?.width <= 768;

	return (
		<div className="title-bar-container flex-col border-b relative">
			<div className="resume title-bar">
				<div className="resume-group">
					<WindowControls title={WINDOW_IDS.RESUME} />
					<button className="ml-3 mr-1">
						<PanelLeftIcon className="py-0 px-1 w-7 h-7" />
						<ChevronDown className="py-0 px-1 w-5 h-5" />
					</button>
					<div className="flex flex-col items-start justify-center">
						<h3 className="text-sm font-medium text-accent-foreground">resume.pdf</h3>
						<p className="text-xs">1 page</p>
					</div>
				</div>
				<div className="resume-group">
					<button>
						<Info />
					</button>
					<Controls />
					<button>
						<Share />
					</button>
					<a href="files/Pin_Horputra_Resume.pdf" download>
						<CircleArrowDown />
					</a>
					{isMobile ? (
						<button>
							<Search />
						</button>
					) : (
						<input type="text" className="border border-muted-foreground/20" placeholder="Search" />
					)}
				</div>
			</div>
			<div className="resume-group text-center text-xs">resume.pdf</div>
		</div>
	);
};

const ResumeWindow = () => {
	return (
		<TransformWrapper minScale={0.5} maxScale={4} initialScale={1} smooth={true} wheel={{ wheelDisabled: false, step: 1, smoothStep: 0.01 }} panning={{ velocityDisabled: true, wheelPanning: true }}>
			{Window({
				id: WINDOW_IDS.RESUME,
				title: apps[WINDOW_IDS.RESUME].label,
				children: <Resume />,
				customizeTitleBar: <TitleBar />,
			})}
		</TransformWrapper>
	);
};

export default ResumeWindow;
