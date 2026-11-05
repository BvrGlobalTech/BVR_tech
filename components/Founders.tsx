import Image, { type StaticImageData } from "next/image";
import founderPhoto from "./founder.jpeg";
import cofounderPhoto from "./cofounder.jpeg";
import vaish from "./vaish.jpeg";
import { ArrowUpRight, Mail } from "lucide-react";

type Person = {
  name: string;
  role: string;
  /** Imported image (as below) or a path in /public, e.g. "/team/photo.jpg" */
  image?: string | StaticImageData;
  linkedin?: string;
  email?: string;
};

type Founder = Person & {
  /** One string per paragraph */
  bio: string[];
  /** Optional pull-quote shown under the bio. Leave out if you don't have one. */
  quote?: string;
};

/* ------------------------------------------------------------------
   EDIT THIS: the founder is featured at the top, the co-founders
   appear below as round photos with their names.
------------------------------------------------------------------ */
const founder: Founder = {
  name: "BHARGAVA RAO",
  role: "Founder",
  bio: [
    "The Founder of BVR Global Technologies, driven by a passion for technology and innovation, focuses on building practical digital solutions that solve real-world business challenges.",
    "With a vision to empower startups and growing businesses, he aims to make technology more accessible through reliable web development and custom software solutions.",
  ],
  image: founderPhoto,
  // quote: "Add a short line in his own words.",
  // linkedin: "https://www.linkedin.com/in/your-profile",
  email: "bvrglobaltech@gmail.com",
};

const coFounders: Person[] = [
  {
    name: "SIDDARTHA RAO",
    role: "Co-Founder",
    image: cofounderPhoto,
    linkedin: "https://www.linkedin.com/in/siddartha-rao-721868287/",
  },
  {
    name: "VAISHNAVI AITHA",
    role: "Co-Founder",
    image: vaish,
    linkedin: "https://www.linkedin.com/in/vaishnavi-aitha-2a20a8264",
  },
];

const initials = (name: string) =>
  name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

const mailHref = (email: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=Project%20Enquiry%20-%20BVR%20Global%20Technologies%20Pvt.%20Ltd.`;

export default function Founders() {
  return (
    <section className="team section-pad" id="team">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="section-kicker">THE PEOPLE BEHIND BVR</div>
            <h2>
              Meet the <span>founders.</span>
            </h2>
          </div>
          <p>The people behind BVR GLOBAL TECHNOLOGIES are passionate about building practical digital solutions that solve real-world business challenges
          , working closely with you from the first conversation to launch.</p>
        </div>

        {/* ---------- Founder: photo + full details side by side ---------- */}
        <article className="founder-feature">
          <div className="founder-portrait">
            <span className="portrait-glow" />
            <span className="portrait-ring" />
            <div className="portrait-frame">
              {founder.image ? (
                <Image
                  src={founder.image}
                  alt={`${founder.name}, ${founder.role} at BVR Global Technologies`}
                  fill
                  sizes="(max-width: 900px) 340px, 400px"
                />
              ) : (
                <span className="portrait-initials">{initials(founder.name)}</span>
              )}
            </div>

          </div>

          <div className="founder-details">
            <span className="founder-badge">{founder.role}</span>
            <h3>{founder.name}</h3>
            <span className="founder-rule" />
            {founder.bio.map((para) => (
              <p className="founder-text" key={para}>{para}</p>
            ))}
            {founder.quote && <blockquote className="founder-quote">{founder.quote}</blockquote>}
            <div className="founder-links">
              {founder.linkedin && (
                <a href={founder.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn <ArrowUpRight size={15} />
                </a>
              )}
              {founder.email && (
                <a href={mailHref(founder.email)} target="_blank" rel="noopener noreferrer">
                  <Mail size={15} /> Email
                </a>
              )}
            </div>
          </div>
        </article>

        <div className="team-divider" />

        {/* ---------- Co-founders: round photos + names ---------- */}
        <h3 className="cofounders-title">Co-Founders</h3>
        <div className="cofounders">
          {coFounders.map((p) => {
            const circle = (
              <div className="cofounder-photo">
                <span className="cofounder-ring" />
                <div className="cofounder-frame">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={`${p.name}, ${p.role} at BVR Global Technologies`}
                      fill
                      sizes="(max-width: 680px) 140px, 180px"
                    />
                  ) : (
                    <span className="cofounder-initials">{initials(p.name)}</span>
                  )}
                </div>
              </div>
            );
            return (
              <div className="cofounder" key={p.name}>
                {p.linkedin ? (
                  <a href={p.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on LinkedIn`}>
                    {circle}
                  </a>
                ) : (
                  circle
                )}
                <h4>{p.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}