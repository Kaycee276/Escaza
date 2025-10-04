// I want two formatters here: one for displaying dates in a user-friendly way, and one for just the date part (YYYY-MM-DD)
// The user-friendly format should be like "1st of Jan, 2023"
// The date part format should be like "2023-01-01"

export const formatDateUserFriendly = (dateString: string): string => {
	const date = new Date(dateString);
	// const options: Intl.DateTimeFormatOptions = {
	// 	day: "numeric",
	// 	month: "short",
	// 	year: "numeric",
	// };
	const day = date.getDate();
	const daySuffix = (day: number): string => {
		if (day > 3 && day < 21) return "th";
		switch (day % 10) {
			case 1:
				return "st";
			case 2:
				return "nd";
			case 3:
				return "rd";
			default:
				return "th";
		}
	};
	return `${day}${daySuffix(day)} of ${date.toLocaleDateString("en-US", {
		month: "short",
	})}, ${date.getFullYear()}`;
};

export const formatDateForInput = (dateString: string): string => {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};
