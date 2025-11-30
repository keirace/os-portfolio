export { navMenus, submenu, navIcons, modeIcon } from "./navbar";

// Apps for Dock
import { User, FolderOpen, Award, Mail, FileUser } from "lucide-react";
export const apps = [
	{ id: "about", icon: User, color: "text-orange-400", label: "About Me" },
	{ id: "projects", icon: FolderOpen, color: "text-blue-400", label: "Projects" },
	{ id: "skills", icon: Award, color: "text-pink-400", label: "Skills" },
	{ id: "contact", icon: Mail, color: "text-purple-400", label: "Contact" },
	{ id: "resume", icon: FileUser, color: "text-green-400", label: "Resume" },
];

export const tooltipStyle = {
	padding: "0.25rem 0.5rem",
	fontSize: "0.75rem",
	borderRadius: "0.25rem",
	backgroundColor: "var(--color-background)",
	color: "var(--color-foreground)",
	"--tw-ring-color": "var(--ring)",
	"--tw-ring-shadow": "var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor)",
};

// export const apps = [
// 	{ id: "about", icon: '/images/finder.png', label: "About Me" },
// 	{ id: "projects", icon: '/images/folder.png', label: "Projects" },
// 	{ id: "skills", icon: '/images/terminal.png', label: "Skills" },
// 	{ id: "contact", icon: '/images/safari.png', label: "Contact" },
// 	{ id: "resume", icon: '/images/pdf.png', label: "Resume" },
// 	{ id: "trash", icon: '/images/trash.png', label: "Trash" },
// ];

export const INITIAL_Z_INDEX = 1;

// Window state configurations
export const WINDOW_DEFAULTS = {
	width: 600,
	height: 400,
	minWidth: 600,
	minHeight: 300,
	isOpen: false,
	isMinimized: false,
	isMaximized: false,
	dockIconPosition: { x: 0, y: 0 },
	position: { x: innerWidth / 2 - 300, y: innerHeight / 2 - 200 },
	zIndex: INITIAL_Z_INDEX,
	data: null,
};

export const WINDOW_IDS = {
	ABOUT: "about",
	PROJECTS: "projects",
	SKILLS: "skills",
	CONTACT: "contact",
	RESUME: "resume",
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
	current: { time: "2025-11-29T16:45", interval: 900, temperature_2m: 2.1, weather_code: 0 },
	daily_units: { time: "iso8601", temperature_2m_max: "°C", temperature_2m_min: "°C" },
	daily: { time: ["2025-11-29"], temperature_2m_max: [5.9], temperature_2m_min: [-3.2] },
};

export const COORDINATES = {
	latitude: 42.3601,
	longitude: -71.0589,
};

export const weather_apiURL = (lat, lon) =>
	`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&current=weather_code,temperature_2m,is_day&timezone=auto`;