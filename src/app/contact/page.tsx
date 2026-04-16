"use client";

import type { FormEvent } from "react";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire up form backend
    setSubmitted(true);
  }

  return (
    <section className="pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Left — copy */}
          <div>
            <p className="reveal text-sm tracking-[0.25em] uppercase text-gold mb-4">
              Contact
            </p>
            <h1 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl leading-tight">
              Let&apos;s talk.
            </h1>
            <p className="reveal reveal-delay-2 text-parchment-dim text-lg mt-6 leading-relaxed">
              No pitch deck. No jargon. No 47-slide discovery call. Just tell me
              what you&apos;re dealing with and I&apos;ll tell you if I can help.
            </p>

            <div className="reveal reveal-delay-3 mt-12 space-y-6">
              <div>
                <h3 className="text-sm tracking-wide uppercase text-copper mb-2">
                  Good fit if you&apos;re
                </h3>
                <ul className="space-y-2 text-parchment-dim">
                  <li className="flex items-start gap-3">
                    <span className="text-gold mt-1 text-xs">&#9646;</span>
                    A small business owner drowning in admin
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold mt-1 text-xs">&#9646;</span>
                    A team that needs practical AI training
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold mt-1 text-xs">&#9646;</span>
                    In trades, auto repair, or service businesses
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold mt-1 text-xs">&#9646;</span>
                    Curious but skeptical — perfect, me too
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal reveal-delay-2">
            {submitted ? (
              <div className="border border-gold/20 p-10 text-center">
                <p className="font-display text-2xl text-gold">Got it.</p>
                <p className="text-parchment-dim mt-3">
                  I&apos;ll get back to you soon. Probably faster than you&apos;d
                  expect — I have an AI handling my inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-parchment-dim mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-transparent border-b border-stone-700 text-parchment py-3 focus:border-gold focus:outline-none transition-colors duration-300 placeholder:text-stone-700"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-parchment-dim mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-transparent border-b border-stone-700 text-parchment py-3 focus:border-gold focus:outline-none transition-colors duration-300 placeholder:text-stone-700"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="business"
                    className="block text-sm text-parchment-dim mb-2"
                  >
                    Business / Industry
                  </label>
                  <input
                    type="text"
                    id="business"
                    name="business"
                    className="w-full bg-transparent border-b border-stone-700 text-parchment py-3 focus:border-gold focus:outline-none transition-colors duration-300 placeholder:text-stone-700"
                    placeholder="e.g. Auto repair shop, 12 employees"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-parchment-dim mb-2"
                  >
                    What are you dealing with?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full bg-transparent border border-stone-700 text-parchment p-4 focus:border-gold focus:outline-none transition-colors duration-300 placeholder:text-stone-700 resize-none"
                    placeholder="Tell me what's eating your time, what you've tried, or what you're curious about."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gold text-stone-950 font-semibold text-sm tracking-wide hover:bg-gold-bright transition-colors duration-300"
                >
                  Send it
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
