import { Brain, Lock } from "lucide-react";

interface AIAssistantProps {
	aiReadyIn: number;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ aiReadyIn }) => (
	<div className=" rounded-2xl p-6 shadow-sm border border-[var(--border)]">
		<div className="flex items-center space-x-3 mb-4">
			<div className="p-2 bg-purple-100 rounded-lg">
				<Brain className="h-5 w-5 text-purple-600" />
			</div>
			<h3 className="font-bold ">AI Assistant</h3>
		</div>
		<p className="text-sm text-[var(--text-secondary)] mb-4">
			{aiReadyIn > 0
				? `${aiReadyIn} more entries needed to unlock AI auto-completion`
				: "AI auto-completion is ready!"}
		</p>
		<button
			disabled={aiReadyIn > 0}
			className={`w-full p-3 rounded-xl font-medium transition-all ${
				aiReadyIn > 0
					? "bg-[var(--bg-tertiary)] text-slate-400 cursor-not-allowed"
					: "bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90 cursor-pointer "
			}`}
		>
			{aiReadyIn > 0 ? (
				<span className="inline-flex items-center justify-center gap-2">
					Locked
					<Lock className="h-4 w-4" />
				</span>
			) : (
				"Generate Entries"
			)}
		</button>
	</div>
);

export default AIAssistant;
