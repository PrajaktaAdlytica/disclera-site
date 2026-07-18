"use client";

/* eslint-disable @next/next/no-html-link-for-pages */

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Icon, IconButton, type IconName } from "./icons";

export type ProductKey = "collect" | "suppliers" | "report";

type ProductContent = {
  name: string;
  eyebrow: string;
  headline: string;
  emphasis: string;
  intro: string;
  problemEyebrow: string;
  problemTitle: string;
  problemEmphasis: string;
  problemCopy: string;
  image: string;
  imageAlt: string;
  steps: { title: string; copy: string; icon: IconName }[];
  capabilities: { title: string; copy: string; icon: IconName }[];
  quote: string;
  person: string;
  role: string;
  metric: string;
};

const products: Record<ProductKey, ProductContent> = {
  collect: {
    name: "Collect",
    eyebrow: "Disclera Collect",
    headline: "Bring every piece of evidence",
    emphasis: "into focus.",
    intro: "Bring documents, spreadsheets, metrics, owners, methodologies and comments into one governed evidence workspace.",
    problemEyebrow: "The problem",
    problemTitle: "Scattered inputs.",
    problemEmphasis: "Real risk.",
    problemCopy: "Evidence arrives through inboxes, drives and spreadsheets. Disclera preserves the source, assigns ownership and turns every input into reviewable evidence.",
    image: "/visuals/evidence-collage.webp",
    imageAlt: "A curated collection of sustainability evidence documents",
    steps: [
      { title: "Open a source", copy: "Bring in files, email attachments, links or structured data without losing the original context.", icon: "archive" },
      { title: "Tag and classify", copy: "Connect evidence to the right topic, period, entity, methodology and reporting requirement.", icon: "sparkles" },
      { title: "Assign ownership", copy: "Route evidence to the right contributor and reviewer with clear due dates and permissions.", icon: "users" },
      { title: "Review and approve", copy: "Capture comments, changes and sign-off in one complete audit trail.", icon: "clipboardCheck" },
    ],
    capabilities: [
      { title: "Source-linked datapoints", copy: "Every number keeps its source, owner and methodology together.", icon: "link" },
      { title: "Role-based workflow", copy: "Finance, sustainability and assurance work without overwriting each other.", icon: "users" },
      { title: "Evidence packs", copy: "Export source files, metadata, lineage and approvals in one reviewer-ready pack.", icon: "download" },
    ],
    quote: "Collect replaced a maze of shared drives with one evidence trail our reviewers can actually follow.",
    person: "Elena Rossi",
    role: "ESG Reporting Lead · Asteria Foods",
    metric: "37 verified sources in week one",
  },
  suppliers: {
    name: "Suppliers",
    eyebrow: "Disclera Suppliers",
    headline: "Bring every supplier into the same",
    emphasis: "reporting rhythm.",
    intro: "Create proportionate requests, collect evidence and build assurance-ready value-chain reporting with suppliers across Europe.",
    problemEyebrow: "The problem",
    problemTitle: "Scattered requests.",
    problemEmphasis: "Exhausted suppliers.",
    problemCopy: "Too many questionnaires and unclear ownership create chasing and weak data. Disclera gives every supplier one clear path from invitation to approval.",
    image: "/visuals/supplier-europe-landscape.webp",
    imageAlt: "A Central European town representing a connected supplier network",
    steps: [
      { title: "Choose the audience", copy: "Select suppliers by entity, segment, geography or material value-chain relationship.", icon: "users" },
      { title: "Build the request", copy: "Choose VSME-aligned questions and define the exact evidence required for each response.", icon: "clipboardCheck" },
      { title: "Guide every supplier", copy: "Plain-language guidance, reminders and reusable profiles remove unnecessary back-and-forth.", icon: "send" },
      { title: "Validate and approve", copy: "Quality checks surface missing evidence, unclear answers and late responses before reporting begins.", icon: "checkCircle" },
    ],
    capabilities: [
      { title: "Proportionate by design", copy: "Ask only what is material for that supplier and reporting need.", icon: "leaf" },
      { title: "Live campaign control", copy: "See response rates, risks, completeness and due dates at a glance.", icon: "overview" },
      { title: "End-to-end lineage", copy: "Carry validated supplier data into reporting with its source and timestamp intact.", icon: "link" },
    ],
    quote: "Our suppliers know what to provide, why it matters and when it is due. The quality difference is immediate.",
    person: "Marta Novak",
    role: "Head of Sustainability · Lumen Industries",
    metric: "74% response rate",
  },
  report: {
    name: "Report",
    eyebrow: "Disclera Report",
    headline: "Turn approved evidence into disclosures you",
    emphasis: "can defend.",
    intro: "Assemble structured, audit-ready disclosures from approved evidence and supplier inputs with narrative review and full lineage.",
    problemEyebrow: "The problem",
    problemTitle: "Numbers and narratives",
    problemEmphasis: "drift apart.",
    problemCopy: "Data sits in spreadsheets, policy text lives in documents and comments stay in email. Disclera keeps narrative, evidence and review status connected.",
    image: "/visuals/disclosure-stack.webp",
    imageAlt: "A stack of structured sustainability disclosure pages",
    steps: [
      { title: "Assemble the disclosure", copy: "Start from ESRS or VSME structure and connect each requirement to approved datapoints and evidence.", icon: "book" },
      { title: "Write with context", copy: "Draft narrative beside the source data, methodology, owner and prior reviewer comments.", icon: "file" },
      { title: "Review across teams", copy: "Sustainability, finance, legal and assurance work through clear states and recorded decisions.", icon: "users" },
      { title: "Publish with lineage", copy: "Export disclosures and evidence indexes with a traceable path back to every underlying source.", icon: "fileCheck" },
    ],
    capabilities: [
      { title: "Connected frameworks", copy: "Reuse mapped content across CSRD, ESRS and VSME without recreating evidence.", icon: "link" },
      { title: "Controlled review", copy: "Owners, comments, status and approval stay visible for every disclosure.", icon: "shieldCheck" },
      { title: "Assurance workspace", copy: "Give reviewers a complete evidence index without opening your internal workspace.", icon: "checkCircle" },
    ],
    quote: "We moved from scattered evidence to clear, reviewable disclosures. The source trail changed our audit conversations.",
    person: "Jonas Weber",
    role: "Finance Director · Nordform",
    metric: "98% evidence completeness",
  },
};

