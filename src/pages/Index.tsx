import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import BookingSection from "@/components/BookingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PricingSection />
      <BookingSection />
      <footer className="py-8 px-6 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          © 2025 Little<span className="text-gold-italic">Mixxy</span>. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
