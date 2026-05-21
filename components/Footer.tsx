import Link from 'next/link';
import { SocialIcons } from './SocialIcons';

export function Footer() {
  return (
    <footer className="relative px-6 lg:px-12 py-12 lg:py-16 border-t border-bone-300/10">
      <div className="mx-auto max-w-7xl flex flex-col gap-10 lg:gap-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="font-display text-2xl lg:text-3xl text-bone-50 hover:text-accent transition-colors inline-block mb-3"
            >
              Rajveer <span className="display-italic text-accent">Gehani</span>
            </Link>
            <p className="text-bone-300 text-sm max-w-sm leading-relaxed">
              I build AI agents that run real workflows. Boston / Dubai. Currently shipping{' '}
              <Link href="/work" className="text-accent hover:underline">
                three projects
              </Link>
              .
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-400 mb-4">
              Sitemap
            </p>
            <ul className="space-y-2.5 text-sm">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/work" label="Work" />
              <FooterLink href="/about" label="About" />
              <FooterLink href="/contact" label="Contact" />
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-400 mb-4">
              Find me
            </p>
            <ul className="space-y-2.5 text-sm">
              <FooterLink href="mailto:rajveer@rajveergehani.com" label="Email" external />
              <FooterLink href="https://github.com/rajman123" label="GitHub" external />
              <FooterLink href="https://linkedin.com/in/rajveergehani" label="LinkedIn" external />
              <FooterLink
                href="https://calendly.com/rajveergehani/intro-call"
                label="Book a call"
                external
              />
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-bone-300/10">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-400">
              © {new Date().getFullYear()} Rajveer Gehani — Built in Boston
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-400 flex items-center gap-2">
              <span className="block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Currently available
            </span>
            <SocialIcons variant="footer" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  if (external) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-bone-200 hover:text-accent transition-colors"
        >
          {label}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link href={href} className="text-bone-200 hover:text-accent transition-colors">
        {label}
      </Link>
    </li>
  );
}
