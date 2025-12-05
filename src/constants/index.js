export * from "./navbar";
export * from "./finder";

// Apps for Dock
import { User, FolderOpen, Award, Mail } from "lucide-react";
export const apps = {
	finder: { id: "finder", icon: "/images/finder.png", label: "Finder" },
	settings: { id: "settings", icon: "/images/settings.png", label: "Settings" },
	terminal: { id: "terminal", icon: "/images/terminal.png", label: "Terminal" },
	about: { id: "about", icon: User, color: "text-orange-400", label: "About Me" },
	projects: { id: "projects", icon: FolderOpen, color: "text-blue-400", label: "Projects" },
	skills: { id: "skills", icon: Award, color: "text-pink-400", label: "Skills" },
	contact: { id: "contact", icon: Mail, color: "text-purple-400", label: "Contact" },
	browser: { id: "browser", icon: "/images/safari.png", label: "Safari" },
	resume: { id: "resume", icon: "/images/preview.png", label: "Preview", hidden: true },
	textedit: { id: "textedit", icon: "/images/textedit.png", label: "TextEdit", hidden: true },
	trash: { id: "trash", icon: "/images/trash.png", label: "Trash" },
	clawstrike: { id: "clawstrike", icon: "/images/clawstrike.png", label: "Clawstrike", hidden: true },
	triangle: { id: "triangle-back-to-home", icon: "/images/triangle.jpg", label: "Triangle", hidden: true },
	racer: { id: "racer", icon: "/images/racer.png", label: "Racer", hidden: true },
};

export const tooltipStyle = {
	padding: "0.25rem 0.5rem",
	fontSize: "0.75rem",
	borderRadius: "0.25rem",
	backgroundColor: "var(--color-background)",
	color: "var(--color-foreground)",
	"--tw-ring-color": "var(--ring)",
	"--tw-ring-shadow": "var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor)",
};

export const INITIAL_Z_INDEX = 1;

// Window state configurations
export const WINDOW_DEFAULTS = {
	width: 600,
	height: 400,
	minWidth: 400,
	minHeight: 300,
	isOpen: false,
	isMinimized: false,
	isMaximized: false,
	dockIconPosition: { x: 0, y: 0 },
	position: { x: innerWidth / 2 - 300, y: innerHeight / 2 - 200 },
	zIndex: INITIAL_Z_INDEX,
	data: null,
	title: null,
};

export const WINDOW_IDS = {
	ABOUT: "about",
	PROJECTS: "projects",
	SKILLS: "skills",
	CONTACT: "contact",
	RESUME: "resume",
	TERMINAL: "terminal",
	FINDER: "finder",
	TEXTEDIT: "textedit",
	SAFARI: "browser",
	TRASH: "trash",
	SETTINGS: "settings",
	CLAWSTRIKE: "clawstrike",
	TRIANGLE: "triangle",
	RACER: "racer",
};

export const INITIAL_WINDOW_STATES = {
	[WINDOW_IDS.ABOUT]: {
		...WINDOW_DEFAULTS,
	},
	[WINDOW_IDS.PROJECTS]: {
		...WINDOW_DEFAULTS,
	},
	[WINDOW_IDS.SKILLS]: {
		...WINDOW_DEFAULTS,
	},
	[WINDOW_IDS.CONTACT]: {
		...WINDOW_DEFAULTS,
	},
	[WINDOW_IDS.RESUME]: {
		...WINDOW_DEFAULTS,
		width: 450,
		height: 600,
		position: { x: innerWidth / 2 - 225, y: innerHeight / 2 - 300 },
	},
	[WINDOW_IDS.TERMINAL]: {
		...WINDOW_DEFAULTS,
	},
	[WINDOW_IDS.FINDER]: {
		...WINDOW_DEFAULTS,
	},
	[WINDOW_IDS.TEXTEDIT]: {
		...WINDOW_DEFAULTS,
	},
	[WINDOW_IDS.SAFARI]: {
		...WINDOW_DEFAULTS,
	},
	[WINDOW_IDS.CLAWSTRIKE]: {
		...WINDOW_DEFAULTS,
		width: 680,
		height: 416,
		position: { x: innerWidth / 2 - 340, y: innerHeight / 2 - 220 },
	},
	[WINDOW_IDS.TRIANGLE]: {
		...WINDOW_DEFAULTS,
		width: 680,
		height: 440,
		position: { x: innerWidth / 2 - 300, y: innerHeight / 2 - 300 },
	},
	[WINDOW_IDS.RACER]: {
		...WINDOW_DEFAULTS,
		width: 526,
		height: 436,
		position: { x: innerWidth / 2 - 256, y: innerHeight / 2 - 192 },
	},
	[WINDOW_IDS.TRASH]: {
		...WINDOW_DEFAULTS,
	},
	[WINDOW_IDS.SETTINGS]: {
		...WINDOW_DEFAULTS,
	},
};

export const projects = [
	{
		title: "E-Commerce Platform",
		description:
			"A full-featured e-commerce platform built with Next.js and React, featuring product listings, shopping cart functionality, user authentication, and payment processing using Stripe.",
		image: "/images/ecommerce.png",
		tech: ["Next.js", "React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS", "Better Auth"],
		github: "#",
		demo: "https://ecommerce.pinkaew.me",
	},
	{
		title: "3D Portfolio Coffee Shop",
		description:
			"An interactive 3D portfolio website built with Three.js, featuring a virtual coffee shop environment that guides users through different sections such as About, Projects, and Contact.",
		image: "/images/image.png",
		tech: ["React", "Three.js", "Vite", "Blender"],
		github: "#",
		demo: "https://www.pinkaew.me",
	},
	{
		title: "Library Room Booking (LibCal) Redesign",
		description:
			"A UX redesign of Northeastern University’s library room booking system, including responsive web layouts and a new mobile app design focused on accessibility and student workflows.",
		image: "/images/image.png",
		tech: ["Figma", "UX Research", "Wireframing", "Prototyping"],
		github: "#",
		demo: "#",
	},
];

