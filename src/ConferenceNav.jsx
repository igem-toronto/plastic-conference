function NavArrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export default function ConferenceNav({ current = 'home' }) {
  return (
    <header className="conference-nav">
      <a className="conference-brand" href="#top" aria-label="UofT Microplastics Conference home">
        <span className="conference-brand-mark">UofT</span>
        <span className="conference-brand-name">Microplastics<br />Conference 2026</span>
      </a>

      <nav aria-label="Main navigation">
        <a href="#about">About</a>
        <a href="#/problem" aria-current={current === 'problem' ? 'page' : undefined}>The Problem</a>
        <a href="#program">Program</a>
        <a href="#partners">Partners</a>
        <a href="#tickets">Tickets</a>
      </nav>

      <a className="conference-nav-cta" href="#tickets">
        Get a pass <NavArrow />
      </a>
    </header>
  )
}
