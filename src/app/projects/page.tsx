import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things Travis has built or helped build — proof that this stuff actually works.",
};

const projects = [
  {
    name: "Dave — The AI Executive Assistant",
    description:
      "An autonomous AI assistant running on a Mac Mini. Processes email, generates morning briefings, responds to Google reviews, manages a content pipeline. Runs 24/7 with near-zero supervision.",
    tags: ["Autonomous", "AI Agents", "Mac Mini"],
    accent: "gold",
  },
  {
    name: "Atomic Auto — AI-Powered Shop Operations",
    description:
      "A fleet of AI agents handling real auto repair shop operations: CRM queries, customer communication workflows, SEO content generation, and Chrome automation for legacy shop management software.",
    tags: ["Auto Repair", "AI Fleet", "Automation"],
    accent: "copper",
  },
  {
    name: "Personal OS",
    description:
      "A personal operating system that ties together task management, project tracking, AI agent orchestration, and multi-business operations into a single coherent system. The backbone everything else runs on.",
    tags: ["Orchestration", "Productivity", "System Design"],
    accent: "sage",
  },
  {
    name: "8+ Websites & Apps",
    description:
      "A portfolio of side ventures — each with its own web presence, built and managed with AI assistance. From concept to deployment, often in a single sitting.",
    tags: ["Next.js", "Web Dev", "Rapid Build"],
    accent: "gold",
  },
];

const accentColors: Record<string, string> = {
  gold: "text-gold border-gold/20",
  copper: "text-copper border-copper/20",
  sage: "text-sage border-sage/20",
};

const tagColors: Record<string, string> = {
  gold: "text-gold/70",
  copper: "text-copper/70",
  sage: "text-sage/70",
};

export default function ProjectsPage() {
  return (
    <section className="pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="reveal text-sm tracking-[0.25em] uppercase text-gold mb-4">
          Projects
        </p>
        <h1 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl lg:text-6xl leading-tight max-w-3xl">
          Proof, not promises.
        </h1>
        <p className="reveal reveal-delay-2 text-parchment-dim text-lg mt-6 max-w-2xl">
          Everything here was built by one person with AI. Not a dev team. Not a
          consulting engagement. Just a guy who got tired of doing everything
          manually.
        </p>

        {/* Projects grid */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <article
              key={i}
              className={`reveal reveal-delay-${i + 1} border ${accentColors[project.accent]} bg-stone-950 p-8 md:p-10 group hover:bg-stone-900 transition-colors duration-500`}
            >
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs tracking-wide uppercase ${tagColors[project.accent]}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2
                className={`font-display text-2xl md:text-3xl leading-tight ${
                  accentColors[project.accent].split(" ")[0]
                } group-hover:brightness-125 transition-all duration-500`}
              >
                {project.name}
              </h2>
              <p className="text-parchment-dim mt-4 leading-relaxed">
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
