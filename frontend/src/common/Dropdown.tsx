import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface CustomDropdownProps<T extends string | number> {
	options: T[];
	value: T;
	onChange: (val: T) => void;
	className?: string;
}

const CustomDropdown = <T extends string | number>({
	options,
	value,
	onChange,
	className = "",
}: CustomDropdownProps<T>) => {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// close dropdown if clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div
			ref={dropdownRef}
			className={`relative inline-block text-left ${className}`}
		>
			{/* Button */}
			<button
				type="button"
				onClick={() => setOpen((prev) => !prev)}
				className="flex items-center justify-between gap-2 w-44 px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-sm"
			>
				<span>{String(value)}</span>
				<ChevronDown
					className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
				/>
			</button>

			{/* Options */}
			{open && (
				<div className="absolute mt-2 w-44 bg-[var(--bg)] border border-[var(--border)] rounded-lg shadow-lg z-20">
					{options.map((opt) => (
						<div
							key={String(opt)}
							onClick={() => {
								onChange(opt);
								setOpen(false);
							}}
							className={`px-3 py-1 cursor-pointer text-sm rounded-lg hover:bg-[var(--bg-tertiary)] ${
								opt === value
									? "text-[var(--accent)] font-semibold"
									: "text-[var(--text)]"
							}`}
						>
							{String(opt)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default CustomDropdown;
