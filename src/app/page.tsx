import Link from "next/link";

const superpowers = [
  {
    label: "Autonomous AI assistant",
    detail: "Morning briefings, email triage, review responses — running 24/7 on a Mac Mini",
  },
  {
    label: "Fleet of 10+ AI agents",
    detail: "CRM queries, Google reviews, SEO content, customer comms — real operations, not demos",
  },
  {
    label: "Chrome automation",
    detail: "For the systems that don't have APIs. Because most of them don't.",
  },
  {
    label: "8+ websites & apps",
    detail: "Built or managed across side ventures. Not by a dev team. By one guy with AI.",
  },
  {
    label: "Near-zero daily involvement",
    detail: "Multiple businesses running while you focus on what actually matters.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-copper/5 rounded-full blur-[100px]" />

        <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-24">
          <p className="reveal text-sm tracking-[0.25em] uppercase text-gold mb-6">
            Wildash Enterprises
          </p>

          <h1 className="reveal reveal-delay-1 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-4xl">
            AI for the
            <br />
            <span className="text-gold">rest of us.</span>
          </h1>

          <p className="reveal reveal-delay-2 mt-8 text-lg md:text-xl text-parchment-dim max-w-2xl leading-relaxed">
            Technology was supposed to make life easier. Instead it turned every
            small business owner into their own overwhelmed, underpaid executive
            assistant. More tabs. More notifications. More things to manage.
          </p>

          <p className="reveal reveal-delay-3 mt-4 text-lg md:text-xl text-parchment max-w-2xl leading-relaxed">
            It doesn&apos;t have to be that way.
          </p>

          <div className="reveal reveal-delay-4 mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold text-stone-950 font-semibold text-sm tracking-wide rounded-none hover:bg-gold-bright transition-colors duration-300"
            >
              Work with Travis
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-4 border border-stone-700 text-parchment-dim text-sm tracking-wide rounded-none hover:border-parchment hover:text-parchment transition-colors duration-300"
            >
              See the proof
            </Link>
          </div>
        </div>
      </section>

      {/* ── The Problem / Insight ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <p className="text-sm tracking-[0.25em] uppercase text-copper mb-4">
                The problem
              </p>
              <h2 className="font-display text-3xl md:text-4xl leading-tight">
                Before personal computers, only wealthy people had assistants.
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-parchment-dim leading-relaxed text-lg">
                Those assistants actually reduced cognitive load — they filtered
                information, prioritized tasks, handled logistics so you could focus
                on what mattered. We &ldquo;democratized&rdquo; tools via software but not the
                assistant. We gave everyone the filing cabinet, the Rolodex, the
                calendar, and said <em>&ldquo;manage it yourself.&rdquo;</em>
              </p>
              <p className="text-parchment leading-relaxed text-lg mt-6">
                The ADHD epidemic, the anxiety, the notification fatigue — it&apos;s
                not a character flaw. Humans were never meant to process information
                at this scale without help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Reversal ── */}
      <section className="py-24 md:py-32 border-t border-stone-800">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="text-sm tracking-[0.25em] uppercase text-sage mb-4">
              The reversal
            </p>
            <h2 className="font-display text-3xl md:text-4xl leading-tight">
              AI changes that.
            </h2>
            <p className="text-parchment-dim leading-relaxed text-lg mt-6">
              Not Siri telling you the weather. A real assistant with your context,
              your priorities, across all your systems, with memory. The wealthy
              still have human executive assistants.{" "}
              <span className="text-parchment">
                Now everyone else can have an AI one.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Proof / Superpowers ── */}
      <section className="py-24 md:py-32 border-t border-stone-800">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl mb-16">
            <p className="text-sm tracking-[0.25em] uppercase text-gold mb-4">
              The proof
            </p>
            <h2 className="font-display text-3xl md:text-4xl leading-tight">
              What one 51-year-old auto shop owner built in three months.
            </h2>
            <p className="text-parchment-dim leading-relaxed text-lg mt-6">
              Not a tech company. Not theory. Travis is the prototype — he built
              it for himself first, now he teaches others how to do the same.
            </p>
          </div>

          <div className="grid gap-px bg-stone-800">
            {superpowers.map((item, i) => (
              <div
                key={i}
                className="bg-stone-950 p-8 md:p-10 group hover:bg-stone-900 transition-colors duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                  <span className="text-xs text-stone-700 font-mono tabular-nums shrink-0 pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl text-parchment group-hover:text-gold transition-colors duration-500">
                      {item.label}
                    </h3>
                    <p className="text-parchment-dim mt-2 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What I Do ── */}
      <section className="py-24 md:py-32 border-t border-stone-800">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <p className="text-sm tracking-[0.25em] uppercase text-gold mb-4">
                What I do
              </p>
              <h2 className="font-display text-3xl md:text-4xl leading-tight">
                I teach you to fish.
                <br />
                <span className="text-parchment-dim">
                  I don&apos;t fish for you.
                </span>
              </h2>
            </div>
            <div className="flex flex-col justify-center gap-8">
              <div>
                <h3 className="font-display text-xl text-gold">
                  Fractional AI Advisory
                </h3>
                <p className="text-parchment-dim mt-2 leading-relaxed">
                  Ongoing strategic guidance on where AI fits in your business,
                  what to build, and what to skip. Like having a CTO who
                  actually understands your P&amp;L.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl text-copper">
                  Training &amp; Workshops
                </h3>
                <p className="text-parchment-dim mt-2 leading-relaxed">
                  Hands-on sessions for you and your team. Not slides about
                  &ldquo;the future of AI&rdquo; — practical skills you use the next
                  morning.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl text-sage">
                  Vertical Expertise
                </h3>
                <p className="text-parchment-dim mt-2 leading-relaxed">
                  Auto repair, trades, service businesses — Travis has deep
                  operational knowledge in industries most AI consultants
                  couldn&apos;t find on a map.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 md:py-32 border-t border-stone-800">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            Ready to stop drowning
            <br />
            in your own business?
          </h2>
          <p className="text-parchment-dim text-lg mt-6 max-w-xl mx-auto">
            Let&apos;s talk about what AI can actually do for you. No pitch deck.
            No jargon. Just a conversation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-5 bg-gold text-stone-950 font-semibold text-sm tracking-wide rounded-none hover:bg-gold-bright transition-colors duration-300 mt-10"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
