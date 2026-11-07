"use client";
import CountUp from "@/components/CountUp";
import { useState } from "react";
import Motion from "@/components/Motion";
import WorkSlider from "@/components/WorkSlider";
import Founders from "@/components/Founders";
import type { IconType } from "react-icons";
import {
  SiReact, SiNextdotjs, SiJavascript, SiTypescript,
  SiNodedotjs, SiPython, SiMysql, SiMongodb,
} from "react-icons/si";

import {
  ArrowRight, ArrowUpRight, Code2, Layers3, Menu, X, Workflow,
  ShieldCheck, Lightbulb, Check, Braces, Globe2, ChevronDown,
  Mail, Phone, MapPin
} from "lucide-react";

import { FaLinkedinIn, FaInstagram, FaGithub, FaWhatsapp } from "react-icons/fa";
import { FaJava } from "react-icons/fa";


const contact = {
  email: "bvrglobaltech@gmail.com",          // or a company email like hello@bvrglobal.com
  phone: "+91 90599 44959 ",                   // display format
  phoneHref: "+919059944959",                 
  whatsapp: "919059944959",                   // country code + number, no + or spaces
  address: "3-104/3/38 VSSD Nagar Road Number 3,Chengicherla, Hyderabad,Telengana, India 500098",
  mapsUrl: "https://maps.app.goo.gl/CeWWbvabyoExzrP67?g_st=ac",
  hours: "Mon – Sat, 9:00 AM – 5:00 PM IST",
};

const socials = [
  //{ label: "LinkedIn", href: "https://linkedin.com/company/your-page", icon: FaLinkedinIn },
  { label: "Instagram", href: "https://www.instagram.com/bvrglobaltech?srtk=dncya3FrY25yOW83", icon: FaInstagram },
 // { label: "GitHub", href: "https://github.com/BvrGlobalTech", icon: FaGithub },
  { label: "WhatsApp", href: `https://wa.me/${contact.whatsapp}`, icon: FaWhatsapp },
];
const services = [
  {
    number: "01",
    icon: Globe2,
    title: "Web Development",
    description:
      "Responsive business websites and web applications designed to make your brand stand out and help customers take action.",
    tags: ["Business websites", "Web applications", "Responsive design"],
  },
  {
    number: "02",
    icon: Code2,
    title: "Custom Software Development",
    description:
      "Purpose-built software that fits the way your business works — from internal tools to workflow and management platforms.",
    tags: ["Business tools", "Workflow systems", "API integration"],
  },
];

const process = [
  ["01", "Understand", "We start by learning about your business, users, goals and the problem you need to solve."],
  ["02", "Plan & design", "We define the scope, map the experience and choose an appropriate technical approach."],
  ["03", "Build & test", "We develop in focused stages, share progress and test the solution as it takes shape."],
  ["04", "Launch & support", "We prepare your solution for launch and can provide ongoing support based on an agreed scope."],
];
const technologies: { name: string; icon: IconType; color?: string }[] = [
  { name: "React Js", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs },                      // inherits text color
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Java", icon: FaJava, color: "#E76F00" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "React Native", icon: SiReact, color: "#61DAFB" },
];