function ProductLogo() {
  return (
    <a className="product-logo" href="/" aria-label="Disclera home">
      <Image src="/brand/disclera-logo-primary.svg" width={132} height={40} alt="Disclera" priority unoptimized />
    </a>
  );
}

function ProductVisual({ product }: { product: ProductKey }) {
  const content = products[product];
  if (product === "suppliers") {
    return (
      <div className="product-hero-visual product-network-visual">
        <Image src={content.image} width={1774} height={887} alt={content.imageAlt} priority unoptimized />
        <div className="product-float-card float-invite"><Icon name="mail" size={16} /><span><small>Invitation</small><strong>Blue Steel GmbH</strong><em>View request</em></span></div>
        <div className="product-float-card float-response"><Icon name="checkCircle" size={16} /><span><small>Response received</small><strong>Nordic Components AB</strong><em>Verified</em></span></div>
      </div>
    );
  }

  if (product === "report") {
    return (
      <div className="product-hero-visual product-report-visual">
        <Image src={content.image} width={1448} height={1086} alt={content.imageAlt} priority unoptimized />
        <div className="product-float-card float-lineage"><Icon name="link" size={16} /><span><small>Evidence lineage</small><strong>82% verified</strong><em>4 sources linked</em></span></div>
        <div className="product-float-card float-approval"><Icon name="shieldCheck" size={16} /><span><small>Review status</small><strong>Approved</strong><em>Ready for assurance</em></span></div>
      </div>
    );
  }

  return (
    <div className="product-hero-visual product-collect-visual">
      <Image src={content.image} width={1448} height={1086} alt={content.imageAlt} priority unoptimized />
      <div className="product-mini-window">
        <div><span><Icon name="archive" size={15} /> Collect</span><small>Recent evidence</small></div>
        {["Energy consumption Jan 2025", "Emissions calculation Q4", "Water usage 2024.pdf"].map((item, index) => (
          <span key={item}><i className={`product-file-tone tone-${index}`}><Icon name="file" size={12} /></i><strong>{item}</strong><em><Icon name="check" size={10} /> Verified</em></span>
        ))}
      </div>
      <div className="product-float-card float-source"><Icon name="mail" size={16} /><span><small>From inbox</small><strong>42 new items</strong><em>Ready to classify</em></span></div>
    </div>
  );
}

