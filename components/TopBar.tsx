'use client';

import { useEffect, useState } from 'react';

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export function TopBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function openPalette() {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        scrolled ? 'bg-paper/85 backdrop-blur-md border-b border-paper-100' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-page px-6 h-16 flex items-center justify-between">
        <a href="#top" className="text-[15px] font-semibold tracking-tighter text-ink-900">
          Rajveer Gehani
        </a>

        <div className="hidden sm:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-ink-500 hover:text-ink-900 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          onClick={openPalette}
          aria-label="Open command palette"
          className="flex items-center gap-1.5 text-[11px] font-mono text-ink-400 hover:text-ink-900 transition-colors border border-paper-200 rounded-md px-2 py-1"
        >
          <span className="text-sm leading-none">⌘</span>
          <span>K</span>
        </button>
      </nav>
    </header>
  );
}
