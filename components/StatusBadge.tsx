import type { ProjectStatus } from '@/data/projects';

const styles: Record<ProjectStatus, { dot: string; label: string; tone: string }> = {
  ongoing: {
    dot: 'bg-amber-500 shadow-[0_0_12px] shadow-amber-500/50 animate-pulse',
    label: 'Ongoing',
    tone: 'text-amber-700',
  },
  live: {
    dot: 'bg-emerald-500 shadow-[0_0_12px] shadow-emerald-500/50 animate-pulse',
    label: 'Live',
    tone: 'text-emerald-700',
  },
  completed: {
    dot: 'bg-bone-300',
    label: 'Completed',
    tone: 'text-bone-300',
  },
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const s = styles[status];
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-900/70 backdrop-blur ring-1 ring-bone-300/10">
      <span className={`block w-1.5 h-1.5 rounded-full ${s.dot}`} />
      <span className={`font-mono text-[10px] uppercase tracking-widest ${s.tone}`}>{s.label}</span>
    </span>
  );
}
