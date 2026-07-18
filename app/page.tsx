"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Icon, IconButton, SocialIcon, type IconName } from "./components/icons";
import { EntryHero } from "./components/entry-hero";

const chapters = [
  ["01", "Intro", "top"],
  ["02", "Problem", "problem"],
  ["03", "Collect", "collect"],
  ["04", "Suppliers", "suppliers"],
  ["05", "Report", "report"],
  ["06", "Security", "security"],
  ["07", "Trusted", "trusted"],
  ["08", "Pricing", "pricing"],
  ["09", "Get started", "contact"],
] as const;

const navMenus = {
  Product: [
    ["Disclera Collect", "Evidence workspace", "/collect", "archive"],
    ["Disclera Suppliers", "Value-chain collaboration", "/suppliers", "users"],
    ["Disclera Report", "Assurance-ready disclosures", "/report", "fileCheck"],
  ],
  Solutions: [
    ["By role", "Finance, sustainability and procurement", "trusted", "building"],
    ["By industry", "A workspace shaped around your context", "suppliers", "globe"],
    ["VSME reporting", "Proportionate reporting for European SMEs", "report", "leaf"],
  ],
  Company: [
    ["About us", "Poland-born, built for Europe", "company", "sparkles"],
    ["Contact", "Talk to the Disclera team", "contact", "mail"],
  ],
} satisfies Record<string, readonly (readonly [string, string, string, IconName])[]>;

const supplierCards = [
  { name: "Zielona Stal", country: "Poland", progress: "3/3", tone: "sage" },
  { name: "Alpina Polska", country: "Poland", progress: "2/3", tone: "rose" },
  { name: "Bałtyk Tekstylia", country: "Poland", progress: "3/3", tone: "paper" },
  { name: "Luma Opakowania", country: "Poland", progress: "1/3", tone: "blue" },
];

const testimonials = [
  {
    quote: "Disclera gave us control and clarity. We cut reporting time by 40% and walk into audits with confidence.",
    initials: "ZL",
    name: "Zofia Lewandowska",
    role: "Head of Sustainability · Grupa Nadwiślańska",
    metric: "40% faster reporting",
    tone: "rose",
  },
  {
    quote: "Our suppliers now understand exactly what is needed. Response quality is higher, and follow-up no longer consumes the whole team.",
    initials: "MN",
    name: "Marta Nowak",
    role: "Procurement Director · Lumen Polska",
    metric: "74% response rate",
    tone: "blue",
  },
  {
    quote: "Finance, sustainability and assurance finally review the same evidence trail. That changed our reporting cycle completely.",
    initials: "JW",
    name: "Jakub Wójcik",
    role: "Finance Controller · Północna Forma",
    metric: "One evidence trail",
    tone: "sage",
  },
];

const faqs = [
  [
    "Is Disclera only for companies in CSRD scope?",
    "No. Disclera supports in-scope reporting teams and the SMEs or suppliers responding to proportionate, VSME-aligned requests.",
  ],
  [
    "Can finance and sustainability teams work together?",
    "Yes. Owners, reviewers, finance leads and assurance providers work from the same controlled evidence trail with clear permissions and sign-offs.",
  ],
  [
    "What makes the evidence audit-ready?",
    "Every datapoint keeps its source, methodology, change history, owner and approval state together, so a reviewer can trace a disclosure back to its evidence.",
  ],
];

function Logo({ reverse = false }: { reverse?: boolean }) {
  return (
    <a className="logo" href="#top" aria-label="Disclera home">
      <Image
        className="brand-logo"
        src={reverse ? "/brand/disclera-logo-reverse.svg" : "/brand/disclera-logo-primary.svg"}
        width={132}
        height={40}
        alt="Disclera"
        priority={!reverse}
        unoptimized
      />
    </a>
  );
}

function Arrow({ down = false }: { down?: boolean }) {
  return <Icon className="arrow" name={down ? "arrowDown" : "arrowUpRight"} size={16} />;
}

