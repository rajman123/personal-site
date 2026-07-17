'use client';

import { useEffect } from 'react';

const CALENDLY_URL =
  'https://calendly.com/rajveergehani/intro-call?hide_gdpr_banner=1&background_color=ffffff&text_color=1a1613&primary_color=d97706';

/**
 * Inline Calendly booking widget — visitors pick a slot on the page,
 * no redirect. Loads Calendly's official widget.js once and renders the
 * inline embed into the styled container below.
 */
export function CalendlyInline() {
  useEffect(() => {
    const SRC = 'https://assets.calendly.com/assets/external/widget.js';
    // Avoid injecting the script more than once (client-side nav, StrictMode).
    if (document.querySelector(`script[src="${SRC}"]`)) return;
    const script = document.createElement('script');
    script.src = SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="calendly-inline-widget mt-11 overflow-hidden rounded-2xl border border-accent/15 bg-white"
      data-url={CALENDLY_URL}
      style={{ minWidth: '320px', width: '100%', height: 'clamp(640px, 90vh, 780px)' }}
    />
  );
}
