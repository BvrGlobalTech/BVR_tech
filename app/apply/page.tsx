
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { SubFooter, SubHeader } from "@/components/SubChrome";
import Motion from "@/components/Motion";
import "./apply.css";

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
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("https://formspree.io/f/mpppowej", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      setForm(initial);
    } catch (err) {
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
          <form className="ap-form" onSubmit={handleSubmit} noValidate>
            <div className="ap-row">
              <div className="ap-field">
                <label htmlFor="name">Full name *</label>
                <input id="name" type="text" required value={form.name} onChange={update("name")} placeholder="Your name" />
              </div>
              <div className="ap-field">
                <label htmlFor="mobile">Mobile number *</label>
                <input id="mobile" type="tel" required value={form.mobile} onChange={update("mobile")} placeholder="+91 90000 00000" />
              </div>
            </div>

            <div className="ap-row">
              <div className="ap-field">
                <label htmlFor="email">Email address *</label>
                <input id="email" type="email" required value={form.email} onChange={update("email")} placeholder="you@example.com" />
              </div>
              <div className="ap-field">
                <label htmlFor="location">Location *</label>
                <input id="location" type="text" required value={form.location} onChange={update("location")} placeholder="City, Country" />
              </div>
            </div>

            <div className="ap-field">
              <label htmlFor="about">About yourself *</label>
              <textarea id="about" rows={4} required value={form.about} onChange={update("about")} placeholder="A short introduction — your background, interests and what you're looking for." />
            </div>

            <div className="ap-field">
              <label htmlFor="skills">Skills *</label>
              <input id="skills" type="text" required value={form.skills} onChange={update("skills")} placeholder="e.g. React, Node.js, MongoDB, UI design" />
            </div>

            <div className="ap-field">
              <label htmlFor="resumeUrl">Resume link *</label>
              <input id="resumeUrl" type="url" required value={form.resumeUrl} onChange={update("resumeUrl")} placeholder="Google Drive / Dropbox / portfolio link" />
              <small className="ap-hint">Paste a shareable link to your resume (PDF). We&apos;ll review it from there.</small>
            </div>

            {status === "error" && <p className="ap-error">{errorMsg}</p>}

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