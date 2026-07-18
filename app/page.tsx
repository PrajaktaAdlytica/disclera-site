"use client";

import { useState } from "react";

const products = [
  {
    key: "collect",
    index: "01",
    name: "Collect",
    eyebrow: "Evidence workspace",
    copy: "Bring documents, metrics, owners, and methodology together in one governed source of truth.",
    points: ["Source-linked datapoints", "Version history", "Owner workflows"],
  },
  {
    key: "suppliers",
    index: "02",
    name: "Suppliers",
    eyebrow: "Value-chain workflow",
    copy: "Run thoughtful supplier campaigns that get you the right information without creating more friction.",
    points: ["VSME-aligned requests", "Smart reminders", "Response quality checks"],
  },
  {
    key: "report",
    index: "03",
    name: "Report",
    eyebrow: "Disclosure builder",
    copy: "Turn approved evidence into clear, ESRS-aligned disclosures your finance team and assurance provider can follow.",
    points: ["ESRS mapping", "Review-ready narratives", "Evidence packs"],
  },
];

const faqs = [
  ["Is Disclera only for companies in CSRD scope?", "No. Disclera is designed for the full reporting chain: in-scope companies building assured disclosures, and SMEs or suppliers responding to proportionate VSME-aligned requests."],
  ["Can finance and sustainability teams work together?", "That is the point. Owners, reviewers, finance leads, and external assurance providers can work from the same evidence trail with clear permissions and sign-offs."],
  ["What makes an evidence trail audit-ready?", "Every datapoint keeps its source, methodology, change history, owner, and approval state together, so reviewers can move from a disclosure back to the evidence behind it."],
];

