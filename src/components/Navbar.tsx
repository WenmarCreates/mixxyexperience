import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className={`text-2xl font-heading font-bold ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
          Little<span className="text-gold-italic">Mixxy</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#" className={`text-sm font-medium tracking-widest uppercase transition-colors ${scrolled ? "text-foreground/80 hover:text-foreground" : "text-primary-foreground/80 hover:text-primary-foreground"}`}>
            Home
          </a>
          <a href="#pricing" className={`text-sm font-medium tracking-widest uppercase transition-colors ${scrolled ? "text-foreground/80 hover:text-foreground" : "text-primary-foreground/80 hover:text-primary-foreground"}`}>
            Pricing
          </a>
          <a
            href="#booking"
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Book Now
          </a>
        </div>

        <button
          className={`md:hidden ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md border-b border-border/30 px-6 pb-4">
          <a href="#" className="block py-2 text-foreground/80 hover:text-foreground" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#pricing" className="block py-2 text-foreground/80 hover:text-foreground" onClick={() => setIsOpen(false)}>Pricing</a>
          <a href="#booking" className="block py-2 text-primary font-semibold" onClick={() => setIsOpen(false)}>Book Now</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
