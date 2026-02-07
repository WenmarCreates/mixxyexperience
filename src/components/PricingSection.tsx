import { Check, Clock, Truck, Palette, Zap } from "lucide-react";
import { motion } from "framer-motion";

const packages = [
  {
    name: "Mixxy Classic",
    popular: true,
    price: "$775",
    description: "Perfect for gatherings, cocktail hours, weddings, birthdays and casual celebrations.",
    features: [
      "Any 4 beer, wine, prosecco, or champagne selections",
      "3 hours of service",
      "1 Licensed bartender + 1 Tap-Tender",
      "Drinkware, napkins, straws, ice & garnishes",
      "Full setup & breakdown",
      "6-tap display (4 active)",
      "Insurance & 30-mile radius service",
    ],
  },
  {
    name: "Mixxy Plus",
    price: "$875",
    description: "Ideal for weddings, cocktail hours, bridal showers, milestone birthdays, anniversaries.",
    features: [
      "Everything in Mixxy Classic",
      "Swap up to 2 taps for cocktails (ex: margaritas, mimosas)",
      "Up to 5 signature cocktail options",
      "Personalized signage with your cocktail menu",
    ],
  },
  {
    name: "Mixxy Premium",
    price: "$975",
    description: "Full 6-tap experience for weddings, galas, corporate events, upscale celebrations.",
    features: [
      "6 taps of your choice (beer, wine, cocktails, prosecco)",
      "3 hours of service",
      "2 Licensed bartenders + 1 Tap-Tender",
      "Drinkware, napkins, straws, ice & garnishes",
      "Full Setup & Breakdown",
      "Custom cocktails welcome",
      "Premium cocktail bar styling & decor",
      "Signature cocktail menu signage",
      "Insurance & 30-mile radius service",
    ],
  },
  {
    name: "Mixxy PG",
    price: "$600",
    description: "Non-alcoholic package for family-friendly events, baby showers, school functions.",
    features: [
      "Any 4–6 taps of non-alcohol drinks (mocktails, lemonades, iced teas, sodas)",
      "3 hours of service",
      "2 Tap-Tenders",
      "Drinkware, napkins, straws, ice & garnishes",
      "Themed décor (kids parties option available)",
      "Full setup and breakdown",
    ],
  },
];

const addOns = [
  { icon: Clock, name: "Extra Service Time", description: "Additional hours beyond the base 3-hour package.", price: "$150/hr" },
  { icon: Truck, name: "Concierge Alcohol Pickup", description: "We handle picking up your alcohol for the event.", price: "$50" },
  { icon: Palette, name: "Custom Décor & Branding", description: "Personalized décor and branding for your event.", price: "$75" },
  { icon: Zap, name: "Generator Rental", description: "Power source for venues without electricity.", price: "$100" },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-4">
          <span className="text-sm uppercase tracking-widest text-accent font-medium">Packages & Pricing</span>
        </div>
         <h2 className="text-4xl md:text-5xl font-heading font-bold text-center text-foreground mb-4">
          Choose Your <span className="text-gold-italic">Mixxy</span> Experience
        </h2>
        <p className="text-center text-muted-foreground mb-4 max-w-xl mx-auto">
          From intimate gatherings to grand celebrations, we have the perfect package for your event.
        </p>
        <p className="text-center text-muted-foreground text-sm mb-16">*Price of alcohol not included</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-xl p-6 flex flex-col ${
                pkg.popular
                  ? "border-2 border-primary bg-card relative"
                  : "border border-border bg-card"
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">{pkg.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
              <p className="text-3xl font-bold text-accent mb-6">{pkg.price}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Check size={16} className="text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#booking"
                className="block text-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
              >
                Book Now
              </a>
            </motion.div>
          ))}
        </div>

        {/* Add-Ons */}
        <h3 className="text-2xl font-heading font-bold text-foreground text-center mb-8">Add-Ons</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {addOns.map((addon) => (
            <div key={addon.name} className="rounded-xl border border-border bg-card p-5">
              <addon.icon size={24} className="text-accent mb-3" />
              <h4 className="font-semibold text-foreground mb-1">{addon.name}</h4>
              <p className="text-sm text-muted-foreground mb-3">{addon.description}</p>
              <p className="text-lg font-bold text-accent">{addon.price}</p>
            </div>
          ))}
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Service Area:</strong> Includes 30-mile radius from Midtown Atlanta. +$1.50/mile for additional distance.
          </p>
          <p className="text-sm text-muted-foreground">
            Having a smaller party? Call us at{" "}
            <a href="tel:6784621651" className="text-primary hover:underline">(678) 462-1651</a>{" "}
            for custom pricing.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
