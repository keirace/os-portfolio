import Window from "./Window";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { WINDOW_IDS, apps } from "@constants";
import { skillCategories, timeline } from "@constants";

const Skills = () => {

    useGSAP(() => {
        const skillBars = gsap.utils.toArray(".skill-bar > div");
        skillBars.forEach((bar) => {
            const level = bar.getAttribute("data-level");
            gsap.fromTo(
                bar,
                { width: "0%" },
                { width: `${level}%`, duration: 1.5, ease: "power3.inOut" }
            );
        });
    }, []);

	return (
		<div className="window-container">
			<h1 className="text-accent-foreground mb-6">Skills & Technologies</h1>

			<div className="grid md:grid-cols-2 gap-6">
				{skillCategories.map((category, index) => {
					const Icon = category.icon;
					return (
						<div key={index} className="bg-secondary rounded-lg p-6">
							<div className="flex items-center gap-3 mb-4">
								<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
									<Icon className="w-5 h-5 text-blue-600" />
								</div>
								<h3 className="text-accent-foreground">{category.title}</h3>
							</div>

							<div className="space-y-4">
								{category.skills.map((skill, i) => (
									<div key={i}>
										<div className="flex justify-between mb-1">
											<span className="text-accent-foreground">{skill.name}</span>
										</div>
										<div className="w-full bg-popover rounded-full h-2 skill-bar">
											<div className="bg-accent h-2 rounded-full transition-all duration-500" style={{ width: `${skill.level}%` }} data-level={skill.level} />
										</div>
									</div>
								))}
							</div>
						</div>
					);
				})}
			</div>

			<div className="mt-8 bg-secondary rounded-lg p-6">
				<h3 className="text-accent-foreground mb-4">Timeline</h3>
                {timeline.map((exp, index) => (
				<div key={index} className="space-y-4">
					<div className="flex gap-4">
						<div className="flex flex-col items-center">
							<div className="w-3 h-3 bg-accent rounded-full" />
							<div className="w-0.5 h-full bg-blue-200" />
						</div>
						<div className="pb-6">
							<h4 className="text-accent-foreground">{exp.role}</h4>
							<p className="">{exp.company} • {exp.duration}</p>
							<p className="text-accent-foreground mt-1">{exp.description}</p>
						</div>
					</div>

				</div>
                ))}
			</div>
		</div>
	);
};

const SkillsWindow = () =>
	Window({
        id: WINDOW_IDS.SKILLS,
		title: apps[WINDOW_IDS.SKILLS].label,
		children: <Skills />,
	});

export default SkillsWindow;