export function ProductPage({ product }: { product: ProductKey }) {
  const content = products[product];
  const rootRef = useRef<HTMLElement>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({ lerp: 0.075, smoothWheel: !reduceMotion, anchors: true });
    const update = () => ScrollTrigger.update();
    const raf = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      if (reduceMotion) return;
      gsap.from("[data-product-hero]", { y: 30, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" });
      gsap.from(".product-hero-visual", { scale: 0.94, opacity: 0, duration: 1.1, delay: 0.2, ease: "power3.out" });
      gsap.to(".product-hero-visual > img", { yPercent: 8, ease: "none", scrollTrigger: { trigger: ".product-page-hero", start: "top top", end: "bottom top", scrub: 0.8 } });
      gsap.utils.toArray<HTMLElement>("[data-product-reveal]").forEach((element, index) => {
        gsap.from(element, { y: 34, x: index % 2 ? 24 : -24, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 84%", toggleActions: "play none none reverse" } });
      });
      gsap.from(".product-capability", { y: 42, opacity: 0, stagger: 0.12, scrollTrigger: { trigger: ".product-capabilities", start: "top 76%", toggleActions: "play none none reverse" } });
      gsap.to(".product-quote-mark", { rotate: 16, y: -18, ease: "none", scrollTrigger: { trigger: ".product-proof", start: "top bottom", end: "bottom top", scrub: 1 } });
    }, rootRef);

    const observer = new ResizeObserver(() => ScrollTrigger.refresh());
    observer.observe(rootRef.current);
    return () => {
      observer.disconnect();
      context.revert();
      lenis.off("scroll", update);
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  return (
    <main className={`product-page product-page-${product}`} ref={rootRef}>
      <header className="product-header">
        <div className="product-nav-shell">
          <ProductLogo />
          <nav className={mobileMenu ? "product-nav is-open" : "product-nav"} aria-label="Product navigation">
            <a className={product === "collect" ? "active" : ""} href="/collect">Collect</a>
            <a className={product === "suppliers" ? "active" : ""} href="/suppliers">Suppliers</a>
            <a className={product === "report" ? "active" : ""} href="/report">Report</a>
            <a href="/#security">Security</a>
            <a href="/#pricing">Pricing</a>
          </nav>
          <div className="product-nav-actions"><a href="/sign-in">Sign in</a><a className="button button-dark button-small" href="/demo">Request demo <Icon name="arrowUpRight" size={14} /></a></div>
          <IconButton className="product-menu-toggle" icon={mobileMenu ? "x" : "menu"} iconSize={20} label={mobileMenu ? "Close menu" : "Open menu"} onClick={() => setMobileMenu(!mobileMenu)} />
        </div>
      </header>

      <section className="product-page-hero">
        <div className="product-hero-grid product-shell">
          <div className="product-hero-copy">
            <a className="product-breadcrumb" href="/"><Icon name="arrowLeft" size={14} /> Home / Products / {content.name}</a>
            <p className="kicker" data-product-hero>{content.eyebrow}</p>
            <h1 data-product-hero>{content.headline}<em> {content.emphasis}</em></h1>
            <p data-product-hero>{content.intro}</p>
            <div className="product-hero-actions" data-product-hero><a className="button button-dark" href="/demo">See {content.name} in action <Icon name="arrowUpRight" size={15} /></a><a className="button button-quiet" href="#workflow">Explore the workflow <Icon name="play" size={15} /></a></div>
          </div>
          <ProductVisual product={product} />
        </div>
      </section>

      <section className="product-problem">
        <div className="product-problem-grid product-shell">
          <div data-product-reveal><p className="kicker">{content.problemEyebrow}</p><h2>{content.problemTitle}<em>{content.problemEmphasis}</em></h2></div>
          <p data-product-reveal>{content.problemCopy}</p>
          <div className="product-problem-cues" data-product-reveal><span><Icon name="alert" size={16} /> Missing context</span><span><Icon name="clock" size={16} /> Late review</span><span><Icon name="link" size={16} /> Broken lineage</span></div>
        </div>
      </section>

      <section className="product-workflow" id="workflow">
        <div className="product-workflow-heading product-shell" data-product-reveal><p className="kicker">How it works</p><h2>A clear path from input<em>to assurance.</em></h2></div>
        <div className="product-workflow-layout product-shell">
          <div className="product-step-list" role="tablist" aria-label={`${content.name} workflow`}>
            {content.steps.map((step, index) => <button className={activeStep === index ? "active" : ""} key={step.title} type="button" role="tab" aria-selected={activeStep === index} onClick={() => setActiveStep(index)}><span>{String(index + 1).padStart(2, "0")}</span><Icon name={step.icon} size={17} /><strong>{step.title}</strong></button>)}
          </div>
          <div className="product-workflow-window" data-product-reveal>
            <div className="product-window-bar"><span><Image src="/brand/disclera-mark.svg" width={24} height={24} alt="" unoptimized /> {content.name}</span><small>Workspace · FY 2025</small><Icon name="more" size={16} /></div>
            <div className="product-window-body">
              <div className="product-window-copy"><span>Step {String(activeStep + 1).padStart(2, "0")}</span><Icon name={content.steps[activeStep].icon} size={24} /><h3>{content.steps[activeStep].title}</h3><p>{content.steps[activeStep].copy}</p><div className="product-step-progress"><i style={{ width: `${((activeStep + 1) / content.steps.length) * 100}%` }} /></div></div>
              <div className="product-window-list">
                {content.steps.map((step, index) => <span className={index <= activeStep ? "complete" : ""} key={step.title}><i><Icon name={index < activeStep ? "check" : step.icon} size={14} /></i><strong>{step.title}</strong><small>{index < activeStep ? "Complete" : index === activeStep ? "In progress" : "Next"}</small></span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-capabilities">
        <div className="product-capability-heading product-shell" data-product-reveal><p className="kicker">Built for control</p><h2>Clarity at every<em>handoff.</em></h2></div>
        <div className="product-capability-grid product-shell">
          {content.capabilities.map((capability, index) => <article className="product-capability" key={capability.title}><span>{String(index + 1).padStart(2, "0")}</span><Icon name={capability.icon} size={24} /><h3>{capability.title}</h3><p>{capability.copy}</p><a href="/demo" aria-label={`Learn about ${capability.title}`}><Icon name="arrowUpRight" size={16} /></a></article>)}
        </div>
      </section>

      <section className="product-proof">
        <div className="product-proof-grid product-shell">
          <Icon className="product-quote-mark" name="quote" size={24} />
          <blockquote data-product-reveal>{content.quote}</blockquote>
          <div className="product-proof-person" data-product-reveal><span>{content.person.split(" ").map((part) => part[0]).join("")}</span><div><strong>{content.person}</strong><small>{content.role}</small></div></div>
          <div className="product-proof-metric" data-product-reveal><strong>{content.metric}</strong><span>Measured in the first reporting cycle</span></div>
        </div>
      </section>

      <section className="product-final-cta">
        <div className="product-final-grid product-shell">
          <div data-product-reveal><p className="kicker">Ready to get started?</p><h2>Put {content.name.toLowerCase()} to work<em>on your evidence.</em></h2></div>
          <div data-product-reveal><p>See how Disclera fits your reporting scope, workflows and assurance needs.</p><a className="button button-dark" href="/demo">Request a tailored demo <Icon name="arrowUpRight" size={15} /></a></div>
        </div>
      </section>

      <footer className="product-footer">
        <div className="product-footer-grid product-shell"><div><ProductLogo /><p>Evidence for better decisions.</p></div><div><span>Product</span><a href="/collect">Collect</a><a href="/suppliers">Suppliers</a><a href="/report">Report</a></div><div><span>Company</span><a href="/#security">Security</a><a href="/#docs">Docs</a><a href="/#contact">Contact</a></div><div><span>Get started</span><a href="/demo">Request demo</a><a href="/sign-in">Sign in</a><a href="mailto:hello@disclera.com">hello@disclera.com</a></div></div>
        <div className="product-footer-bottom product-shell"><span>© 2026 Disclera Sp. z o.o.</span><span>Warsaw · Poland · European Union</span></div>
      </footer>
    </main>
  );
}
