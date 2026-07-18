"use client";

/* eslint-disable @next/next/no-html-link-for-pages */

import Image from "next/image";
import { useState } from "react";
import { Icon, IconButton } from "./icons";

function AccessHeader({ action, actionHref }: { action: string; actionHref: string }) {
  return (
    <header className="access-header">
      <a className="access-logo" href="/" aria-label="Disclera home">
        <Image src="/brand/disclera-logo-primary.svg" width={132} height={40} alt="Disclera" priority unoptimized />
      </a>
      <div><a className="access-back" href="/"><Icon name="arrowLeft" size={14} /> Back to website</a><a className="button button-outline button-small" href={actionHref}>{action}</a></div>
    </header>
  );
}

function AccessFooter() {
  return (
    <footer className="access-footer"><span>© 2026 Disclera Sp. z o.o.</span><span>EU hosted · Warsaw, Poland</span><span><a href="/#security">Privacy</a><a href="/#security">Security</a></span></footer>
  );
}

export function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="access-page sign-in-page">
      <AccessHeader action="Request demo" actionHref="/demo" />
      <section className="access-layout">
        <div className="access-form-column">
          <div className="access-form-wrap">
            <p className="kicker">Workspace access</p>
            <h1>Welcome back<em>to Disclera.</em></h1>
            <p className="access-intro">Sign in to continue to your evidence, supplier campaigns and disclosures.</p>
            {submitted ? (
              <div className="access-success" role="status">
                <span><Icon name="checkCircle" size={24} /></span>
                <h2>Workspace access confirmed.</h2>
                <p>This demo sign-in is complete. A production workspace would continue through your organization&apos;s secure authentication.</p>
                <button className="button button-dark" type="button" onClick={() => setSubmitted(false)}>Return to sign in <Icon name="arrowRight" size={15} /></button>
              </div>
            ) : (
              <form className="access-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
                <label>Work email<input type="email" placeholder="name@company.com" autoComplete="email" required autoFocus /></label>
                <label>Password<span className="password-field"><input type={showPassword ? "text" : "password"} placeholder="Enter your password" autoComplete="current-password" required /><IconButton icon={showPassword ? "eye" : "lock"} iconSize={16} label={showPassword ? "Hide password" : "Show password"} type="button" onClick={() => setShowPassword(!showPassword)} /></span></label>
                <div className="access-options"><label><input type="checkbox" /><span>Keep me signed in</span></label><a href="mailto:support@disclera.com?subject=Disclera%20password%20help">Forgot password?</a></div>
                <button className="button button-dark access-submit" type="submit">Sign in securely <Icon name="arrowRight" size={15} /></button>
                <div className="access-divider"><span>or</span></div>
                <button className="button button-quiet access-submit" type="button"><Icon name="building" size={16} /> Continue with company SSO</button>
              </form>
            )}
            <p className="access-help">Need access to an existing workspace? <a href="mailto:support@disclera.com">Contact support</a></p>
          </div>
        </div>
        <aside className="access-visual-column">
          <div className="access-visual-copy"><p className="kicker">Evidence stays governed</p><h2>Your reporting workspace,<em>protected by design.</em></h2><p>European data residency, role-based access and a complete audit trail protect every reporting cycle.</p></div>
          <div className="access-security-visual">
            <Image src="/visuals/security-aperture.webp" width={1448} height={1086} alt="Layered paper aperture representing secure workspace access" priority unoptimized />
            <div className="access-security-list"><span><Icon name="globe" size={16} /><b>EU hosted</b></span><span><Icon name="shieldCheck" size={16} /><b>ISO 27001 controls</b></span><span><Icon name="lock" size={16} /><b>Encrypted</b></span></div>
          </div>
        </aside>
      </section>
      <AccessFooter />
    </main>
  );
}

