import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { WhatsNew } from "@/components/landing/WhatsNew";
import { WhyTokenTalks } from "@/components/landing/WhyTokenTalks";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-primary/20">
      <Navbar />
      <Hero />
      <WhatsNew />
      <WhyTokenTalks />
      <Footer />
    </main>
  );
}
