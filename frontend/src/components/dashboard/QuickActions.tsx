import { Plus, Download } from "lucide-react";

interface QuickActionsProps {
	onNewEntry?: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onNewEntry }) => (
	<div className=" rounded-2xl p-6 shadow-sm border border-[var(--border)]">
		<h3 className="font-bold mb-4">Quick Actions</h3>
		<div className="space-y-3">
			<button
				onClick={onNewEntry}
				className="w-full my-accent-bg text-white p-4 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center"
			>
				<Plus className="h-5 w-5 mr-2" />
				New Entry
			</button>
			<button className="w-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] p-4 rounded-xl font-medium hover:bg-[var(--bg-tertiary)] transition-all flex items-center justify-center">
				<Download className="h-5 w-5 mr-2" />
				Export PDF
			</button>
		</div>
	</div>
);

export default QuickActions;
