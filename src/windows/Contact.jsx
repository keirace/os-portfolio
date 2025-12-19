import { Mail, Send } from "lucide-react";
import { useState } from "react";
import Window from "../components/Window";
import { WINDOW_IDS, apps } from "@constants";
import useWindowsStore from "@store/window";
import emailjs from "@emailjs/browser";

const Contact = () => {
	const width = useWindowsStore((state) => state.windows[WINDOW_IDS.CONTACT].width);
	const isMobile = width <= 768;
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [alert, setAlert] = useState({ show: false, type: "", text: "" });

	const handleSubmit = (e) => {
		e.preventDefault();
		emailjs.send(import.meta.env.VITE_EMAIL_SERVICE_ID, import.meta.env.VITE_EMAIL_TEMPLATE_ID, formData, import.meta.env.VITE_EMAIL_PUBLIC_KEY).then(
			() => {
				setAlert({ show: true, type: "success", text: "Thank you for your message! I'll get back to you soon." });
				setTimeout(() => {
					setAlert({ show: false, type: "", text: "" });
				}, 5000);
				setFormData({ name: "", email: "", message: "" });
			},
			(error) => {
				setAlert({ show: true, type: "error", text: "Failed to send message. Please try again later." });
				setTimeout(() => {
					setAlert({ show: false, type: "", text: "" });
				}, 5000);
				console.error("EmailJS Error:", error);
			}
		);
	};

	const socials = [
		{ icon: Mail, label: "Email", value: "work@pinkaew.me", href: "mailto:work@pinkaew.me" },
		{ icon: "/images/linkedin.webp", label: "LinkedIn", value: "linkedin.com/in/pinkaew-horputra", href: "https://linkedin.com/in/pinkaew-horputra" },
		{ icon: "/images/github-mark.webp", label: "GitHub", value: "github.com/keirace", href: "https://github.com/keirace" },
	];
	return (
		<div className="window-container">
			<h1 className="mb-6">Get In Touch</h1>
			{alert.show && <Alert type={alert.type} text={alert.text} />}

			<div className={`grid ${isMobile? "grid-cols-1" : "grid-cols-2"} gap-y-8`}>
				<div>
					<p className="text-accent-foreground mb-6">I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!</p>

					<div className="space-y-4">
						{socials.map((social, index) => {
							const Icon = social.icon;
							const isImage = typeof Icon === "string";
							return (
								<a key={index} href={social.href} className="flex items-center gap-4 p-4 rounded-lg bg-card hover:bg-accent transition-colors group">
									<div className="w-10 h-10 bg-blue-100 rounded-lg flex-center aspect-square">
										{isImage ? <img src={Icon} alt={social.label} className="w-6 h-6 object-contain" /> : <Icon className="w-5 h-5 text-accent" />}
									</div>
									<div className="flex flex-col">
										<p className="text-secondary-foreground group-hover:text-white">{social.label}</p>
										<p className="text-muted-foreground group-hover:text-white">{social.value}</p>
									</div>
								</a>
							);
						})}
					</div>
				</div>

				<div>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label htmlFor="name" className="block text-secondary-foreground mb-2">
								Name
							</label>
							<input
								type="text"
								id="name"
								value={formData.name}
								onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								className="w-full px-4 py-2 border border-muted-foreground/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
								required
							/>
						</div>

						<div>
							<label htmlFor="email" className="block text-secondary-foreground mb-2">
								Email
							</label>
							<input
								type="email"
								id="email"
								value={formData.email}
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
								className="w-full px-4 py-2 border border-muted-foreground/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
								required
							/>
						</div>

						<div>
							<label htmlFor="message" className="block text-secondary-foreground mb-2">
								Message
							</label>
							<textarea
								id="message"
								value={formData.message}
								onChange={(e) => setFormData({ ...formData, message: e.target.value })}
								rows={5}
								className="w-full px-4 py-2 border border-muted-foreground/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
								required
							/>
						</div>

						<button type="submit" className="w-full bg-accent text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
							<Send className="w-4 h-4" />
							Send Message
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

const Alert = ({ type, text }) => {
	return (
		<div className="absolute top-10 left-0 w-full flex items-center justify-center">
			<div className={`p-2 rounded-lg shadow-lg flex ${type === "error" ? " bg-red-200" : " bg-secondary"}`} role="alert">
				<h2 className={`flex rounded-full text-left text-wrap uppercase px-2 py-1 text-xs font-semibold mr-2 text-white ${type === "error" ? "bg-red-500" : "bg-green-500"}`}>
					{type === "error" ? "Error" : "Success"}
				</h2>
				<p className="mr-2 text-sm text-popover-foreground align-middle">{text}</p>
			</div>
		</div>
	);
};

const ContactWindow = () =>
	Window({
		id: WINDOW_IDS.CONTACT,
		title: apps[WINDOW_IDS.CONTACT].label,
		children: <Contact />,
	});

export default ContactWindow;
