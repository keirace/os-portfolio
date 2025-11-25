export const getDateTime = () => {
	const formatter = new Intl.DateTimeFormat("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
	const date = new Date();
	return formatter.format(date).replaceAll(",", "");
};