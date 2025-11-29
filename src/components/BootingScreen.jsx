import { useEffect } from "react";
import useSystemStore, { BOOTING_IDS, BOOTING_TEXT_MAP } from "@store/system";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useWindowsStore from "@store/window";

const BootingScreen = () => {
	const isBooting = useSystemStore((state) => state.isBooting);
	const bootingText = useSystemStore((state) => state.bootingText);
	const { closeAllWindows } = useWindowsStore();

	useGSAP(() => {
		gsap.fromTo(
			"#booting-screen",
			{ opacity: 0, ease: "power2.inOut", duration: 2 },
			{ opacity: 1, duration: 1, ease: "power2.inOut" },
		);
	}, [isBooting]);

	useEffect(() => {
		// Close all windows when booting starts
		if (isBooting && [BOOTING_TEXT_MAP[BOOTING_IDS.RESTART], BOOTING_TEXT_MAP[BOOTING_IDS.SHUTDOWN]].includes(bootingText)) {
			closeAllWindows();
		}
	}, [isBooting, closeAllWindows, bootingText]);

	return (
		<div id="booting-screen" className="min-h-screen flex items-center justify-center bg-black text-white">
			<div className="flex flex-col items-center">
				{bootingText && (
					<>
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
						<p>{bootingText}</p>
					</>
				)}
			</div>
		</div>
	);
};

export default BootingScreen;
