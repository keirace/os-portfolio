import { Document, pdfjs, Page } from "react-pdf";
import Window from "./Window";
import { CircleArrowDown, ChevronDown, ChevronLeft, ChevronRight, PanelLeftIcon, Plus, Expand, ChevronsRight } from "lucide-react";
import useWindowsStore from "@store/window";
import { WINDOW_IDS, apps } from "@constants";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

const Resume = () => {
	return (
		<div className="resume">
			<Document file="/files/Pin_Horputra_Resume.pdf" loading="Loading resume..." className="flex justify-center">
				<Page pageNumber={1} width={600} renderTextLayer renderAnnotationLayer className="bg-black" />
			</Document>
		</div>
	);
};

const TitleBar = () => {
	const { windows } = useWindowsStore();
	const window = windows["resume"];
	const isMobile = window?.width <= 640;

	return (
		<div className="resume title-bar">
			<div>
				<PanelLeftIcon />
				<hr className="border-r border-secondary h-6" />
				<ChevronDown className="w-4 h-4" />
			</div>
			<div>
				<ChevronLeft />
				<ChevronRight />
			</div>
			<div>
				<input type="text" placeholder="Search or enter website name" className="w-20 bg-muted" />
				<input type="text" placeholder="file:///Users/pin/Downloads/resume.pdf" className="flex-1 min-w-0 bg-background" />
			</div>
			{!isMobile && (
				<div>
					<a href="files/Pin_Horputra_Resume.pdf" download>
						<CircleArrowDown className=" hover:bg-muted hover:rounded-sm" />
					</a>
					<Plus />
				</div>
			)}
			{isMobile && (
				<div>
					<ChevronsRight />
				</div>
			)}
		</div>
	);
};

const ResumeWindow = () =>
	Window({
		id: WINDOW_IDS.RESUME,
		title: apps[WINDOW_IDS.RESUME].label,
		children: <Resume />,
		customizeTitleBar: <TitleBar />,
	});

export default ResumeWindow;
