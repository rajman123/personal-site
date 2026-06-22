'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Action = {
  id: string;
  label: string;
  hint: string;
  kind: 'scroll' | 'link';
  target: string; // anchor id or url
};

const ACTIONS: Action[] = [
  { id: 'top', label: 'Go to top', hint: 'Section', kind: 'scroll', target: 'top' },
  { id: 'about', label: 'About', hint: 'Section', kind: 'scroll', target: 'about' },
  { id: 'experience', label: 'Experience', hint: 'Section', kind: 'scroll', target: 'experience' },
  { id: 'projects', label: 'Projects', hint: 'Section', kind: 'scroll', target: 'projects' },
  { id: 'skills', label: 'Skills', hint: 'Section', kind: 'scroll', target: 'skills' },
  { id: 'interests', label: 'Interests', hint: 'Section', kind: 'scroll', target: 'interests' },
  { id: 'contact', label: 'Contact', hint: 'Section', kind: 'scroll', target: 'contact' },
  { id: 'call', label: 'Book a call', hint: 'Calendly ↗', kind: 'link', target: 'https://calendly.com/rajveergehani/intro-call' },
  { id: 'email', label: 'Email Rajveer', hint: 'Mail ↗', kind: 'link', target: 'mailto:gehani@bc.edu' },
  { id: 'linkedin', label: 'LinkedIn', hint: 'linkedin.com ↗', kind: 'link', target: 'https://linkedin.com/in/rajveer-gehani' },
  { id: 'github', label: 'GitHub', hint: 'github.com ↗', kind: 'link', target: 'https://github.com/rajman123' },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ACTIONS;
    return ACTIONS.filter((a) => a.label.toLowerCase().includes(q) || a.hint.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    setActive(0);
  }, [query, open]);

  // Global open/close via ⌘K / Ctrl+K and a custom event from the top bar.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-command-palette', onOpen as EventListener);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-command-palette', onOpen as EventListener);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      // focus after paint
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  function run(action: Action) {
    setOpen(false);
    if (action.kind === 'scroll') {
      const el = document.getElementById(action.target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const isExternal = action.target.startsWith('http');
      if (isExternal) window.open(action.target, '_blank', 'noopener,noreferrer');
      else window.location.href = action.target;
    }
  }

  function onListKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[active]) run(results[active]);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[18vh]"
      onMouseDown={() => setOpen(false)}
    >
      <div className="absolute inset-0 bg-ink-900/20 backdrop-blur-[2px]" aria-hidden />
      <div
        role="dialog"
        aria-label="Command palette"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onListKey}
        className="relative w-full max-w-lg rounded-xl border border-paper-200 bg-paper shadow-2xl shadow-ink-900/10 overflow-hidden"
      >
        <div className="flex items-center gap-3 px-4 border-b border-paper-100">
          <span className="font-mono text-xs text-ink-400">›</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a section, or reach out…"
            className="w-full bg-transparent py-3.5 text-[15px] text-ink-900 placeholder:text-ink-400 outline-none"
          />
          <kbd className="font-mono text-[10px] text-ink-400 border border-paper-200 rounded px-1.5 py-0.5">
            esc
          </kbd>
        </div>
        <ul className="max-h-72 overflow-y-auto py-2">
          {results.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-ink-400">No matches.</li>
          )}
          {results.map((a, i) => (
            <li key={a.id}>
              <button
                onMouseEnter={() => setActive(i)}
                onClick={() => run(a)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors ${
                  i === active ? 'bg-paper-50' : ''
                }`}
              >
                <span className="text-[14px] text-ink-900">{a.label}</span>
                <span className="font-mono text-[11px] text-ink-400">{a.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
