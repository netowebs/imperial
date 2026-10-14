import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Convenience } from "./components/Convenience";
import { FuelStation } from "./components/FuelStation";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { ContactModal } from "./components/ContactModal";
import { ContactModalProvider } from "./components/contexts/ContactModalContext";

export default function Home() {
  return (
    <ContactModalProvider>
      <main className="min-h-screen bg-background text-foreground">
        <Header />
        <Hero />
        <Services />
        <Convenience />
        <FuelStation />
        <Footer />
        <WhatsAppButton />
        <ContactModal />
      </main>
    </ContactModalProvider>
  );
}