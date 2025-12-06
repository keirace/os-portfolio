import useWindowsStore from "@store/window";
import WeatherWidget from "./WeatherWidget";
import Stickies from "./Stickies";
import DesktopIcon from "./FileIcon";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { WINDOW_IDS, CREDITS } from "@constants";

const Desktop = () => {
	const { openWindow } = useWindowsStore();
	const desktopRef = useRef(null);

	useGSAP(() => {
		gsap.fromTo(
			desktopRef.current,
			{ opacity: 0 },
			{ opacity: 1, duration: 3.5, ease: "power2.out" }
		);
	}, []);

	return (
		<div id="desktop" ref={desktopRef}>
			<WeatherWidget style="absolute top-10 right-5" />
			<Stickies className="top-40 left-10">
				<p>
					<b>Welcome!</b> 😊 why not start exploring by clicking on one of these apps on the desktop?
				</p>
			</Stickies>

			{/* Desktop Icons */}
			<DesktopIcon label="user" icon="/images/folder.png" position="top-60 left-70" onDoubleClick={() => openWindow(WINDOW_IDS.FINDER)} />
			<DesktopIcon label="Racer.app" icon="/images/racer.png" position="top-90 right-10" onDoubleClick={() => openWindow(WINDOW_IDS.RACER)} />
			<DesktopIcon label="resume.pdf" icon="/images/resume.png" position="top-60 right-20" onDoubleClick={() => openWindow(WINDOW_IDS.RESUME)} />
		</div>
	);
};

export default Desktop;
