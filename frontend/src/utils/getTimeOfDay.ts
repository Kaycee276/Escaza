const getTimeOfDay = () => {
	const hour = new Date().getHours();

	if (hour < 12) return "morning ☀️";
	if (hour < 16) return "afternoon 🌤️";
	return "evening 🌙";
};

export default getTimeOfDay;
