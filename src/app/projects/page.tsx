import type { Metadata } from "next";
import Link from "next/link";
import { getProjectSlugs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things Travis has built or helped build — proof that this stuff actually works.",
};

type Status = "Live" | "Prototype" | "Personal";
type Accent = "gold" | "copper" | "sage";

type Project = {
  name: string;
  slug?: string;
  description: string;
  tags: string[];
  status: Status;
  accent: Accent;
};

// TODO: tighten copy voice pass — descriptions below are spec-derived placeholders
const projects: Project[] = [
  {
    name: "Family Finance Tracker",
    slug: "finapp",
    description:
      "Personal finance and FIRE planning tool built for real family use. FastAPI, PostgreSQL, Next.js, runs on a home server.",
    tags: ["Python", "Next.js", "Supabase"],
    status: "Live",
    accent: "gold",
  },
  {
    name: "EV Partner Resource Hub",
    slug: "ev-partners",
    description:
      "Tech support and resource site for EV business partners.",
    tags: ["Next.js", "TypeScript"],
    status: "Live",
    accent: "copper",
  },
  {
    name: "Malcolm's Personal Site",
    slug: "malcolm-wildash",
    description:
      "Personal site built with and for a teenager learning to put his work on the web.",
    tags: ["Next.js", "Vercel"],
    status: "Live",
    accent: "sage",
  },
  {
    name: "Olive's Bug Guide",
    slug: "olives-bugs",
    description:
      "Portland native bug identification guide, built as a family AI project. 23 bugs, all local.",
    tags: ["Next.js", "Vercel"],
    status: "Live",
    accent: "gold",
  },
  {
    name: "The Game Master",
    slug: "game-master",
    description:
      "Drop any book in. Play inside the story as a D&D campaign with persistent NPCs and consequences. Enhanced with a voice skill from GitHub.",
    tags: ["Claude Code", "RAG", "ChromaDB"],
    status: "Personal",
    accent: "copper",
  },
  {
    name: "Family Counseling Space",
    slug: "family-counseling",
    description:
      "A shared Claude Project used as a persistent space for family conversation and reflection.",
    tags: ["Claude Projects"],
    status: "Personal",
    accent: "sage",
  },
];

const publishedProjectSlugs = new Set(getProjectSlugs());

const accentColors: Record<Accent, string> = {
  gold: "text-gold border-gold/20",
  copper: "text-copper border-copper/20",
  sage: "text-sage border-sage/20",
};

const tagColors: Record<Accent, string> = {
  gold: "text-gold/70",
  copper: "text-copper/70",
  sage: "text-sage/70",
};

const statusStyles: Record<Status, string> = {
  Live: "text-sage border-sage/40",
  Prototype: "text-copper border-copper/40",
  Personal: "text-parchment-dim border-stone-700",
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
          {projects.map((project, i) => {
            const isLinked = Boolean(project.slug && publishedProjectSlugs.has(project.slug));
            const baseClasses = `reveal reveal-delay-${(i % 5) + 1} border ${accentColors[project.accent]} bg-stone-950 p-8 md:p-10 group transition-colors duration-500 block`;
            const interactiveClasses = isLinked ? " hover:bg-stone-900" : "";
            const body = (
              <>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs tracking-wide uppercase ${tagColors[project.accent]}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    className={`shrink-0 text-xs tracking-[0.2em] uppercase border px-3 py-1 ${statusStyles[project.status]}`}
                  >
                    {project.status}
                  </span>
                </div>
                <h2
                  className={`font-display text-2xl md:text-3xl leading-tight ${accentColors[project.accent].split(" ")[0]} ${isLinked ? "group-hover:brightness-125" : ""} transition-all duration-500`}
                >
                  {project.name}
                </h2>
                <p className="text-parchment-dim mt-4 leading-relaxed">
                  {project.description}
                </p>
              </>
            );

            if (isLinked && project.slug) {
              return (
                <Link
                  key={project.name}
                  href={`/projects/${project.slug}`}
                  className={baseClasses + interactiveClasses}
                >
                  {body}
                </Link>
              );
            }

            return (
              <article key={project.name} className={baseClasses}>
                {body}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