const faqs = [
  ["What kind of businesses do you work with?", "We focus on startups and small businesses looking to build a website or custom software solution. Share your requirements and we can discuss whether we are a good fit."],
  ["Can you build software based on our requirements?", "Yes. Custom software development starts with understanding your workflow, users and goals. The scope and approach can then be defined together."],
  ["How do we get started?", "Use the contact section to tell us a little about your business and what you want to build. We can take it from there and discuss the next steps."],
];
const stats = [
  {
    number: "50+",
    label: "Projects Completed",
    description: "Digital solutions delivered",
    href: "/projects",
  },
  {
    number: "15+",
    label: "Happy Clients",
    description: "Businesses we've worked with",
  },
  {
    number: "08+",
    label: "Technologies",
    description: "Tools powering our work",
    href: "#technologies",
  },
  {
    number: "20+",
    label: "Solutions Built",
    description: "Ideas transformed into products",
  },
  {
    number: "10",                       // use your real number
    label: "Employees",
    description: "People building with us",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <Motion />

      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#home" onClick={closeMenu} aria-label="BVR Technologies home">
            <span className="brand-mark">BVR<span>.</span></span>
            <span className="brand-copy"><strong>BVR GLOBAL TECHNOLOGIES</strong><small>PRIVATE LIMITED</small></span>
          </a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav className={menuOpen ? "nav-links open" : "nav-links"}>
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#work" onClick={closeMenu}>Services</a>
            <a href="/projects" onClick={closeMenu}>Work</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#approach" onClick={closeMenu}>Our approach</a>

            <a href="#team" onClick={closeMenu}>Team</a>
            <a className="nav-cta nav-apply" href="/apply" onClick={closeMenu}>
              Apply <ArrowUpRight size={16} />
            </a>
            {/* <a className="nav-cta" href="#contact" onClick={closeMenu}>Let's talk <ArrowUpRight size={16} /></a> */}
          </nav>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-grid" />
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> SOFTWARE. STRATEGY. SOLUTIONS.</div>
            <h1>Ideas deserve<br /><span>great technology.</span></h1>
            <p className="hero-lead">
              We design and develop AI-powered web apps, mobile apps, and custom software that help startups and small businesses move forward with confidence.
            </p>
            <div className="hero-actions">

              <a className="text-link" href="#stats-section">Explore  <ArrowRight size={17} /></a>
            </div>
            <div className="hero-note"><span className="note-line" /> A technology partner for your next step.</div>
          </div>
          <div className="hero-visual" aria-label="Abstract technology illustration">
            <div className="visual-ring ring-a" />
            <div className="visual-ring ring-b" />
            <div className="visual-ring ring-c" />
            <div className="visual-core"><Layers3 size={58} strokeWidth={1.15} /></div>
            <div className="float-card card-top"><span className="mini-icon"><Code2 size={15} /></span><span><b>Build with purpose</b><small>Thoughtful engineering</small></span></div>
            <div className="float-card card-bottom"><span className="status-dot" /><span><b>From idea to impact</b><small>One step at a time</small></span></div>
            <div className="visual-cross cross-one">+</div><div className="visual-cross cross-two">+</div>
          </div>
        </div>
        <div className="container hero-bottom">
          <span>BUILT AROUND YOUR BUSINESS</span><span className="hero-bottom-line" /><span>WEB DEVELOPMENT · CUSTOM SOFTWARE</span>
        </div>
      </section>

      <section className="intro section-pad" id="about">
        <div className="container intro-grid">
          <div>
            <div className="section-kicker">WHO WE ARE</div>
            <h2>Technology should make<br className="desktop-break" /> business <span>simpler.</span></h2>
          </div>
          <div className="intro-text">
            <p>
              BVR GLOBAL TECHNOLOGIES Pvt. Ltd. is a software development company focused on helping startups and small businesses turn ideas and everyday challenges into practical digital solutions.
            </p>
            <p>
              We believe good technology is not about adding complexity. It is about understanding what matters, building with care and creating tools people can rely on.
            </p>
            <a className="inline-link" href="#contact">Tell us what you're building <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </section>


      {/* <section className="services section-pad" id="services">
        <div className="container">
          <div className="section-heading">
            <div><div className="section-kicker">WHAT WE DO</div><h2>Our <span>services.</span></h2></div>
            <p>Focused software capabilities to help you establish, improve and grow your digital presence.</p>
          </div>
          <div className="service-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article className="service-card" key={service.number}>
                  <div className="service-top"><span>{service.number} / CAPABILITY</span><div className="service-icon"><Icon size={23} /></div></div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="tag-list">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <a href="#contact" className="service-link">Discuss this service <ArrowUpRight size={17} /></a>
                </article>
              );
            })}
          </div>
        </div>
      </section> */}

      <WorkSlider />

      <section className="approach section-pad" id="approach">
        <div className="container">
          <div className="section-heading">
            <div><div className="section-kicker">HOW WE WORK</div><h2>Clear thinking.<br /><span>Careful execution.</span></h2></div>
            <p>A collaborative process keeps the work transparent, purposeful and aligned with your business goals.</p>
          </div>
          <div className="process-grid">
            {process.map(([number, title, description]) => (
              <article className="process-card" key={number}>
                <div className="process-number">{number}</div>
                <div className="process-line" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
        
      <section className="stack section-pad" id="technologies">
        <div className="container stack-inner">
          <div><div className="section-kicker">OUR TECHNOLOGY TOOLKIT</div><h2>The right tools<br /><span>for the right job.</span></h2></div>
          <div className="stack-content">
            <p>Technology choices should follow the project requirements. Our toolkit can include technologies such as:</p>
            <div className="tech-list">
              {technologies.map(({ name, icon: Icon, color }) => (
                <span key={name}>
                  <Icon size={16} color={color} />
                  {name}
                </span>
              ))}
            </div>
            <small className="stack-note">Specific technologies are selected based on project scope and team capability.</small>
          </div>
        </div>
      </section>

      <section className="why section-pad">
        <div className="container why-grid">
          <div className="why-visual">
            <div className="why-panel">
              <div className="panel-top"><span className="panel-dot" /><span className="panel-dot" /><span className="panel-dot" /><small>BVR / ENGINEERING MINDSET</small></div>
              <div className="code-lines">
                <span><i>01</i> <b>const</b> idea = <em>"your vision"</em>;</span>
                <span><i>02</i> <b>const</b> plan = understand(idea);</span>
                <span><i>03</i> <b>const</b> solution = build(plan);</span>
                <span><i>04</i> <b>return</b> meaningfulImpact(solution);</span>
              </div>
              <div className="panel-footer"><span><Check size={14} /> Thoughtful by design</span><span>BUILD / 001</span></div>
            </div>
            <div className="why-glow" />
          </div>
          <div className="why-copy">
            <div className="section-kicker">THE BVR APPROACH</div>
            <h2>Small details.<br /><span>Meaningful outcomes.</span></h2>
            <p>Choosing a development partner is about more than technology. It is about finding a team that listens, communicates and takes responsibility for the work.</p>
            <div className="why-points">
              <div><Lightbulb size={19} /><span><b>Understand before building</b><small>We focus on the actual problem, not just the feature list.</small></span></div>
              <div><Workflow size={19} /><span><b>Practical, considered solutions</b><small>We aim for the right-sized solution for your needs.</small></span></div>
              <div><ShieldCheck size={19} /><span><b>Clarity throughout</b><small>We value transparent communication and clear expectations.</small></span></div>
            </div>
          </div>
        </div>
      </section>
      <section className="stats-section" id="stats-section">
        <div className="container">
          <div className="stats-heading">
            <div className="section-kicker">OUR JOURNEY IN NUMBERS</div>
            <h2>Small numbers? No.<br />
              <span>Meaningful milestones.</span>
            </h2>
            <p>
              Every number represents an idea, a collaboration
              and a step towards building something meaningful.
            </p>
          </div>
          <div className="stats-grid">
            {stats.map((stat) => {
              const body = (
                <>
                  {/* <h3>{stat.number}</h3> */}
                  <h3><CountUp value={stat.number} /></h3>
                  <h4>{stat.label}</h4>
                  <p>{stat.description}</p>

                  {stat.href && (
                    <span className="stat-go">
                      {stat.label === "Projects Completed"
                        ? "Explore our projects"
                        : "View our toolkit"}
                      <ArrowUpRight size={14} />
                    </span>
                  )}
                </>
              );

              return stat.href ? (
                <a
                  className="stat-card stat-card-link"
                  href={stat.href}
                  key={stat.label}
                >
                  {body}
                </a>
              ) : (
                <div className="stat-card" key={stat.label}>
                  {body}
                </div>
              );
            })}
          </div>

        </div>
      </section>
      

      <Founders />

      

      <section className="faq section-pad">
        <div className="container faq-grid">
          <div><div className="section-kicker">GOOD TO KNOW</div><h2>Questions,<br /><span>answered.</span></h2><p className="faq-intro">A few things you may want to know before starting a conversation.</p></div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <div className="faq-item" key={question}>
                <button onClick={() => setFaqOpen(faqOpen === index ? null : index)} aria-expanded={faqOpen === index}>
                  <span>{question}</span><ChevronDown className={faqOpen === index ? "chevron rotated" : "chevron"} size={19} />
                </button>
                {faqOpen === index && <p>{answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="container contact-box">
          <div className="contact-orb" />
          <div className="section-kicker">HAVE A PROJECT IN MIND?</div>
          <h2>Let's build something<br /><span>that moves you forward.</span></h2>
          <p>Tell us what you are working on. We would be glad to understand your idea and explore how we can help.</p>
          <a className="button button-light" target="_blank" rel="noopener noreferrer" href="https://mail.google.com/mail/?view=cm&fs=1&to=siddartharao3@gmail.com&su=Project%20Enquiry%20-%20BVR%20Global%20Technologies%20Pvt.%20Ltd.">
            Let's Connect <ArrowUpRight size={20} />
          </a>

        </div>
      </section>

     <footer className="footer">
  <div className="container footer-main">
    <div className="footer-brand">
      <a className="brand brand-footer" href="#home">
        <span className="brand-mark">BVR<span>.</span></span>
        <span className="brand-copy">
          <strong>BVR GLOBAL TECHNOLOGIES</strong>
          <small>PRIVATE LIMITED</small>
        </span>
      </a>
      <p>Engineering ideas. Building possibilities.</p>

      <div className="footer-socials">
        {socials.map(({ label, href, icon: Icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
            <Icon size={16} />
          </a>
        ))}
      </div>
    </div>

    <div className="footer-col">
      <b>EXPLORE</b>
      <a href="#work">Services</a>
      <a href="/projects">Work</a>
      <a href="#approach">Our approach</a>
      <a href="#about">About us</a>
      <a href="#team">Team</a>
    </div>

    <div className="footer-col footer-contact">
      <b>GET IN TOUCH</b>
      <a href="#contact">Start a project</a>

      <a href={`mailto:${contact.email}`} className="contact-row">
        <Mail size={15} /> <span>{contact.email}</span>
      </a>
      <a href={`tel:${contact.phoneHref}`} className="contact-row">
        <Phone size={15} /> <span>{contact.phone}</span>
      </a>
      <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="contact-row">
        <MapPin size={15} /> <span>{contact.address}</span>
      </a>
      <span className="contact-hours">{contact.hours}</span>
    </div>
  </div>

  <div className="container footer-bottom">
    <span>© {new Date().getFullYear()} BVR Global Technologies Pvt. Ltd.</span>
    <span>Designed with purpose. Built for possibility.</span>
  </div>
</footer>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "BVR GLOBAL TECHNOLOGIES",
      "alternateName": "BVR",
      "url": "https://bvrglobaltechnologies.com/"
    })
  }}
/>c:\Users\vaish\Downloads\icon.png
    </main>
  );
}
