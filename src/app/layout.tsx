import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wildash.ai"),
  title: {
    default: "Wildash Enterprises — AI for the Rest of Us",
    template: "%s | Wildash Enterprises",
  },
  description:
    "AI consulting and training for small business owners. Less cognitive load, more leverage. Built by a guy who did it for himself first.",
  openGraph: {
    title: "Wildash Enterprises — AI for the Rest of Us",
    description:
      "AI consulting and training for small business owners. Less cognitive load, more leverage.",
    url: "https://wildash.ai",
    siteName: "Wildash Enterprises",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wildash Enterprises — AI for the Rest of Us",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wildash Enterprises — AI for the Rest of Us",
    description:
      "AI consulting and training for small business owners. Less cognitive load, more leverage.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://wildash.ai",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Wildash Enterprises",
  url: "https://wildash.ai",
  description:
    "AI consulting and training for small business owners. Less cognitive load, more leverage.",
  founder: {
    "@type": "Person",
    name: "Travis Decker",
    jobTitle: "AI Consultant & Master Automotive Technician",
  },
  areaServed: "US",
  serviceType: ["AI Consulting", "AI Training", "Business Automation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="grain min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
