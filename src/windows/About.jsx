import { MapPin, Briefcase, GraduationCap } from "lucide-react";
import Window from "../components/Window";
import { WINDOW_IDS, apps } from "@constants";
import useWindowsStore from "@store/window";
import { useMemo } from "react";

const About = () => {
	const width = useWindowsStore((state) => state.windows[WINDOW_IDS.ABOUT].width);
	const layoutClass = useMemo(() => (width < 500 ? "flex-col" : "md:flex-row"), [width]);

	return (
		<div className="window-container">
			<div className={`${layoutClass} flex gap-8 items-start`}>
				<div className="shrink-0">
					<img src="/images/pin.PNG" alt="Pinkaew Horputra" loading="lazy" className="w-48 h-48 rounded-full object-cover" />
				</div>

				<div className="flex-1">
					<h1 className="mb-2">Pinkaew Horputra</h1>
					<h2 className="text-accent mb-6">Full Stack Software Engineer</h2>

					<div className="space-y-4 mb-6">
						<div className="flex items-start gap-3">
							<MapPin className="w-5 h-5 text-gray-500 mt-1" />
							<div>
								<p className="">Boston, MA</p>
							</div>
						</div>

						<div className="flex items-start gap-3">
							<Briefcase className="w-5 h-5 text-gray-500 mt-1" />
							<div>
								<p className="">2+ years of experience</p>
							</div>
						</div>

						<div className="flex items-start gap-3">
							<GraduationCap className="w-5 h-5 text-gray-500 mt-1" />
							<div>
								<p className="">MS in Software Engineering</p>
							</div>
						</div>
					</div>

					<div className="space-y-4">
						<p className="">
							Passionate software engineer with expertise in building scalable web applications and cloud-native solutions. I love solving complex problems and creating elegant,
							user-friendly interfaces.
						</p>

						<p>
							My experience spans full-stack development, with a focus on modern JavaScript frameworks, microservices architecture, and DevOps practices. I'm always eager to learn new
							technologies and contribute to innovative projects.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

const AboutWindow = () =>
	Window({
		id: WINDOW_IDS.ABOUT,
		title: apps[WINDOW_IDS.ABOUT].label,
		children: <About />,
	});

export default AboutWindow;
