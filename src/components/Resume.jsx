import { Document, pdfjs, Page } from "react-pdf";
import Window from "./Window";
import { Download } from "lucide-react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

const Resume = () => {
	return (
		// <div>
			<Document file="/files/Pin_Horputra_Resume.pdf" loading="Loading resume...">
				<Page pageNumber={1} width={600} renderTextLayer renderAnnotationLayer className="bg-black" />
			</Document>
		// </div>
	);
};

const TitleBar = () => {
	return (
		<>
			<div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-secondary-foreground">
				<img src="/images/pdf.png" alt="Resume Icon" className="w-4 h-4" />
				<span>resume.pdf</span>
			</div>
			<a href="files/Pin_Horputra_Resume.pdf" download>
				<Download className="w-4 h-4" />
			</a>
		</>
	);
};

const ResumeWindow = () =>
	Window({
		title: "resume",
		children: <Resume />,
		customizeTitleBar: <TitleBar />,
	});

export default ResumeWindow;
