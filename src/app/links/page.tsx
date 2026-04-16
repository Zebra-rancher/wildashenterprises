import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Links",
  description:
    "Curated tools, people, and partners recommended by Wildash Enterprises.",
};

const categories = [
  {
    label: "Learning",
    color: "text-gold",
    links: [
      {
        title: "AI CRED",
        description: "The standard for AI fluency assessment",
        url: "https://www.aicred.ai/",
      },
      {
        title: "Anthropic Courses",
        description: "Free courses on Claude AI and development tools",
        url: "https://anthropic.skilljar.com/",
      },
      {
        title: "GitHub for Beginners",
        description: "Video tutorial to get started with GitHub",
        url: "https://youtu.be/r8jQ9hVA2qs?si=yyzbGY8THRKhHeHm",
      },
    ],
  },
  {
    label: "People",
    color: "text-copper",
    links: [
      {
        title: "Nate B Jones",
        description: "AI News & Strategy Daily on YouTube",
        url: "https://www.youtube.com/@NateBJones",
      },
    ],
  },
  {
    label: "Partners",
    color: "text-sage",
    links: [
      {
        title: "MOM+POP, Ltd.",
        description: "Business consulting — Do business. Better.",
        url: "https://mompop.ltd/",
      },
    ],
  },
];

export default function LinksPage() {
  return (
    <section className="pt-32 pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm tracking-[0.25em] uppercase text-gold mb-6">
          Resources
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight max-w-3xl">
          Links
        </h1>
        <p className="mt-6 text-lg text-parchment-dim max-w-2xl leading-relaxed">
          Tools, people, and partners worth knowing about.
        </p>

        <div className="mt-16 space-y-16">
          {categories.map((category) => (
            <div key={category.label}>
              <p
                className={`text-sm tracking-[0.25em] uppercase ${category.color} mb-6`}
              >
                {category.label}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-800">
                {category.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-stone-950 p-8 md:p-10 group hover:bg-stone-900 transition-colors duration-500"
                  >
                    <h3 className="font-display text-xl text-parchment group-hover:text-gold transition-colors duration-500">
                      {link.title}
                    </h3>
                    <p className="text-parchment-dim mt-2 leading-relaxed">
                      {link.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
