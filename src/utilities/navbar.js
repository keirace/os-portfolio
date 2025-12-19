export const getDateTime = () => {
	const shortFormatter = new Intl.DateTimeFormat("en-US", {
			hour: "2-digit",
			minute: "2-digit",
		});
	
	const formatter = new Intl.DateTimeFormat("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
	const date = new Date();

	return { short: shortFormatter.format(date), long: formatter.format(date).replaceAll(",", "")};
};