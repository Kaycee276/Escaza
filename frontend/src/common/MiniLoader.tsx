const MiniLoader = () => {
	return (
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
	);
};

export default MiniLoader;