// Weather
export const WMO_CODES = {
	0: "clear",
	1: "mostly_clear",
	2: "partly_cloudy",
	3: "cloudy",
	45: "dust",
	48: "dust",
	51: "light_rain_showers",
	53: "rain_showers",
	55: "heavy_rain_showers",
	56: "light_snow_showers",
	57: "heavy_snow_showers",
	61: "light_rain",
	63: "rain",
	65: "heavy_rain",
	66: "rain_and_snow",
	67: "rain_and_snow",
	71: "light_snow",
	73: "snow",
	75: "heavy_snow",
	77: "snow_showers",
	95: "thunderstorm",
	96: "hail",
	99: "hail",
};

export const MOCK_WEATHER_DATA = {
	latitude: 42.365166,
	longitude: -71.0618,
	generationtime_ms: 0.1417398452758789,
	utc_offset_seconds: -18000,
	timezone: "America/New_York",
	timezone_abbreviation: "GMT-5",
	elevation: 9.0,
	current_units: { time: "iso8601", interval: "seconds", temperature_2m: "°C", weather_code: "wmo code" },
	current: { time: "2025-11-29T16:45", interval: 900, temperature_2m: 2.1, weather_code: 0, is_day: 1 },
	daily_units: { time: "iso8601", temperature_2m_max: "°C", temperature_2m_min: "°C" },
	daily: { time: ["2025-11-29"], temperature_2m_max: [5.9], temperature_2m_min: [-3.2] },
};

export const COORDINATES = {
	latitude: 42.3601,
	longitude: -71.0589,
};

export const weather_apiURL = (lat, lon) =>
	`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&current=weather_code,temperature_2m,is_day&timezone=auto`;


// Skills and Timeline
import { Code, Database, Cloud, Wrench } from "lucide-react";

export const skillCategories = [
	{
		icon: Code,
		title: "Frontend Development",
		skills: [
			{ name: "React / Next.js", level: 80 },
			{ name: "TypeScript / JavaScript", level: 85 },
			{ name: "Tailwind CSS", level: 70 },
			{ name: "Three.js", level: 70 },
		],
	},
	{
		icon: Database,
		title: "Backend Development",
		skills: [
			{ name: "Node.js / Express", level: 85 },
			{ name: "REST APIs", level: 90 },
			{ name: "Apex (Salesforce)", level: 85 },
		],
	},
	{
		icon: Cloud,
		title: "Cloud & DevOps",
		skills: [
			{ name: "AWS", level: 80 },
			{ name: "Docker", level: 70 },
			{ name: "CI/CD", level: 80 },
		],
	},
	{
		icon: Wrench,
		title: "Tools & Databases",
		skills: [
			{ name: "Git", level: 90 },
			{ name: "PostgreSQL", level: 60 },
			{ name: "MongoDB", level: 80 },
			{ name: "MySQL", level: 80 },
		],
	},
];

export const timeline = [
	{
		role: "🎓 Master's Degree in Software Engineering",
		company: "🏫 Northeastern University Boston",
		duration: "📆 2023 - 2025",
		description: "Pursuing advanced studies in software engineering with a focus on full-stack development, cloud computing, and modern software architectures.",
	},
	{
		role: "💻 Software Engineer",
		company: "🏢 Accenture Thailand",
		duration: "📆 2021 - 2023",
		description: "Developed and maintained Salesforce applications, collaborating with cross-functional teams to deliver high-quality solutions.",
	},
	{
		role: "🛠️ Web Developer",
		company: "🏢 THNIC Foundation",
		duration: "📆 2021 - 2021",
		description: "Built and optimized the foundation's website, enhancing user experience and implementing responsive design principles.",
	},
	{
		role: "🎓 Bachelor's Degree in Computer Engineering",
		company: "🏫 Thammasat University",
		duration: "📆 2017 - 2021",
		description: "Completed undergraduate studies in computer engineering, gaining a solid foundation in programming, algorithms, and system design.",
	},
];

export const CREDITS = `Design & Development: Pin Horputra
Inspiration: macOS Sequoia, JS Mastery
Icons: lucide.dev
PDF Viewer: react-pdf
Animations: GSAP
Weather Data: open-meteo.com
State Management: Zustand
Games: js13kgames.com | Racer by jaammees | Triangle: Back To Home by Viktor Uhryn | Clawstrike by Rémi Vansteelandt
Wallpapers: Unsplash | Andreas Gücklhorn | Andre Benz
`;

export const WALLPAPERS = [
	{id: 1, url:"/images/wallpapers/Gold.png", name: "Gold" },
	{id: 2, url:"/images/wallpapers/Blue Violet.png", name: "Blue Violet" },
	{id: 3, url:"/images/wallpapers/andreas-gucklhorn-mawU2PoJWfU-unsplash.jpg", name: "Andreas Gucklhorn"},
	{id: 4, url:"/images/wallpapers/andre-benz-qJfznuTMAYA-unsplash.jpg", name: "Andre Benz"},
];

export const ACCENT_COLORS = [
	{ name: "Blue", class: "oklch(0.577 0.245 237.325)" },
	{ name: "Red", class: "oklch(0.586 0.253 17.585)" },
	{ name: "Green", class: "oklch(0.648 0.2 131.684)" },
	{ name: "Purple", class: "oklch(0.606 0.25 292.717)" },
	{ name: "Yellow", class: "oklch(0.852 0.199 91.936)" },
	{ name: "Pink", class: "oklch(0.7 0.3 340)" },
];