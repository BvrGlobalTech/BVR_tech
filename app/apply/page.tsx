"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { SubFooter, SubHeader } from "@/components/SubChrome";
import Motion from "@/components/Motion";
import "./apply.css";

/* Formspree setup:
   1. Create a form at https://formspree.io  -> you get https://formspree.io/f/abcdwxyz
   2. In .env.local add:   NEXT_PUBLIC_FORMSPREE_APPLY_ID=abcdwxyz
   3. Restart `npm run dev` (and add the same variable in your hosting dashboard). */
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_APPLY_ID;

type FormState = {
  name: string;
  mobile: string;
  email: string;
  location: string;
  about: string;
  skills: string;
  resumeUrl: string;
};

const initial: FormState = {
  name: "",
  mobile: "",
  email: "",
  location: "",
  about: "",
  skills: "",
  resumeUrl: "",
};

export default function ApplyPage() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!FORMSPREE_ID) {
      setStatus("error");
      setErrorMsg("The form is not set up yet. Please email us directly.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ _subject: `New application: ${form.name}`, ...form }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      setForm(initial);
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or email us directly.");
    }
  };

  if (status === "success") {
    return (
      <main className="ap-page">
        <Motion />
        <SubHeader />
        <section className="ap-hero">
          <span className="pj-grid" />
          <div className="container ap-success">
            <CheckCircle2 size={64} className="ap-success-icon" />
            <h1>Application received.</h1>
            <p>Thank you for applying. We&apos;ll review your details and get back to you soon.</p>
            <Link className="button button-primary" href="/">
              Back to home <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
        <SubFooter />
      </main>
    );
  }

  return (
    <main className="ap-page">
      <Motion />
      <SubHeader />

      <section className="ap-hero">
        <span className="pj-grid" />
        <div className="container">
          <Link href="/" className="ap-back">
            <ArrowLeft size={16} /> Back to home
          </Link>
          <div className="section-kicker">JOIN THE TEAM</div>
          <h1>Apply to <span>work with us.</span></h1>
          <p>
            Tell us a little about yourself. Share your details, skills and a link to your resume —
            we&apos;ll take it from there.
          </p>
        </div>
      </section>

      <section className="ap-section">
        <div className="container ap-form-wrap">
          {/* no noValidate: the browser now blocks empty required fields and bad emails/URLs */}
          <form className="ap-form" onSubmit={handleSubmit}>
            <div className="ap-row">
              <div className="ap-field">
                <label htmlFor="name">Full name *</label>
                <input id="name" type="text" name="name" required autoComplete="name" value={form.name} onChange={update("name")} placeholder="Your name" />
              </div>
              <div className="ap-field">
                <label htmlFor="mobile">Mobile number *</label>
                <input id="mobile" type="tel" name="mobile" required autoComplete="tel" value={form.mobile} onChange={update("mobile")} placeholder="+91 90000 00000" />
              </div>
            </div>

            <div className="ap-row">
              <div className="ap-field">
                <label htmlFor="email">Email address *</label>
                <input id="email" type="email" name="email" required autoComplete="email" value={form.email} onChange={update("email")} placeholder="you@example.com" />
              </div>
              <div className="ap-field">
                <label htmlFor="location">Location *</label>
                <input id="location" type="text" name="location" required value={form.location} onChange={update("location")} placeholder="City, Country" />
              </div>
            </div>

            <div className="ap-field">
              <label htmlFor="about">About yourself *</label>
              <textarea id="about" rows={4} name="about" required value={form.about} onChange={update("about")} placeholder="A short introduction — your background, interests and what you're looking for." />
            </div>

            <div className="ap-field">
              <label htmlFor="skills">Skills *</label>
              <input id="skills" type="text" name="skills" required value={form.skills} onChange={update("skills")} placeholder="e.g. React, Node.js, MongoDB, UI design" />
            </div>

            <div className="ap-field">
              <label htmlFor="resumeUrl">Resume link *</label>
              <input id="resumeUrl" type="url" name="resumeUrl" required value={form.resumeUrl} onChange={update("resumeUrl")} placeholder="Google Drive / Dropbox / portfolio link" />
              <small className="ap-hint">Paste a shareable link to your resume (PDF). We&apos;ll review it from there.</small>
            </div>

            {status === "error" && <p className="ap-error" role="alert">{errorMsg}</p>}

            <button className="button button-primary ap-submit" type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? (
                <>
                  <Loader2 size={18} className="ap-spin" /> Submitting…
                </>
              ) : (
                <>
                  Submit application <ArrowUpRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      <SubFooter />
    </main>
  );
}