function ChapterRail({ active }: { active: string }) {
  const current = chapters.find(([number]) => number === active) ?? chapters[0];
  return (
    <aside className="chapter-rail" aria-hidden="true">
      <span className="chapter-number">{current[0]}</span>
      <span className="chapter-name">{current[1]}</span>
      <span className="chapter-line"><i /></span>
    </aside>
  );
}

function EvidenceCard({ className, icon, title, detail, state }: { className: string; icon: IconName; title: string; detail: string; state: string }) {
  return (
    <div className={`evidence-card ${className}`} data-hero-card>
      <span className="evidence-card-icon"><Icon name={icon} size={15} /></span>
      <span><strong>{title}</strong><small>{detail}</small></span>
      <span className="evidence-state"><Icon name="check" size={10} /> {state}</span>
    </div>
  );
}

export default function Home() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeChapter, setActiveChapter] = useState("01");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [annualBilling, setAnnualBilling] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({ lerp: 0.075, smoothWheel: !reduceMotion, anchors: true });
    const updateScroll = () => ScrollTrigger.update();
    const raf = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", updateScroll);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      if (reduceMotion) return;

      gsap.from("[data-hero-reveal]", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.11,
        ease: "power3.out",
      });
      gsap.from("[data-hero-card]", {
        scale: 0.9,
        opacity: 0,
        duration: 0.65,
        delay: 0.55,
        stagger: 0.12,
        ease: "back.out(1.5)",
      });
      gsap.to(".hero-ledger", {
        yPercent: 11,
        rotate: 1.2,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".hero-copy", {
        yPercent: -8,
        opacity: 0.45,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "45% top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".chapter-line i", {
        scaleY: 1,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom bottom", scrub: 0.4 },
      });

      gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((section) => {
        const chapter = section.dataset.chapter ?? "01";
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveChapter(chapter),
          onEnterBack: () => setActiveChapter(chapter),
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-story-reveal]").forEach((element, index) => {
        const direction = index % 2 === 0 ? -38 : 38;
        gsap.from(element, {
          x: direction,
          y: 22,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 84%", toggleActions: "play none none reverse" },
        });
      });

      gsap.from(".problem-collage", {
        xPercent: 12,
        rotate: 2.5,
        ease: "none",
        scrollTrigger: { trigger: ".problem-story", start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.from(".collect-window", {
        y: 90,
        scale: 0.94,
        ease: "none",
        scrollTrigger: { trigger: ".collect-story", start: "top 80%", end: "45% 45%", scrub: 1 },
      });
      gsap.from(".collect-row", {
        x: 35,
        opacity: 0,
        stagger: 0.12,
        scrollTrigger: { trigger: ".collect-window", start: "top 65%", toggleActions: "play none none reverse" },
      });
      gsap.fromTo(
        ".supplier-track",
        { xPercent: 10 },
        {
          xPercent: -21,
          ease: "none",
          scrollTrigger: { trigger: ".supplier-story", start: "top top", end: "bottom bottom", scrub: 1 },
        },
      );
      gsap.to(".supplier-landscape", {
        xPercent: 3,
        scale: 1.035,
        ease: "none",
        scrollTrigger: { trigger: ".supplier-story", start: "top top", end: "bottom bottom", scrub: 1 },
      });
      gsap.fromTo(
        ".report-stack",
        { yPercent: 10, rotate: -2 },
        {
          yPercent: -5,
          rotate: 1,
          ease: "none",
          scrollTrigger: { trigger: ".report-story", start: "top bottom", end: "bottom top", scrub: 1 },
        },
      );
      gsap.to(".security-aperture", {
        rotate: 12,
        scale: 1.05,
        ease: "none",
        scrollTrigger: { trigger: ".security-story", start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.from(".trust-stat", {
        y: 32,
        opacity: 0,
        stagger: 0.12,
        scrollTrigger: { trigger: ".trust-stats", start: "top 80%", toggleActions: "play none none reverse" },
      });
      const testimonialViewport = rootRef.current?.querySelector<HTMLElement>(".testimonial-viewport");
      const testimonialTrack = rootRef.current?.querySelector<HTMLElement>(".testimonial-track");
      if (testimonialViewport && testimonialTrack && window.innerWidth > 900) {
        ScrollTrigger.create({
          trigger: ".trusted-story",
          start: "top top+=74",
          end: "bottom bottom",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const distance = testimonialTrack.scrollWidth - testimonialViewport.clientWidth;
            gsap.set(testimonialTrack, { x: -distance * self.progress });
          },
          onRefresh: (self) => {
            const distance = testimonialTrack.scrollWidth - testimonialViewport.clientWidth;
            gsap.set(testimonialTrack, { x: -distance * self.progress });
          },
        });
        gsap.from(".testimonial-card", {
          y: 42,
          opacity: 0,
          stagger: 0.12,
          scrollTrigger: { trigger: ".trusted-story", start: "top 70%", toggleActions: "play none none reverse" },
        });
      }
    }, rootRef);

    const resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh());
    resizeObserver.observe(rootRef.current);

    return () => {
      resizeObserver.disconnect();
      context.revert();
      lenis.off("scroll", updateScroll);
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  const closeNavigation = () => {
    setMobileMenu(false);
    setOpenMenu(null);
  };

  return (
    <main id="top" ref={rootRef}>
      <EntryHero />
      <ChapterRail active={activeChapter} />

      <header className="site-header">
        <div className="nav-shell">
          <Logo />
          <nav className={mobileMenu ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">
            {Object.entries(navMenus).map(([label, items]) => (
              <div className="nav-group" key={label}>
                <button
                  className="nav-trigger"
                  type="button"
                  aria-expanded={openMenu === label}
                  onClick={() => setOpenMenu(openMenu === label ? null : label)}
                >
                  {label} <Icon name="chevronDown" size={13} />
                </button>
                <div className={openMenu === label ? "nav-popover is-open" : "nav-popover"}>
                  {items.map(([name, description, target, icon]) => (
                    <a href={target.startsWith("/") ? target : `#${target}`} key={name} onClick={closeNavigation}>
                      <span><Icon name={icon} size={17} /></span>
                      <span><strong>{name}</strong><small>{description}</small></span>
                      <Icon name="arrowUpRight" size={14} />
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <a href="#security" onClick={closeNavigation}>Security</a>
            <a href="#docs" onClick={closeNavigation}>Docs</a>
            <a href="#pricing" onClick={closeNavigation}>Pricing</a>
          </nav>
          <div className="nav-actions">
            <a className="text-button" href="/sign-in" onClick={closeNavigation}>Sign in</a>
            <a className="button button-dark button-small" href="/demo">Request demo <Arrow /></a>
          </div>
          <IconButton
            className="menu-toggle"
            icon={mobileMenu ? "x" : "menu"}
            iconSize={20}
            label={mobileMenu ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenu(!mobileMenu)}
          />
        </div>
      </header>

      <section className="hero" id="disclera-story" data-chapter="01">
        <div className="hero-grid shell">
          <div className="hero-copy">
            <p className="kicker" data-hero-reveal>The living ledger</p>
            <h1 data-hero-reveal><span>Evidence,</span><em>in order.</em></h1>
            <p className="hero-intro" data-hero-reveal>
              Disclera turns scattered company evidence into audit-ready CSRD and VSME disclosures, with clarity, control and confidence.
            </p>
            <div className="hero-actions" data-hero-reveal>
              <a className="button button-dark" href="/demo">Request demo <Arrow /></a>
              <a className="button button-quiet" href="#problem">See how it works <Icon name="play" size={15} /></a>
            </div>
            <div className="hero-credentials" data-hero-reveal>
              <span><Icon name="checkCircle" size={13} /> CSRD ready</span>
              <span><Icon name="checkCircle" size={13} /> VSME aligned</span>
              <span><Icon name="shieldCheck" size={13} /> Built in the EU</span>
            </div>
          </div>

          <div className="ledger-stage" aria-label="Evidence organized into one living ledger">
            <Image
              className="hero-ledger"
              src="/visuals/living-ledger-hero.webp"
              width={1254}
              height={1254}
              alt="A dark archival ledger with color-coded evidence tabs"
              priority
              unoptimized
            />
            <EvidenceCard className="evidence-energy" icon="users" title="Energy datapoint" detail="Owner assigned" state="Verified" />
            <EvidenceCard className="evidence-supplier" icon="file" title="Supplier document" detail="Linked source" state="In review" />
            <EvidenceCard className="evidence-policy" icon="clipboardCheck" title="Policy document" detail="Governance" state="Approved" />
            <EvidenceCard className="evidence-emissions" icon="fileCheck" title="Emissions datapoint" detail="Scope 1 + 2" state="Verified" />
            <div className="assurance-seal" data-hero-card><Icon name="shieldCheck" size={24} /><span>Assurance<br />ready</span></div>
          </div>
        </div>
        <a className="scroll-cue" href="#problem" aria-label="Scroll to the problem section"><span>Scroll to bring order</span><Icon name="arrowDown" size={18} /></a>
      </section>

      <section id="problem" className="story-section problem-story" data-chapter="02">
        <div className="chapter-layout shell">
          <div className="chapter-copy" data-story-reveal>
            <p className="kicker">The problem</p>
            <h2>Scattered evidence.<em>Real risk.</em></h2>
            <p>Evidence lives everywhere: emails, files, spreadsheets and chats. Hard to find, harder to trust. The result is late nights, manual work and audit risk.</p>
            <div className="problem-list">
              <span><Icon name="clock" size={16} /> Late evidence</span>
              <span><Icon name="link" size={16} /> Broken lineage</span>
              <span><Icon name="alert" size={16} /> Review gaps</span>
            </div>
          </div>
          <div className="problem-visual" data-story-reveal>
            <Image className="problem-collage" src="/visuals/evidence-collage.webp" width={1448} height={1086} alt="A layered collage of sustainability evidence documents" unoptimized />
            <span className="collage-note note-one">Need this by Monday</span>
            <span className="collage-note note-two">Which file is final?</span>
          </div>
        </div>
      </section>

      <section id="collect" className="story-section collect-story" data-chapter="03">
        <div className="collect-sticky shell">
          <div className="collect-heading" data-story-reveal>
            <p className="kicker">Disclera Collect</p>
            <h2>Turn chaos into a<em>curated workspace.</em></h2>
            <p>Capture anything, from anywhere. Structure it. Tag it. Verify it. One governed source of truth for your team.</p>
            <a className="text-link" href="/collect">Explore Collect <Arrow /></a>
          </div>

          <div className="collect-window" data-story-reveal>
            <div className="collect-topbar">
              <div className="mini-brand"><Image src="/brand/disclera-logo-primary.svg" width={82} height={25} alt="Disclera" unoptimized /></div>
              <span>Evidence workspace</span>
              <IconButton icon="more" iconSize={16} label="Workspace options" />
            </div>
            <div className="collect-body">
              <aside className="collect-nav">
                <span className="collect-nav-title">Collect</span>
                <button className="active"><Icon name="archive" size={14} /> Sources</button>
                <button><Icon name="upload" size={14} /> Uploads</button>
                <button><Icon name="users" size={14} /> Contributors</button>
                <button><Icon name="link" size={14} /> Evidence log</button>
              </aside>
              <div className="collect-main">
                <div className="collect-main-head"><div><span>Recent uploads</span><strong>Evidence ready for review</strong></div><button className="button button-soft"><Icon name="upload" size={14} /> Add evidence</button></div>
                <div className="collect-table-head"><span>Evidence</span><span>Source</span><span>Status</span></div>
                {[
                  ["Energy invoice 2025.pdf", "Manual upload", "Verified", "file"],
                  ["Electricity invoices - Q4", "Email", "In review", "mail"],
                  ["Site audit report - Plant A", "Drive", "Verified", "clipboardCheck"],
                  ["Water usage 2025.xlsx", "API", "Connected", "database"],
                ].map(([name, source, status, icon], index) => (
                  <div className="collect-row" key={name}>
                    <span><i className={`file-tone tone-${index}`}><Icon name={icon as IconName} size={14} /></i><strong>{name}</strong></span>
                    <span>{source}</span>
                    <span className={status === "In review" ? "status-review" : "status-good"}><Icon name={status === "In review" ? "clock" : "check"} size={11} /> {status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="suppliers" className="story-section supplier-story" data-chapter="04">
        <div className="suppliers-sticky">
          <div className="supplier-heading shell" data-story-reveal>
            <div><p className="kicker">Disclera Suppliers</p><h2>Work together.<em>Across Europe.</em></h2></div>
            <p>Invite suppliers. Share what you need. Track responses in real time and keep everyone aligned.</p>
          </div>
          <div className="supplier-track-wrap">
            <div className="supplier-track">
              {supplierCards.map((supplier) => (
                <article className={`supplier-card supplier-${supplier.tone}`} key={supplier.name}>
                  <div className="supplier-card-top"><span><strong>{supplier.name}</strong><small>{supplier.country}</small></span><Icon name="more" size={16} /></div>
                  <span className="response-label">Response received</span>
                  <ul>
                    <li><Icon name="check" size={12} /> Energy</li>
                    <li><Icon name="check" size={12} /> Emissions</li>
                    <li><Icon name={supplier.progress === "3/3" ? "check" : "clock"} size={12} /> Policies</li>
                  </ul>
                  <div className="supplier-progress"><span style={{ width: supplier.progress === "3/3" ? "100%" : supplier.progress === "2/3" ? "66%" : "34%" }} /><small>{supplier.progress}</small></div>
                </article>
              ))}
            </div>
          </div>
          <Image className="supplier-landscape" src="/visuals/supplier-europe-landscape.webp" width={1774} height={887} alt="A connected Central European town representing Disclera suppliers" unoptimized />
        </div>
      </section>

      <section id="report" className="story-section report-story" data-chapter="05">
        <div className="report-layout shell">
          <div className="report-visual" data-story-reveal>
            <Image className="report-stack" src="/visuals/disclosure-stack.webp" width={1448} height={1086} alt="An ordered stack of verified sustainability disclosure pages" unoptimized />
            <div className="evidence-index">
              <span className="evidence-index-title">Evidence linked</span>
              {[
                ["Energy policy 2025", "Verified", "sage"],
                ["Electricity invoices", "Verified", "blue"],
                ["Site audit report", "Verified", "peach"],
              ].map(([name, state, tone]) => <span className="evidence-index-row" key={name}><i className={tone}><Icon name="file" size={12} /></i><small>{name}</small><b><Icon name="check" size={10} /> {state}</b></span>)}
            </div>
          </div>
          <div className="chapter-copy report-copy" data-story-reveal>
            <p className="kicker">Disclera Report</p>
            <h2>Assemble.<em>With confidence.</em></h2>
            <p>Build disclosures with evidence lineage you can trust. Every statement stays connected to its source, owner and approval.</p>
            <ul className="report-points">
              <li><Icon name="checkCircle" size={17} /> ESRS-aligned structure</li>
              <li><Icon name="checkCircle" size={17} /> Review-ready narratives</li>
              <li><Icon name="checkCircle" size={17} /> One-click evidence packs</li>
            </ul>
            <a className="text-link" href="/report">Explore Report <Arrow /></a>
          </div>
        </div>
      </section>

      <section id="security" className="story-section security-story" data-chapter="06">
        <div className="security-layout shell">
          <div className="chapter-copy security-copy" data-story-reveal>
            <p className="kicker">Security</p>
            <h2>Secure by design.<em>Built for trust.</em></h2>
            <p>Enterprise-grade security, privacy and compliance, so your data stays protected through every reporting cycle.</p>
            <a className="text-link" href="#docs">Explore security <Arrow /></a>
          </div>
          <div className="security-visual" data-story-reveal>
            <Image className="security-aperture" src="/visuals/security-aperture.webp" width={1448} height={1086} alt="Layered paper aperture symbolizing protected data" unoptimized />
            <div className="security-list">
              <span><i><Icon name="globe" size={17} /></i><b>EU hosted</b><small>Your data stays in Europe.</small></span>
              <span><i><Icon name="shieldCheck" size={17} /></i><b>ISO 27001</b><small>Certified controls.</small></span>
              <span><i><Icon name="lock" size={17} /></i><b>Encrypted</b><small>In transit and at rest.</small></span>
              <span><i><Icon name="eye" size={17} /></i><b>Audit logs</b><small>Complete review history.</small></span>
            </div>
          </div>
        </div>
      </section>

      <section id="trusted" className="story-section trusted-story" data-chapter="07">
        <div className="trusted-sticky">
          <div className="trusted-layout shell">
            <div className="chapter-copy trusted-copy" data-story-reveal>
              <p className="kicker">Trusted across Europe</p>
              <h2>Control and clarity,<em>without the scramble.</em></h2>
              <p>From SMEs to finance and sustainability teams, Disclera brings order to every reporting relationship.</p>
              <a className="text-link" href="#contact">Read customer stories <Arrow /></a>
            </div>
            <div className="testimonial-viewport" aria-label="Customer stories">
              <div className="testimonial-track">
                {testimonials.map((story, index) => (
                  <article className={`testimonial-card testimonial-${story.tone}`} key={story.name}>
                    <div className="testimonial-top"><Icon name="quote" size={28} /><span>{String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span></div>
                    <blockquote>{story.quote}</blockquote>
                    <div className="testimonial-bottom">
                      <div className="testimonial-person"><span>{story.initials}</span><span><strong>{story.name}</strong><small>{story.role}</small></span></div>
                      <span className="testimonial-metric">{story.metric}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="trust-stats">
              <div className="trust-stat"><strong>40%</strong><span>Less time spent on reporting</span></div>
              <div className="trust-stat"><strong>100%</strong><span>Audit-ready disclosures</span></div>
              <div className="trust-stat"><strong>EU</strong><span>Data residency, always</span></div>
            </div>
          </div>
          <div className="company-strip shell" id="company"><span>GRUPA NADWIŚLAŃSKA</span><span>PÓŁNOCNA FORMA</span><span>ZIELONA STAL</span><span>ALPINA POLSKA</span><span>LUMA OPAKOWANIA</span></div>
        </div>
      </section>

      <section id="pricing" className="story-section pricing-story" data-chapter="08">
        <div className="pricing-heading shell" data-story-reveal>
          <div><p className="kicker">Simple pricing</p><h2>Aligned with your<em>reporting journey.</em></h2></div>
          <div className="billing-control" role="group" aria-label="Billing period">
            <button className={!annualBilling ? "active" : ""} onClick={() => setAnnualBilling(false)}>Monthly</button>
            <button className={annualBilling ? "active" : ""} onClick={() => setAnnualBilling(true)}>Annual <span>Save 16%</span></button>
          </div>
        </div>
        <div className="pricing-grid shell">
          {[
            { name: "Essential", line: "For growing teams", month: "€490", year: "€4,900", detail: "Up to 5 users", features: ["Core modules", "Email support"] },
            { name: "Professional", line: "For scaling operations", month: "€1,290", year: "€12,900", detail: "Up to 20 users", features: ["All modules", "Priority support"], featured: true },
            { name: "Enterprise", line: "For complex reporting", month: "Custom", year: "Custom", detail: "Unlimited users", features: ["Advanced security", "Dedicated success"] },
          ].map((plan) => (
            <article className={plan.featured ? "price-plan featured" : "price-plan"} key={plan.name} data-story-reveal>
              <div><span className="price-name">{plan.name}</span><small>{plan.line}</small></div>
              <strong className="price-value">{annualBilling ? plan.year : plan.month}{plan.year !== "Custom" && <small> / {annualBilling ? "year" : "month"}</small>}</strong>
              <span className="price-detail">{plan.detail}</span>
              <ul>{plan.features.map((feature) => <li key={feature}><Icon name="check" size={12} /> {feature}</li>)}</ul>
              <a className={plan.featured ? "button button-dark" : "button button-outline"} href="/demo">Choose {plan.name} <Arrow /></a>
            </article>
          ))}
          <aside className="pricing-cta" data-story-reveal><p className="kicker">Tailored to you</p><h3>Ready to see Disclera in action?</h3><p>Request a focused demo around your reporting needs.</p><a className="button button-dark" href="/demo">Request demo <Arrow /></a><a className="text-link" href="mailto:hello@disclera.com">Talk to sales <Arrow /></a></aside>
        </div>
      </section>

      <section id="contact" className="story-section contact-story" data-chapter="09">
        <div className="contact-layout shell">
          <div className="chapter-copy contact-copy" data-story-reveal>
            <p className="kicker">Get started</p>
            <h2>Let&apos;s put your<em>evidence in order.</em></h2>
            <p>Book a demo to see Disclera in action with your use cases, reporting calendar and supplier network.</p>
            <div className="contact-meta"><span><Icon name="mail" size={14} /> hello@disclera.com</span><span><Icon name="mapPin" size={14} /> Warsaw · Europe</span></div>
          </div>
          <form className={submitted ? "demo-form is-submitted" : "demo-form"} onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} data-story-reveal>
            {submitted ? (
              <div className="form-success" role="status"><span><Icon name="checkCircle" size={28} /></span><h3>Your demo request is in.</h3><p>We&apos;ll reply within one business day with a few useful questions.</p><button type="button" className="text-link" onClick={() => setSubmitted(false)}>Send another request <Arrow /></button></div>
            ) : (
              <>
                <div className="form-row"><label>Work email<input type="email" placeholder="name@company.com" required /></label><label>Company<input type="text" placeholder="Your company" required /></label></div>
                <label>What are you working on?<select defaultValue="" required><option value="" disabled>Select one</option><option>Preparing CSRD / ESRS disclosures</option><option>Building supplier data workflows</option><option>Creating a VSME report</option><option>Improving evidence and assurance</option></select></label>
                <label className="checkbox-label"><input type="checkbox" required /><span>I agree to be contacted about a Disclera demo.</span></label>
                <button className="button button-dark form-submit" type="submit">Request a demo <Arrow /></button>
                <p className="form-note">No sales sequence. Just a useful conversation.</p>
              </>
            )}
          </form>
        </div>
      </section>

      <section id="docs" className="faq-section">
        <div className="faq-layout shell">
          <div data-story-reveal><p className="kicker">Questions, answered</p><h2>Clarity is part of<em>the product.</em></h2></div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <div className={openFaq === index ? "faq-item open" : "faq-item"} key={question}>
                <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{question}</span><Icon name={openFaq === index ? "minus" : "plus"} size={18} /></button>
                <div className="faq-answer"><p>{answer}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-top shell">
          <div className="footer-brand"><Logo reverse /><p>Evidence for better decisions.</p><div className="footer-socials"><a href="https://www.linkedin.com/company/disclera" aria-label="Disclera on LinkedIn" target="_blank" rel="noreferrer"><SocialIcon name="linkedin" /></a><a href="https://x.com/disclera" aria-label="Disclera on X" target="_blank" rel="noreferrer"><SocialIcon name="x" /></a><a href="https://www.youtube.com/@disclera" aria-label="Disclera on YouTube" target="_blank" rel="noreferrer"><SocialIcon name="youtube" /></a></div></div>
          <div className="footer-links"><div><span>Product</span><a href="/collect">Collect</a><a href="/suppliers">Suppliers</a><a href="/report">Report</a><a href="#security">Security</a></div><div><span>Solutions</span><a href="#trusted">By role</a><a href="#suppliers">By industry</a><a href="#report">CSRD reporting</a><a href="#report">VSME reporting</a></div><div><span>Company</span><a href="#company">About us</a><a href="#docs">Docs</a><a href="#contact">Contact</a><a href="/sign-in">Sign in</a></div></div>
        </div>
        <div className="footer-bottom shell"><span>© 2026 Disclera Sp. z o.o.</span><span>Warsaw · Poland · European Union</span><span><a href="#security">Privacy</a> · <a href="#security">Terms</a></span></div>
      </footer>

    </main>
  );
}
