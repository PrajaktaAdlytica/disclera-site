"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon, IconButton } from "./icons";

const entryLinks = [
  ["Home", "#entry"],
  ["Product", "#collect"],
  ["Solutions", "#trusted"],
  ["Security", "#security"],
  ["Docs", "#docs"],
  ["Pricing", "#pricing"],
  ["Company", "#company"],
] as const;

export function EntryHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const restartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrame = 0;
    const fadeDuration = 0.5;

    const updateOpacity = () => {
      const { currentTime, duration } = video;
      if (Number.isFinite(duration) && duration > 0) {
        if (currentTime < fadeDuration) {
          video.style.opacity = String(Math.max(0, currentTime / fadeDuration));
        } else if (duration - currentTime < fadeDuration) {
          video.style.opacity = String(Math.max(0, (duration - currentTime) / fadeDuration));
        } else {
          video.style.opacity = "1";
        }
      }
      animationFrame = requestAnimationFrame(updateOpacity);
    };

    const restartVideo = () => {
      video.style.opacity = "0";
      restartTimerRef.current = setTimeout(() => {
        video.currentTime = 0;
        void video.play().catch(() => undefined);
      }, 100);
    };

    video.addEventListener("ended", restartVideo);
    void video.play().catch(() => undefined);
    animationFrame = requestAnimationFrame(updateOpacity);

    return () => {
      cancelAnimationFrame(animationFrame);
      video.removeEventListener("ended", restartVideo);
      if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <section className="entry-hero entry-font-body" id="entry" aria-label="Disclera introduction">
      <div className="entry-video-layer" aria-hidden="true">
        <video
          ref={videoRef}
          className="entry-video"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
          muted
          playsInline
          preload="auto"
        />
        <div className="entry-video-wash entry-video-wash-top" />
        <div className="entry-video-wash entry-video-wash-bottom" />
      </div>

      <nav className="entry-nav" aria-label="Entry navigation">
        <div className="entry-nav-shell">
          <a className="entry-brand" href="#entry" aria-label="Disclera entry">
            <Image src="/brand/disclera-logo-primary.svg" width={132} height={40} alt="Disclera" priority unoptimized />
            <sup>®</sup>
          </a>
          <div className={menuOpen ? "entry-menu is-open" : "entry-menu"}>
            {entryLinks.map(([label, href], index) => <a className={index === 0 ? "active" : ""} href={href} key={label} onClick={closeMenu}>{label}</a>)}
          </div>
          <div className="entry-nav-actions">
            <a className="entry-sign-in" href="/sign-in">Sign in</a>
            <a className="entry-nav-cta" href="/demo">Request demo <Icon name="arrowUpRight" size={14} /></a>
            <IconButton className="entry-menu-toggle" icon={menuOpen ? "x" : "menu"} iconSize={20} label={menuOpen ? "Close entry menu" : "Open entry menu"} onClick={() => setMenuOpen(!menuOpen)} />
          </div>
        </div>
      </nav>

      <div className="entry-copy">
        <p className="entry-overline entry-fade-rise">Evidence for better decisions</p>
        <h1 className="entry-font-display entry-fade-rise"><span>Beyond <em>reporting,</em></span><span>we bring evidence</span><span><em>into order.</em></span></h1>
        <p className="entry-description entry-fade-rise-delay">Disclera turns scattered company evidence into audit-ready CSRD and VSME disclosures for European teams, suppliers and assurance partners.</p>
        <div className="entry-actions entry-fade-rise-delay-2"><a className="entry-primary-cta" href="#disclera-story">Explore Disclera <Icon name="arrowDown" size={16} /></a><a className="entry-text-cta" href="/demo">Request a tailored demo <Icon name="arrowUpRight" size={14} /></a></div>
      </div>

      <a className="entry-scroll-cue" href="#disclera-story"><span>Enter the living ledger</span><Icon name="arrowDown" size={16} /></a>
    </section>
  );
}
