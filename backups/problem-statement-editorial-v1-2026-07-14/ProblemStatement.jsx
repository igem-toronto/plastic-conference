import { useEffect, useState } from 'react'
import lakeMap from './problem-statement/great-lakes-map.png'
import airbornePlastic from './problem-statement/6.jpg'
import contaminants from './problem-statement/7.jpg'
import agreement from './problem-statement/9.jpg'
import toronto from './problem-statement/12.jpg'
import exposurePathways from './problem-statement/exposure-pathways.png'

const REGISTRATION_URL = 'https://forms.gle/XJAg5c3tc1gP4Xzp9'

const pathways = [
  {
    id: 'water',
    label: 'From water',
    eyebrow: 'Visible pathways',
    title: 'Rivers, drains and litter carry plastic into freshwater.',
    text: 'What we can see is only one part of the system. Plastic fragments continue to break down, move through watersheds and interact with aquatic life.',
    image: airbornePlastic,
    alt: 'Plastic pollution near a freshwater shoreline',
  },
  {
    id: 'air',
    label: 'From air',
    eyebrow: 'Invisible pathways',
    title: 'Microplastics are also falling from the air.',
    text: 'Airborne particles make plastic pollution an issue of both ingestion and inhalation—not only something that enters waterways through visible litter.',
    image: exposurePathways,
    alt: 'Illustration of ingestion and inhalation exposure pathways',
  },
  {
    id: 'chemistry',
    label: 'Carrying chemicals',
    eyebrow: 'Complex pathways',
    title: 'Small particles can carry a complicated chemical load.',
    text: 'In the environment, microplastics can carry colourants, plasticizers and flame retardants: a persistent and chemically complex form of contamination.',
    image: contaminants,
    alt: 'Diagram of contaminants associated with plastic debris',
  },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function SectionHeading({ number, label, title, intro }) {
  return (
    <div className="story-heading story-reveal">
      <p className="story-chapter"><span>{number}</span>{label}</p>
      <h2>{title}</h2>
      {intro && <p className="story-heading-intro">{intro}</p>}
    </div>
  )
}

export default function ProblemStatement() {
  const [activePathway, setActivePathway] = useState(pathways[0])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)

    const onScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight
      setProgress(available > 0 ? (window.scrollY / available) * 100 : 0)
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible')
      }),
      { threshold: 0.12 },
    )

    document.querySelectorAll('.story-reveal').forEach((element) => observer.observe(element))
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="story-page">
      <div className="story-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>

      <header className="story-nav">
        <a className="story-brand" href="#top" aria-label="UofT Microplastics Conference home">
          <span>UofT</span>
          <strong>Microplastics Conference</strong>
        </a>
        <nav aria-label="Problem statement chapters">
          <a href="#freshwater">Freshwater</a>
          <a href="#pathways">Pathways</a>
          <a href="#health">Health</a>
          <a href="#gap">The gap</a>
        </nav>
        <a className="story-nav-cta" href={REGISTRATION_URL} target="_blank" rel="noreferrer">Register interest <ArrowIcon /></a>
      </header>

      <main id="top">
        <section className="story-hero">
          <div className="story-hero-copy story-reveal">
            <p className="story-kicker">The problem that brings us together</p>
            <h1>Microplastics are small.<br /><em>The questions aren’t.</em></h1>
            <p className="story-hero-lead">Freshwater microplastics are widespread, chemically complex and still under-monitored. This conference brings the people who study the problem together with those ready to act on it.</p>
            <div className="story-actions">
              <a className="story-button story-button-primary" href="#freshwater">Explore the evidence <ArrowIcon /></a>
              <a className="story-text-link" href="#conference">Why attend?</a>
            </div>
          </div>
          <div className="story-hero-visual story-reveal" aria-hidden="true">
            <div className="story-water-ring"><span>84%</span><small>of North America’s<br />surface freshwater</small></div>
            {Array.from({ length: 18 }, (_, index) => <i key={index} style={{ '--i': index }} />)}
            <p>One connected system.<br />A problem too large for silos.</p>
          </div>
        </section>

        <aside className="story-summary" aria-label="The problem in one sentence">
          <span>Why this conference?</span>
          <p>The evidence is mounting faster than our shared response. Progress needs research, public understanding and coordinated action in the same room.</p>
        </aside>

        <section className="story-section story-freshwater" id="freshwater">
          <SectionHeading number="01" label="Freshwater at stake" title="The Great Lakes are vast—not invulnerable." intro="They are a globally significant freshwater system and among the most microplastic-contaminated freshwater bodies on Earth." />

          <div className="story-stat-layout">
            <article className="story-stat story-stat-primary story-reveal">
              <strong>84<span>%</span></strong>
              <p>of the surface freshwater in North America is held by the Great Lakes.</p>
            </article>
            <figure className="story-map story-reveal">
              <img src={lakeMap} alt="Map showing Lake Superior, Michigan, Huron, Erie and Ontario" />
            </figure>
            <article className="story-stat story-stat-secondary story-reveal">
              <strong>20<span>%</span></strong>
              <p>of the world’s surface freshwater is held here.</p>
            </article>
          </div>

          <div className="story-risk story-reveal">
            <p className="story-risk-number">90<span>%</span></p>
            <div><p className="story-kicker">A signal we cannot ignore</p><h3>At least 90% of water samples surpass one or more thresholds for risk to aquatic life.</h3></div>
          </div>
        </section>

        <section className="story-section story-pathways" id="pathways">
          <SectionHeading number="02" label="A moving target" title="Plastic pollution travels through more than water." intro="Explore three connected pathways. The route changes, but the particles remain part of the same environmental system." />

          <div className="story-pathway-shell story-reveal">
            <div className="story-tabs" role="tablist" aria-label="Microplastic pathways">
              {pathways.map((pathway) => (
                <button
                  aria-selected={activePathway.id === pathway.id}
                  className={activePathway.id === pathway.id ? 'is-active' : ''}
                  key={pathway.id}
                  onClick={() => setActivePathway(pathway)}
                  role="tab"
                  type="button"
                >
                  <span>0{pathways.indexOf(pathway) + 1}</span>{pathway.label}
                </button>
              ))}
            </div>
            <div className="story-pathway-panel" role="tabpanel" key={activePathway.id}>
              <div className="story-pathway-copy">
                <p className="story-kicker">{activePathway.eyebrow}</p>
                <h3>{activePathway.title}</h3>
                <p>{activePathway.text}</p>
              </div>
              <figure><img src={activePathway.image} alt={activePathway.alt} /></figure>
            </div>
          </div>
        </section>

        <section className="story-section story-health" id="health">
          <SectionHeading number="03" label="Human exposure" title="The environment does not end at the body." intro="Research has detected microplastics in human samples, sharpening questions about how exposure occurs and what it may mean." />
          <div className="story-health-grid">
            <div className="story-health-copy story-reveal">
              <p>Microplastics have been detected in</p>
              <ul>
                <li>human blood</li>
                <li>placental tissue</li>
                <li>gastrointestinal samples</li>
              </ul>
              <p>Evidence suggests exposure may occur through <strong>ingestion and inhalation.</strong></p>
            </div>
            <figure className="story-exposure story-reveal"><img src={exposurePathways} alt="Illustration showing ingestion and inhalation pathways into the human body" /></figure>
          </div>
        </section>

        <section className="story-section story-gap" id="gap">
          <SectionHeading number="04" label="The response gap" title="Mounting evidence. Fragmented monitoring." intro="The science is moving, but policy and coordinated monitoring have not yet caught up." />
          <div className="story-gap-grid">
            <figure className="story-agreement story-reveal"><img src={agreement} alt="Great Lakes Water Quality Agreement publication" /></figure>
            <div className="story-gap-copy story-reveal">
              <p className="story-kicker">Where things stand</p>
              <h3>Microplastics are still not systematically monitored in Canada.</h3>
              <p>They are also not designated as a Chemical of Mutual Concern under the Great Lakes Water Quality Agreement.</p>
              <blockquote>That gap is exactly why shared language, shared evidence and shared priorities matter.</blockquote>
            </div>
          </div>
        </section>

        <section className="story-section story-conference" id="conference">
          <div className="story-conference-visual story-reveal">
            <img src={toronto} alt="Toronto skyline across Lake Ontario" />
            <span>Toronto · 2026</span>
          </div>
          <div className="story-conference-copy story-reveal">
            <p className="story-kicker">From evidence to momentum</p>
            <h2>This is where the conference begins.</h2>
            <p>UofT Microplastics Conference 2026 aims to bridge the gap between research, public awareness and action.</p>
          </div>
          <div className="story-audiences">
            {[
              ['Students', 'Meet the field, ask better questions and find where your work can contribute.'],
              ['Researchers', 'Connect findings across disciplines and build a more complete picture of the problem.'],
              ['Community', 'Bring lived experience, public priorities and action into the research conversation.'],
            ].map(([title, text], index) => (
              <article className="story-audience story-reveal" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </section>

        <section className="story-cta">
          <p className="story-kicker">Students, researchers and community members are welcome</p>
          <h2>Complex problem.<br /><em>One shared room.</em></h2>
          <p>Join us to learn how we can work together toward solutions.</p>
          <div className="story-actions">
            <a className="story-button story-button-primary" href={REGISTRATION_URL} target="_blank" rel="noreferrer">I’m interested <ArrowIcon /></a>
            <a className="story-button story-button-ghost" href="#top">Back to conference home</a>
          </div>
        </section>
      </main>
    </div>
  )
}
