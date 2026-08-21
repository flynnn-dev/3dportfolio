"use client";

import dynamic from "next/dynamic";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";
import LoadingScreen from "./LoadingScreen";
import SmoothScroll from "./SmoothScroll";
import MagneticButton from "./ui/MagneticButton";
import ProjectCard from "./ProjectCard";
import ContactForm from "./ContactForm";
import { journey, projects, socialLinks, techGroups } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SceneCanvas = dynamic(() => import("./scene/SceneCanvas"), { ssr: false });

const code = `const developer = {\n  name: "John Lorens",\n  role: "Full-Stack Developer",\n  passion: "Building digital experiences",\n  status: "Always learning"\n};`;

export default function Portfolio() {
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((item) => {
        gsap.fromTo(item, { y: 34, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 84%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(".reveal-card").forEach((item, index) => {
        gsap.fromTo(item, { y: 26, opacity: 0, scale: 0.985 }, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.75,
          delay: (index % 4) * 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 88%", once: true },
        });
      });
      gsap.fromTo(".hero-title .line", { yPercent: 105 }, { yPercent: 0, duration: 1.05, stagger: 0.08, ease: "power4.out", delay: 0.9 });
    });
    return () => context.revert();
  }, [reduced]);

  return (
    <SmoothScroll>
      <LoadingScreen />
      <Navbar />
      <SceneCanvas />
      <main id="experience" className="experience">
        <section id="home" className="section hero-section">
          <div className="content hero-content">
            <p className="eyebrow hero-kicker">FULL-STACK WEB DEVELOPER <span>•</span> BSIT STUDENT</p>
            <h1 className="hero-title" aria-label="John Lorens">
              <span className="title-mask"><span className="line">JOHN</span></span>
              <span className="title-mask"><span className="line outline">LORENS</span></span>
            </h1>
            <p className="hero-copy">I build modern, interactive, and scalable web experiences.</p>
            <div className="hero-actions">
              <MagneticButton href="#projects">View My Work</MagneticButton>
              <MagneticButton href="#about" variant="ghost">About Me</MagneticButton>
            </div>
            <a href="#about" className="scroll-cue">Scroll to Explore <span>↓</span></a>
          </div>
        </section>

        <section id="about" className="section align-right">
          <div className="content narrow glass-panel reveal">
            <p className="eyebrow">01 / PROFILE</p>
            <h2>ABOUT ME</h2>
            <p className="lead">I’m John Lorens, a BSIT student and web developer focused on modern web applications, interactive interfaces, and dependable full-stack systems.</p>
            <p className="muted">I enjoy combining clean engineering with thoughtful motion—using the right amount of visual depth without compromising usability or performance.</p>
            <div className="stat-grid">
              <div><strong>FULL-STACK</strong><span>Development</span></div>
              <div><strong>MODERN UI</strong><span>Development</span></div>
              <div><strong>INTERACTIVE</strong><span>Web Experiences</span></div>
            </div>
          </div>
        </section>

        <section id="skills" className="section skills-section">
          <div className="content wide reveal">
            <p className="eyebrow">02 / CAPABILITIES</p>
            <h2>TECH STACK</h2>
            <p className="section-intro">A practical toolkit for building interfaces, full-stack products, data-driven systems, and creative web experiences.</p>
            <div className="tech-grid">
              {techGroups.map((group) => (
                <article key={group.title} className="tech-group glass-panel reveal-card">
                  <h3>{group.title}</h3>
                  <div>{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section project-section">
          <div className="content wide">
            <div className="section-heading reveal">
              <div><p className="eyebrow">03 / FEATURED WORK</p><h2>SELECTED<br />PROJECTS</h2></div>
              <p className="muted">Systems built around real product flows, reusable architecture, and maintainable interfaces.</p>
            </div>
            <div className="projects-grid">
              {projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}
            </div>
          </div>
        </section>

        <section id="journey" className="section journey-section">
          <div className="content wide">
            <p className="eyebrow reveal">04 / EVOLUTION</p>
            <h2 className="reveal">MY JOURNEY</h2>
            <div className="journey-list">
              {journey.map((item) => (
                <article key={item.number} className="journey-item reveal-card">
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.stack}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="code" className="section align-right code-section">
          <div className="content narrow glass-panel reveal">
            <p className="eyebrow">05 / ALWAYS LEARNING</p>
            <h2>CODE WITH<br />INTENT.</h2>
            <pre className="html-code"><code>{code}</code></pre>
            <p className="muted">The tools keep changing. The goal doesn’t: build experiences that are useful, fast, and memorable.</p>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="content wide contact-layout">
            <div className="contact-copy reveal">
              <p className="eyebrow">06 / CONTACT</p>
              <h2>LET&apos;S BUILD<br />SOMETHING</h2>
              <p className="lead">Have a project, idea, or opportunity? Let&apos;s talk.</p>
              <div className="contact-links">
                <a href={`mailto:${socialLinks.email}`}>Email <span>{socialLinks.email}</span></a>
                <a href={socialLinks.github} target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
                <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div><strong>JOHN LORENS</strong><span>Full-Stack Web Developer</span></div>
        <nav aria-label="Footer navigation">
          <a href="#home">Home</a><a href="#about">About</a><a href="#projects">Projects</a><a href="#skills">Skills</a><a href="#contact">Contact</a>
        </nav>
        <div className="footer-bottom">
          <span>GitHub • LinkedIn</span>
          <span>© 2026 John Lorens. Built with React, Three.js &amp; creativity.</span>
        </div>
      </footer>
    </SmoothScroll>
  );
}
