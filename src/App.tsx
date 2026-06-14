import { useReveal } from './hooks/useReveal'
import { Nav } from './components/Nav'
import { Logo, Contour } from './components/Logo'
import { Counter } from './components/Counter'
import portrait from './assets/images/tanzia-portrait.jpg'
import desk from './assets/images/tanzia-desk.jpg'
import {
  profile,
  heroSub,
  stats,
  about,
  caseStudies,
  experience,
  brands,
  services,
  processSteps,
  packages,
  testimonials,
} from './data/content'
import './styles/app.css'

function Arrow() {
  return (
    <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function App() {
  useReveal()

  return (
    <>
      <Nav />
      <main id="top">
        {/* ───────────────── HERO ───────────────── */}
        <section className="hero">
          <Contour className="hero__contour hero__contour--tl" />
          <Contour className="hero__contour hero__contour--br" />
          <div className="container hero__inner">
            <div className="hero__copy">
              <p className="eyebrow reveal">The Socials Glow · {profile.pillars.join(' · ')}</p>
              <h1 className="hero__title reveal">
                Transforming brands into <em>growth&nbsp;powerhouses.</em>
              </h1>
              <p className="hero__sub reveal">{heroSub}</p>
              <div className="hero__actions reveal">
                <a href="#contact" className="btn btn--primary">
                  Let’s work together <Arrow />
                </a>
                <a href="#work" className="btn btn--ghost">
                  See the results
                </a>
              </div>
              <p className="hero__meta reveal">
                <span>{profile.title}</span>
                <span className="dot" />
                <span>{profile.reach}</span>
              </p>
            </div>

            <div className="hero__media reveal">
              <div className="hero__photo">
                <img src={portrait} alt="Tanzia Mehnaz" loading="eager" />
              </div>
              <div className="hero__badge">
                <Logo size={30} />
                <div>
                  <strong>100X</strong>
                  <span>share of voice</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────── BRAND MARQUEE ───────────────── */}
        <section className="marquee" aria-label="Brands I've worked with">
          <div className="marquee__track">
            {[...brands, ...brands].map((b, i) => (
              <span key={i} className="marquee__item">
                {b}
                <span className="marquee__star">✦</span>
              </span>
            ))}
          </div>
        </section>

        {/* ───────────────── STATS ───────────────── */}
        <section className="section section--dark stats">
          <Contour className="stats__contour" />
          <div className="container">
            <p className="eyebrow reveal">By the numbers</p>
            <h2 className="section-title reveal">Growth you can measure.</h2>
            <div className="stats__grid">
              {stats.map((s) => (
                <div className="stat reveal" key={s.label}>
                  <div className="stat__value">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="stat__label">{s.label}</div>
                  <div className="stat__note">{s.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────── ABOUT ───────────────── */}
        <section className="section about" id="about">
          <div className="container about__grid">
            <div className="about__media reveal">
              <img src={desk} alt="Tanzia Mehnaz at work" loading="lazy" />
              <div className="about__sticker">
                <span>4+ yrs</span>
                <small>building growth engines</small>
              </div>
            </div>
            <div className="about__copy">
              <p className="eyebrow reveal">About</p>
              <h2 className="section-title reveal">{about.lead}</h2>
              {about.body.map((p, i) => (
                <p className="about__para reveal" key={i}>
                  {p}
                </p>
              ))}
              <ul className="about__chips reveal">
                {about.chips.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ───────────────── WORK / CASE STUDIES ───────────────── */}
        <section className="section work" id="work">
          <div className="container">
            <p className="eyebrow reveal">Selected work</p>
            <h2 className="section-title reveal">Case studies, not claims.</h2>
            <p className="section-lead reveal">
              Real accounts, real before-and-after. Every number here came from a strategy built
              around the audience.
            </p>

            <div className="work__list">
              {caseStudies.map((cs, i) => (
                <article className={`case reveal ${cs.accent === 'gold' ? 'case--gold' : ''}`} key={cs.client}>
                  <div className="case__index">{String(i + 1).padStart(2, '0')}</div>
                  <div className="case__head">
                    <h3 className="case__client">{cs.client}</h3>
                    <span className="case__niche">{cs.niche}</span>
                  </div>
                  <p className="case__headline">{cs.headline}</p>
                  <p className="case__blurb">{cs.blurb}</p>
                  <div className="case__metrics">
                    {cs.metrics.map((m) => (
                      <div className="metric" key={m.label}>
                        <span className="metric__label">{m.label}</span>
                        <span className="metric__val">
                          {m.from && <em className="metric__from">{m.from}</em>}
                          {m.from && <span className="metric__arrow">→</span>}
                          <strong>{m.to}</strong>
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────── EXPERIENCE ───────────────── */}
        <section className="section section--dark experience">
          <div className="container">
            <p className="eyebrow reveal">Experience</p>
            <h2 className="section-title reveal">Where I’ve driven growth.</h2>
            <div className="timeline">
              {experience.map((e) => (
                <div className="tl-item reveal" key={e.role + e.org}>
                  <div className="tl-item__period">{e.period}</div>
                  <div className="tl-item__body">
                    <h3 className="tl-item__role">
                      {e.role} <span>· {e.org}</span>
                    </h3>
                    <p>{e.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────── SERVICES ───────────────── */}
        <section className="section services" id="services">
          <div className="container">
            <p className="eyebrow reveal">Services</p>
            <h2 className="section-title reveal">How I help brands grow.</h2>
            <div className="services__grid">
              {services.map((s, i) => (
                <div className="service reveal" key={s.title}>
                  <span className="service__num">0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────── PROCESS ───────────────── */}
        <section className="section process" id="process">
          <div className="container">
            <p className="eyebrow reveal">My process</p>
            <h2 className="section-title reveal">A repeatable path to results.</h2>
            <div className="process__grid">
              {processSteps.map((p) => (
                <div className="pstep reveal" key={p.n}>
                  <span className="pstep__n">{p.n}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────── PACKAGES ───────────────── */}
        <section className="section section--dark packages" id="packages">
          <div className="container">
            <p className="eyebrow reveal">Packages</p>
            <h2 className="section-title reveal">Pick a starting point.</h2>
            <p className="section-lead reveal">
              Every engagement is tailored — customisation is always available. Let’s talk and shape
              the right fit.
            </p>
            <div className="packages__grid">
              {packages.map((pk) => (
                <div className={`pkg reveal ${pk.featured ? 'pkg--featured' : ''}`} key={pk.tier}>
                  {pk.featured && <span className="pkg__badge">Most popular</span>}
                  <span className="pkg__tier">{pk.tier}</span>
                  <h3 className="pkg__name">{pk.name}</h3>
                  <ul>
                    {pk.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <span className="pkg__note">Customisation available</span>
                  <a
                    href="#contact"
                    className={`btn ${pk.featured ? 'btn--light' : 'btn--ghost btn--ghost-light'} pkg__cta`}
                  >
                    Enquire
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────── TESTIMONIALS ───────────────── */}
        <section className="section testimonials">
          <div className="container">
            <p className="eyebrow reveal">Kind words</p>
            <h2 className="section-title reveal">Trusted by the founders I work with.</h2>
            <div className="testimonials__grid">
              {testimonials.map((t) => (
                <figure className="quote reveal" key={t.name}>
                  <span className="quote__mark">”</span>
                  <blockquote>{t.quote}</blockquote>
                  <figcaption>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────── CONTACT ───────────────── */}
        <section className="section section--dark contact" id="contact">
          <Contour className="contact__contour" />
          <div className="container contact__inner">
            <p className="eyebrow reveal">Let’s work together</p>
            <h2 className="contact__title reveal">
              Your brand could be the <em>next growth story.</em>
            </h2>
            <p className="section-lead reveal">
              Tell me about your brand and where you want to be. I’ll show you how to get there
              organically.
            </p>
            <div className="contact__actions reveal">
              <a href={`mailto:${profile.email}`} className="btn btn--light">
                {profile.email}
              </a>
              <a href={`tel:${profile.phoneHref}`} className="btn btn--ghost btn--ghost-light">
                {profile.phone}
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--ghost-light">
                LinkedIn <Arrow />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <Logo size={34} />
            <span>The Socials Glow — by {profile.name}</span>
          </div>
          <p className="footer__note">
            © {new Date().getFullYear()} {profile.name}. Transforming brands into growth powerhouses.
          </p>
        </div>
      </footer>
    </>
  )
}
