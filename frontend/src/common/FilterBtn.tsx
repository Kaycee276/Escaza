import { useState, useRef } from "react";

import { Filter } from "lucide-react";

import { useClickOutside } from "../hooks/useClickOutside";
// import CustomDropdown from "./Dropdown";

const FilterBtn = ({
	setFilter,
	filter,
}: {
	setFilter: (f: string) => void;
	filter: string;
}) => {
	const [open, setOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);
	useClickOutside(wrapperRef, () => setOpen(false));

	const options = ["all", "completed", "draft"];

	return (
		<div ref={wrapperRef} className="relative">
			<button
				onClick={() => setOpen((prev) => !prev)}
				className="p-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg hover:bg-[var(--bg)] transition-colors"
			>
				<Filter className="h-4 w-4 text-[var(--text-tertiary)]" />
			</button>

			{open && (
				<div className="absolute right-0 mt-2 w-40 bg-[var(--bg)] border border-[var(--border)] rounded-lg shadow-lg p-2 text-sm">
					{options.map((opt) => (
						<p
							key={opt}
							className={`px-2 py-1 cursor-pointer rounded capitalize ${
								filter === opt
									? "text-[var(--accent)] "
									: "hover:bg-[var(--bg-secondary)]"
							}`}
							onClick={() => {
								setFilter(opt);
								setOpen(false);
							}}
						>
							{opt}
						</p>
					))}
				</div>
			)}
			{/* {open && <CustomDropdown options={options} value={"all"} onChange={} />} */}
		</div>
	);
};

export default FilterBtn;
