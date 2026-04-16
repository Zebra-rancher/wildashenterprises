import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Let's talk about what AI can actually do for your business.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
