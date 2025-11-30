import useWindowsStore from "@store/window";
import WeatherWidget from "./WeatherWidget";
import Stickies from "./Stickies";
import DesktopIcon from "./FileIcon";

const Desktop = () => {
	const { openWindow } = useWindowsStore();

	return (
		<div id="desktop">
			<WeatherWidget style="absolute top-10 right-5" />
			<Stickies className="top-40 left-10">
				<p>
					<b>Welcome!</b> 😊 why not start exploring by clicking on one of these apps on the desktop?
				</p>
			</Stickies>

			{/* Desktop Icons */}
			<DesktopIcon label="resume.pdf" icon="/images/resume.png" position="bottom-30 right-10" onDoubleClick={() => openWindow("resume")} />
		</div>
	);
};

export default Desktop;
