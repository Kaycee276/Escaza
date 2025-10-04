const Logo = () => {
	return (
		<div className="flex items-center space-x-3">
			<div className="relative">
				<div className=" my-accent-bg w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
					<span className="font-bold text-xl">E</span>
				</div>
			</div>
			<div className="text-2xl font-bold">
				<span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
					Escaza
				</span>
			</div>
		</div>
	);
};

export default Logo;
