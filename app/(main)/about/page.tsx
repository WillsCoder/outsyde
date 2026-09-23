import type { Metadata } from "next";
import AboutIndex from "@/modules/explorer/about";

export const metadata: Metadata = {
  title: "About · Outsyde",
  description:
    "Outsyde is the lifestyle discovery platform for urban Africa — starting with Lagos. Curated spots, real events, honest vibes.",
};

export default function AboutPage() {
  return <AboutIndex />;
}