export function DemoPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="access-page demo-page">
      <AccessHeader action="Sign in" actionHref="/sign-in" />
      <section className="demo-layout">
        <div className="demo-story">
          <p className="kicker">A focused Disclera demo</p>
          <h1>See your reporting flow,<em>in order.</em></h1>
          <p>Tell us where evidence, suppliers or disclosures create the most work. We&apos;ll tailor the walkthrough to your reporting reality.</p>
          <div className="demo-expectations">
            <span><i><Icon name="calendar" size={17} /></i><b>30 minutes</b><small>A focused product walkthrough</small></span>
            <span><i><Icon name="users" size={17} /></i><b>Your use case</b><small>Built around your team and scope</small></span>
            <span><i><Icon name="fileCheck" size={17} /></i><b>Clear next steps</b><small>No generic sales sequence</small></span>
          </div>
          <div className="demo-ledger-visual">
            <Image src="/visuals/living-ledger-hero.webp" width={1254} height={1254} alt="The Disclera living ledger" priority unoptimized />
            <span><Icon name="checkCircle" size={15} /> Audit-ready evidence</span>
          </div>
        </div>
        <div className="demo-form-column">
          <div className="demo-form-head"><span>{submitted ? "Complete" : `Step ${step} of 2`}</span><div><i className="complete" /><i className={step === 2 || submitted ? "complete" : ""} /></div></div>
          {submitted ? (
            <div className="demo-success" role="status"><span><Icon name="checkCircle" size={24} /></span><p className="kicker">Request received</p><h2>Your tailored demo is taking shape.</h2><p>We&apos;ll reply within one business day with suggested times and a short agenda based on your answers.</p><a className="button button-dark" href="/">Return to Disclera <Icon name="arrowRight" size={15} /></a><button className="text-link" type="button" onClick={() => { setSubmitted(false); setStep(1); }}>Send another request</button></div>
          ) : (
            <form className="demo-page-form" onSubmit={(event) => { event.preventDefault(); if (step === 1) setStep(2); else setSubmitted(true); }}>
              {step === 1 ? (
                <>
                  <div className="demo-form-title"><p className="kicker">About you</p><h2>Start with the essentials.</h2><p>We use this to prepare the right product specialist.</p></div>
                  <div className="demo-two-fields"><label>First name<input type="text" placeholder="Your first name" required autoFocus /></label><label>Last name<input type="text" placeholder="Your last name" required /></label></div>
                  <label>Work email<input type="email" placeholder="name@company.com" required /></label>
                  <div className="demo-two-fields"><label>Company<input type="text" placeholder="Company name" required /></label><label>Role<input type="text" placeholder="Your role" required /></label></div>
                </>
              ) : (
                <>
                  <div className="demo-form-title"><p className="kicker">Your reporting context</p><h2>Make the conversation useful.</h2><p>Choose the answers closest to your current situation.</p></div>
                  <label>What should we focus on?<select defaultValue="" required autoFocus><option value="" disabled>Select a priority</option><option>Collecting and governing evidence</option><option>Supplier and value-chain reporting</option><option>Building CSRD / ESRS disclosures</option><option>Preparing a VSME report</option><option>Assurance and audit readiness</option></select></label>
                  <div className="demo-two-fields"><label>Team size<select defaultValue="" required><option value="" disabled>Select one</option><option>1-5 people</option><option>6-20 people</option><option>21-50 people</option><option>More than 50</option></select></label><label>Timeline<select defaultValue="" required><option value="" disabled>Select one</option><option>Within 30 days</option><option>This quarter</option><option>Next 6 months</option><option>Exploring options</option></select></label></div>
                  <label>Anything we should know?<textarea placeholder="Reporting scope, supplier count, current tools or a specific deadline" rows={4} /></label>
                  <label className="demo-consent"><input type="checkbox" required /><span>I agree to be contacted about a tailored Disclera demo.</span></label>
                </>
              )}
              <div className="demo-form-actions">{step === 2 && <button className="button button-quiet" type="button" onClick={() => setStep(1)}><Icon name="arrowLeft" size={15} /> Back</button>}<button className="button button-dark" type="submit">{step === 1 ? "Continue" : "Request my demo"} <Icon name="arrowRight" size={15} /></button></div>
              <p className="demo-privacy"><Icon name="lock" size={12} /> Your information is handled under EU privacy standards.</p>
            </form>
          )}
        </div>
      </section>
      <AccessFooter />
    </main>
  );
}
