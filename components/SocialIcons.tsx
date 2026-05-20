type Variant = 'nav' | 'footer' | 'contact';

const links = [
  {
    name: 'GitHub',
    href: 'https://github.com/rajman123',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.48 2 2 6.58 2 12.25c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49v-1.71c-2.78.62-3.37-1.36-3.37-1.36-.46-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.13-4.55-5.04 0-1.11.39-2.02 1.03-2.74-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85.004 1.7.12 2.5.34 1.9-1.32 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.74 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.9v2.81c0 .27.18.6.69.49C19.13 20.57 22 16.75 22 12.25 22 6.58 17.52 2 12 2Z"
        />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/rajveergehani',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
      </svg>
    ),
  },
];

export function SocialIcons({ variant = 'nav' }: { variant?: Variant }) {
  const sizes: Record<Variant, string> = {
    nav: 'w-4 h-4',
    footer: 'w-5 h-5',
    contact: 'w-5 h-5',
  };
  const wrap: Record<Variant, string> = {
    nav: 'gap-3',
    footer: 'gap-4',
    contact: 'gap-4',
  };
  return (
    <div className={`flex items-center ${wrap[variant]}`}>
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.name}
          className="text-bone-300 hover:text-accent transition-colors duration-300"
        >
          <span className={sizes[variant]}>{l.icon}</span>
        </a>
      ))}
    </div>
  );
}
