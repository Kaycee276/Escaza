const Achievements = () => (
	<div className=" rounded-2xl p-6 shadow-sm border border-[var(--border)]">
		<h3 className="font-bold mb-4">Achievements</h3>
		<div className="space-y-3">
			<div className="flex items-center space-x-3">
				<div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
					<span className="text-lg">🏆</span>
				</div>
				<div>
					<p className="font-medium text-[var(--text-secondary)]">First Week</p>
					<p className="text-xs text-[var(--text-tertiary)]">
						Completed 0 entries
					</p>
				</div>
			</div>
			<div className="flex items-center space-x-3">
				<div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
					<span className="text-lg">🔥</span>
				</div>
				<div>
					<p className="font-medium text-[var(--text-secondary)]">
						No achievements yet
					</p>
					<p className="text-xs text-[var(--text-tertiary)]">
						0 day writing streak
					</p>
				</div>
			</div>
		</div>
	</div>
);

export default Achievements;
