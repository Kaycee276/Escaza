import { Bell } from "lucide-react";

const NotififcationBtn = () => {
	return (
		<button className="p-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg hover:bg-[var(--bg)] transition-colors relative">
			<Bell className="h-4 w-4 text-[var(--text-tertiary)]" />
			<span className="absolute -top-1 -right-1 h-3 w-3 bg-[var(--error)] rounded-full"></span>
		</button>
	);
};

export default NotififcationBtn;
