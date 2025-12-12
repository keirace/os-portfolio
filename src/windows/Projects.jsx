import { ExternalLink } from "lucide-react";
import Window from "../components/Window";
import { projects, WINDOW_IDS, apps } from "@constants";
import useWindowsStore from "@store/window";
import useSystemStore from "@store/system";
import { Fragment, useMemo } from "react";

const Projects = () => {
	const width = useWindowsStore((state) => state.windows[WINDOW_IDS.PROJECTS].width);
	const isDarkMode = useSystemStore((state) => state.isDarkMode);
	const { isMobile, isLgScreen } = useMemo(
		() => ({
			isMobile: width < 600,
			isLgScreen: width >= 1024,
		}),
		[width]
	);

	const githubIcon = useMemo(() => (isDarkMode ? "/images/github-mark-white.png" : "/images/github-mark.png"), [isDarkMode]);
	
	return (
		<div className="window-container">
			<h3 className="mb-6">Featured Projects</h3>

			{Object.keys(projects).map((category) => {
				const Icon = projects[category].icon;
				return (
					<Fragment key={category}>
						<div className="mt-14 headline">
							<div className="icon">
								<Icon />
							</div>
							{projects[category].title}
						</div>

						<div className={`grid ${isLgScreen ? "grid-cols-2" : "grid-cols-1"} gap-6`}>
							{projects[category].items.map((project, index) => (
								<div key={index} className="bg-secondary rounded-lg overflow-hidden hover:shadow-lg transition-shadow mb-6">
									<div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-3"}`}>
										<div className="col-span-1 items-center justify-center flex h-full">
											<img src={project.image} alt={project.title} loading="lazy" className="aspect-square object-cover overflow-hidden h-full" />
										</div>

										<div className={`col-span-2 p-6 flex flex-col justify-between`}>
											<h3 className="text-primary font-medium mb-2">{project.title}</h3>
											<p className="text-secondary-foreground text-sm mb-4">{project.description}</p>

											<div className="flex flex-wrap gap-2 mb-4">
												{project.tech.map((tech, i) => (
													<span key={i} className="px-3 py-1 bg-accent-foreground text-accent rounded-full text-sm">
														{tech}
													</span>
												))}
											</div>

											<div className="flex gap-4">
												{project.github && (
													<a href={project.github} className="link">
														<img src={githubIcon} alt="GitHub" loading="lazy" className="w-4 h-4" />
														<span>Code</span>
													</a>
												)}
												{project.demo && (
													<a href={project.demo} className="link">
														<ExternalLink className="w-4 h-4" />
														<span>Demo</span>
													</a>
												)}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</Fragment>
				);
			})}
		</div>
	);
};

const ProjectsWindow = () =>
	Window({
		id: WINDOW_IDS.PROJECTS,
		title: apps[WINDOW_IDS.PROJECTS].label,
		children: <Projects />,
	});

export default ProjectsWindow;
