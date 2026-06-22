'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SocialIcons } from './SocialIcons';

const links = [
  { href: '/work', label: 'Work', num: '01' },
  { href: '/about', label: 'About', num: '02' },
  { href: '/contact', label: 'Contact', num: '03' },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo ${
        scrolled || pathname !== '/'
          ? 'backdrop-blur-md bg-ink-900/70 border-b border-ink-700/60'
          : ''
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-12 h-16 lg:h-20 flex items-center justify-between gap-8">
        <Link
          href="/"
          className="font-display text-xl lg:text-2xl tracking-tight text-bone-50 hover:text-accent transition-colors shrink-0"
        >
          Rajveer <span className="display-italic text-accent">Gehani</span>
        </Link>

        <div className="hidden md:flex items-center gap-10 ml-auto">
          <ul className="flex items-center gap-8 lg:gap-10">
            {links.map((l) => {
              const active = pathname === l.href || pathname?.startsWith(l.href + '/');
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`group flex items-baseline gap-2 text-sm transition-colors ${
                      active ? 'text-bone-50' : 'text-bone-200 hover:text-bone-50'
                    }`}
                  >
                    <span className="font-mono text-[10px] text-accent">{l.num}</span>
                    <span className="relative">
                      {l.label}
                      <span
                        className={`absolute left-0 -bottom-1 h-px bg-accent transition-all duration-500 ease-out-expo ${
                          active ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:flex items-center gap-5 pl-6 border-l border-bone-300/10">
            <SocialIcons variant="nav" />
          </div>

          <Link
            href="/contact"
            className="font-mono text-xs uppercase tracking-widest border border-bone-300/30 text-bone-50 px-4 py-2 rounded-full hover:bg-accent hover:border-accent hover:text-bone-50 transition-all duration-400"
          >
            Book a call
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col items-end gap-1.5 p-2"
        >
          <span
            className={`block h-px w-6 bg-bone-50 transition-all duration-300 ${
              open ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-px w-4 bg-bone-50 transition-all duration-300 ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-px w-6 bg-bone-50 transition-all duration-300 ${
              open ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-ink-900/95 backdrop-blur-lg border-b border-ink-700"
          >
            <ul className="flex flex-col px-6 py-8 gap-6">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex items-baseline gap-3 text-2xl font-display">
                    <span className="font-mono text-xs text-accent">{l.num}</span>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4 border-t border-bone-300/10">
                <SocialIcons variant="footer" />
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-block mt-2 font-mono text-xs uppercase tracking-widest bg-accent text-bone-50 px-5 py-3 rounded-full"
                >
                  Book a call →
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
