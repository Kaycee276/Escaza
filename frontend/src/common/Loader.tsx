const Loader = () => {
	return (
		<div className="flex items-center justify-center min-h-screen ">
			<div className="text-center">
				<div className="text-6xl font-bold mb-4 animate-pulse">
					<span
						className="bg-clip-text text-transparent font-mono"
						style={{
							background: "linear-gradient(to bottom right, #f57c20, #1d4ed8)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}
					>
						Escaza
					</span>
				</div>

				<div className="flex justify-center space-x-2">
					<div
						className="w-3 h-3 rounded-full animate-bounce"
						style={{ backgroundColor: "#f57c20", animationDelay: "0ms" }}
					></div>
					<div
						className="w-3 h-3 rounded-full animate-bounce"
						style={{ backgroundColor: "#1d4ed8", animationDelay: "150ms" }}
					></div>
					<div
						className="w-3 h-3 rounded-full animate-bounce"
						style={{ backgroundColor: "#f57c20", animationDelay: "300ms" }}
					></div>
					<div
						className="w-3 h-3 rounded-full animate-bounce"
						style={{ backgroundColor: "#1d4ed8", animationDelay: "450ms" }}
					></div>
					<div
						className="w-3 h-3 rounded-full animate-bounce"
						style={{ backgroundColor: "#f57c20", animationDelay: "600ms" }}
					></div>
				</div>
			</div>
		</div>
	);
};

export default Loader;