function Logo() {
  return <a className="logo" href="#top" aria-label="Disclera home"><span className="logo-mark">d</span><span>disclera</span></a>;
}

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState("collect");
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const product = products.find((item) => item.key === activeProduct) ?? products[0];

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main id="top">
      <header className="site-header">
        <div className="nav-shell">
          <Logo />
          <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">
            <a href="#platform" onClick={closeMenu}>Platform</a>
            <a href="#workflow" onClick={closeMenu}>How it works</a>
            <a href="#teams" onClick={closeMenu}>For teams</a>
            <a href="#about" onClick={closeMenu}>About</a>
          </nav>
          <div className="nav-actions">
            <a className="text-link" href="#contact">Talk to us <Arrow /></a>
            <a className="button button-dark button-small" href="#contact">Request a demo <Arrow /></a>
          </div>
          <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span />
          </button>
        </div>
      </header>

      <section className="hero section-pad">
        <div className="hero-grid shell">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> The evidence layer for sustainable business</p>
            <h1>Make every disclosure <em>defensible.</em></h1>
            <p className="hero-intro">Disclera turns scattered company evidence and supplier inputs into clear, audit-ready sustainability disclosures.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#contact">See Disclera in action <Arrow /></a>
              <a className="button button-quiet" href="#platform">Explore the platform <span className="down-arrow">↓</span></a>
            </div>
            <div className="hero-note"><span className="status-dot" /> Built for European reporting teams <span className="note-divider" /> CSRD · ESRS · VSME</div>
          </div>

          <div className="hero-product" aria-label="Disclera reporting workspace preview">
            <div className="product-window">
              <div className="window-topbar"><div className="window-dots"><i /><i /><i /></div><span>acme-industries / reporting</span><span className="window-lock">⌁ protected</span></div>
              <div className="workspace-body">
                <aside className="workspace-sidebar">
                  <div className="mini-brand"><span className="mini-mark">d</span><span>disclera</span></div>
                  <div className="side-label">WORKSPACE</div>
                  <div className="side-item active"><span>◌</span> Overview</div>
                  <div className="side-item"><span>⌁</span> Evidence</div>
                  <div className="side-item"><span>↗</span> Suppliers <b>24</b></div>
                  <div className="side-item"><span>□</span> Disclosures</div>
                  <div className="side-label side-label-gap">REPORTING YEAR</div>
                  <div className="year-select">FY 2025 <span>⌄</span></div>
                  <div className="workspace-user"><span>AK</span><div><strong>Alex Kovac</strong><small>Sustainability lead</small></div></div>
                </aside>
                <div className="workspace-main">
                  <div className="workspace-heading"><div><p className="dash-kicker">MONDAY, 14 APRIL 2026</p><h3>Good morning, Alex</h3></div><button className="icon-button" aria-label="Workspace notifications">♧</button></div>
                  <div className="progress-card"><div className="progress-info"><div><span className="dash-kicker">REPORTING READINESS</span><strong>74% <small>ready to review</small></strong></div><span className="ready-pill">On track</span></div><div className="progress-line"><span /></div><div className="progress-foot"><span>36 of 48 datapoints approved</span><span>12 open items <Arrow /></span></div></div>
                  <div className="dash-grid"><div className="dash-panel"><div className="panel-title"><span>Evidence coverage</span><span className="more">···</span></div><div className="ring-wrap"><div className="ring"><span>82<small>%</small></span></div><div className="legend"><span><i className="green" /> Verified <b>68</b></span><span><i className="yellow" /> In review <b>14</b></span><span><i className="grey" /> Missing <b>8</b></span></div></div></div><div className="dash-panel"><div className="panel-title"><span>By topic</span><span className="more">···</span></div><div className="bar-chart"><span style={{height:"78%"}}><b>E</b></span><span style={{height:"55%"}}><b>S</b></span><span style={{height:"70%"}}><b>G</b></span><span style={{height:"42%"}}><b>V</b></span></div><div className="chart-foot"><span>Environmental</span><span>Social</span><span>Governance</span><span>Value chain</span></div></div></div>
                  <div className="activity-panel"><div className="panel-title"><span>Needs your attention</span><a href="#platform">View all <Arrow /></a></div><div className="activity-row"><span className="activity-icon amber">!</span><div><strong>Approve methodology for E1-5</strong><small>Energy consumption and mix · assigned to you</small></div><span className="activity-time">Today</span></div><div className="activity-row"><span className="activity-icon blue">↗</span><div><strong>Supplier campaign · 8 responses</strong><small>Packaging partners · response window closes in 5 days</small></div><span className="activity-time">2h ago</span></div></div>
                </div>
              </div>
            </div>
            <div className="hero-float float-top"><span className="float-icon">✓</span><div><strong>Evidence approved</strong><small>E1-5 · Energy mix</small></div></div>
            <div className="hero-float float-bottom"><span className="float-icon violet">↗</span><div><strong>Supplier response received</strong><small>Nordform Components</small></div></div>
          </div>
        </div>
        <div className="hero-trust shell"><span>Designed for teams working across</span><div><strong>Finance</strong><strong>Sustainability</strong><strong>Procurement</strong><strong>Assurance</strong></div></div>
      </section>

      <section className="signal-strip"><div className="shell signal-inner"><span className="signal-number">01</span><p>Reporting is only as strong as the evidence behind it.</p><span className="signal-line" /><span className="signal-side">Trace the source. Trust the outcome.</span></div></section>

      <section id="platform" className="platform section-pad shell">
        <div className="section-intro"><p className="eyebrow">One workspace, three connected jobs</p><h2>From first request to <em>final report.</em></h2><p>Disclera gives every person in the reporting chain a clear place to contribute, review, and sign off.</p></div>
        <div className="product-layout">
          <div className="product-tabs" role="tablist" aria-label="Disclera products">{products.map((item) => <button key={item.key} className={activeProduct === item.key ? "product-tab active" : "product-tab"} onClick={() => setActiveProduct(item.key)} role="tab" aria-selected={activeProduct === item.key}><span>{item.index}</span><strong>Disclera {item.name}</strong><Arrow /></button>)}</div>
          <div className="product-detail"><div className="detail-top"><span className="detail-index">{product.index} / 03</span><span className="detail-eyebrow">{product.eyebrow}</span></div><h3>{product.name}<span>.</span></h3><p>{product.copy}</p><ul>{product.points.map((point) => <li key={point}><span>✓</span>{point}</li>)}</ul><a className="inline-link" href="#contact">Explore {product.name} <Arrow /></a><div className="detail-orbit"><span className="orbit-dot dot-one" /><span className="orbit-dot dot-two" /><span className="orbit-dot dot-three" /><div className="orbit-core"><span>{product.index}</span><small>workflow</small></div></div></div>
        </div>
      </section>

      <section id="workflow" className="workflow-band section-pad"><div className="shell"><div className="section-intro intro-wide"><p className="eyebrow">A better reporting rhythm</p><h2>Make progress visible, <em>not painful.</em></h2><p>Replace the annual scramble with an ongoing, shared workspace that keeps context close to every number.</p></div><div className="steps"><div className="step"><span>01</span><div><h3>Collect with context</h3><p>Request the right evidence from the right owner, with guidance built into the workflow.</p></div></div><div className="step"><span>02</span><div><h3>Review with confidence</h3><p>See methodology, source, comments, and approvals alongside every datapoint.</p></div></div><div className="step"><span>03</span><div><h3>Report with clarity</h3><p>Assemble disclosures from approved inputs, ready for finance review and assurance.</p></div></div></div></div></section>

      <section id="teams" className="teams section-pad shell"><div className="team-grid"><div className="team-copy"><p className="eyebrow">For every reporting role</p><h2>Less chasing. More <em>certainty.</em></h2><p>Whether you own the report, the numbers, or the supplier relationship, Disclera makes your next step obvious.</p><a className="inline-link" href="#contact">Find your workflow <Arrow /></a></div><div className="team-list"><div className="team-card"><span className="team-number">A</span><div><h3>Sustainability managers</h3><p>Own the narrative and see exactly where evidence is strong, weak, or missing.</p></div><Arrow /></div><div className="team-card"><span className="team-number">F</span><div><h3>Finance teams</h3><p>Bring controls, ownership, and review discipline to ESG data before close.</p></div><Arrow /></div><div className="team-card"><span className="team-number">S</span><div><h3>Suppliers & SMEs</h3><p>Answer proportionate requests once, with a clear record you can reuse.</p></div><Arrow /></div></div></div></section>

      <section className="quote-band"><div className="shell quote-inner"><span className="quote-mark">“</span><blockquote>Good sustainability reporting is not a writing problem. It is a traceability problem.</blockquote><span className="quote-caption">Disclera point of view</span></div></section>

      <section id="about" className="about section-pad shell"><div className="about-grid"><div><p className="eyebrow">A calmer standard for better reporting</p><h2>Built for the work <em>behind</em> the report.</h2></div><div className="about-copy"><p>Disclera is a Poland-born product company building the evidence and collaboration layer modern European businesses need for sustainability reporting.</p><p>We believe compliance software should be rigorous without being intimidating. Clear enough for a supplier. Structured enough for finance. Ready for assurance.</p><div className="about-meta"><span><strong>EU-first</strong><small>Regulatory context that respects where you operate</small></span><span><strong>Human-led</strong><small>Automation that supports judgement, not replaces it</small></span></div></div></div></section>

      <section id="contact" className="contact-band section-pad"><div className="shell contact-grid"><div className="contact-copy"><p className="eyebrow">Start a conversation</p><h2>See what your reporting could feel like.</h2><p>Tell us a little about your team and we’ll show you how Disclera can fit your reporting cycle.</p><div className="contact-details"><span><b>✉</b> hello@disclera.com</span><span><b>⌖</b> Warsaw · Europe</span></div></div><form className="demo-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><div className="form-row"><label>Work email<input type="email" placeholder="you@company.com" required /></label><label>Company<input type="text" placeholder="Your company" required /></label></div><label>What are you working on?<select defaultValue=""><option value="" disabled>Select one</option><option>Preparing for CSRD / ESRS</option><option>Building supplier data workflows</option><option>Creating a VSME report</option><option>Improving evidence and assurance</option></select></label><label className="checkbox-label"><input type="checkbox" required /><span>I agree to be contacted about the Disclera demo.</span></label><button className="button button-dark form-submit" type="submit">{submitted ? "Thanks — we’ll be in touch" : "Request a private demo"} <Arrow /></button><p className="form-note">No sales sequence. Just a useful conversation.</p></form></div></section>

      <section className="faq section-pad shell"><div className="faq-heading"><p className="eyebrow">Questions, answered</p><h2>Clarity is part of the product.</h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={openFaq === index ? "faq-item open" : "faq-item"} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{question}</span><b>{openFaq === index ? "−" : "+"}</b></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></section>

      <footer className="site-footer"><div className="shell footer-top"><div><Logo /><p>Evidence for better decisions.</p></div><div className="footer-links"><div><span>Explore</span><a href="#platform">Platform</a><a href="#workflow">How it works</a><a href="#teams">For teams</a></div><div><span>Connect</span><a href="#contact">Request a demo</a><a href="mailto:hello@disclera.com">Email us</a><a href="#about">About Disclera</a></div></div></div><div className="shell footer-bottom"><span>© 2026 Disclera Sp. z o.o. · Poland / EU</span><span>CSRD · ESRS · VSME</span><span>Privacy · Terms</span></div></footer>
    </main>
  );
}
