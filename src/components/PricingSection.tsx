import { Check, Clock, Truck, Palette, Zap, Camera, Wine, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const packages = [
{
  name: "Mixxy PG",
  price: "$600",
  description: "Perfect for family-friendly events, baby showers, school functions, and daytime celebrations.",
  features: [
  "Choose 4–6 premium non-alcoholic beverages (mocktails, lemonades, iced teas, sodas)",
  "3 hours of service",
  "2 Tap-Tenders",
  "Drinkware, napkins, straws, ice & garnishes",
  "Full setup & breakdown",
  "Luxury bar décor & custom drink signage",
  "Insurance included",
  "Service within a 30-mile radius"]

},
{
  name: "Mixxy Classic",
  popular: true,
  price: "$775",
  description: "4-Tap Beverage Experience – Perfect for bridal showers, birthdays, baby showers, and intimate gatherings.",
  features: [
  "6-tap display (4 active taps)",
  "Any combination of four: beer, wine, champagne, prosecco",
  "3 hours of service",
  "1 Licensed bartender + 1 Tap-Tender",
  "Drinkware, napkins, straws, ice & garnishes",
  "Full setup & breakdown",
  "Luxury bar décor & custom drink signage",
  "Insurance included",
  "Service within a 30-mile radius"]

},
{
  name: "Mixxy Plus",
  price: "$875",
  description: "4-Tap Experience with cocktails – Ideal for cocktail hours, corporate events, graduation parties.",
  features: [
  "6-tap display (4 active taps)",
  "Any combination of four: beer, wine, champagne, prosecco, cocktails",
  "3 hours of service",
  "1 Licensed bartender + 1 Tap-Tender",
  "Drinkware, napkins, straws, ice & garnishes",
  "Full setup & breakdown",
  "Luxury bar décor & custom drink signage",
  "Insurance included",
  "Service within a 30-mile radius"]

},
{
  name: "Mixxy Premium",
  price: "$975",
  description: "Full 6-Tap Experience – Designed for weddings, galas, luxury events, and corporate activations.",
  features: [
  "Any combination of six: beer, wine, champagne, prosecco, cocktails",
  "3 hours of service",
  "2 Licensed bartenders + 1 Tap-Tender",
  "Drinkware, napkins, straws, ice & garnishes",
  "Full setup & breakdown",
  "Luxury bar décor & custom drink signage",
  "Insurance included",
  "Service within a 30-mile radius"]

},
{
  name: "Mini Mixxy Satellite Bar",
  price: "$150/hr",
  description: "Portable luxury bar service designed for weddings, private events, corporate gatherings, and upscale celebrations.",
  features: [
  "Minimum of 2 hours of service",
  "2 Licensed bartenders",
  "Full setup & breakdown",
  "Luxury bar décor & custom drink signage",
  "Insurance included",
  "Service within a 30-mile radius"]

}];


const boothPackages = [
{
  name: "Gold 360 Booth",
  price: "$735",
  duration: "3 hours",
  features: [
  "360 Camera Booth",
  "Booth concierge",
  "Stanchions",
  "Instant social sharing",
  "White LED lights",
  "Unlimited 4K videos",
  "MP3 song choice",
  "Custom digital template"]

},
{
  name: "Platinum 360 Booth",
  price: "$835",
  duration: "3 hours",
  popular: true,
  features: [
  "All Gold features",
  "Hollywood red carpet",
  "Animated overlays",
  "Photo booth props"]

},
{
  name: "Glamour Booth",
  price: "$999",
  duration: "3 hours",
  features: [
  "Professional camera & lighting",
  "Booth concierge",
  "2x4 or 4x6 images",
  "Glamour overlay",
  "Black & white or color options",
  "Instant sharing & backdrop",
  "Custom digital template & print sleeves",
  "Custom tap screen"]

},
{
  name: "Glamour Booth+",
  price: "From $1,200",
  duration: "3 hours",
  features: [
  "All Glamour features",
  "Enhanced luxury styling",
  "VIP experience"]

}];


const addOns = [
{ icon: Palette, name: "Balloon Décor", description: "Customized to fit any theme.", price: "$150" },
{ icon: Wine, name: "Champagne Wall", description: "Elegant champagne wall display for your event.", price: "$150" },
{ icon: Camera, name: "Event Photography", description: "$225 for 1 hour. $150/hr for 2+ hours.", price: "From $225" },
{ icon: Truck, name: "Concierge Alcohol Pickup", description: "We handle picking up your alcohol for the event.", price: "$50" },
{ icon: Zap, name: "Generator Rental", description: "Power source for venues without electricity.", price: "$100" },
{ icon: Clock, name: "Extra Service Time", description: "Additional hours beyond the base 3-hour package.", price: "$150/hr" }];


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
        <p className="text-center text-muted-foreground mb-4 max-w-xl mx-auto">From weddings to intimate gatherings, we create elevated experiences tailored to your celebration.

        </p>
        <p className="text-center text-muted-foreground text-sm mb-16">* Price of alcohol not included *</p>

        {/* Main Packages - first 4 in a grid, satellite bar full width below */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {packages.slice(0, 4).map((pkg, i) =>
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`rounded-xl p-6 flex flex-col ${
            pkg.popular ?
            "border-2 border-primary bg-card relative" :
            "border border-border bg-card"}`
            }>

              {pkg.popular &&
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
            }
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">{pkg.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
              <p className="text-3xl font-bold text-accent mb-6">{pkg.price}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {pkg.features.map((f) =>
              <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Check size={16} className="text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
              )}
              </ul>
              <a
              href="#booking"
              className="block text-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors">

                Book Now
              </a>
            </motion.div>
          )}
        </div>

        {/* Mini Mixxy Satellite Bar */}
        {packages[4] &&
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-xl p-6 border border-border bg-card mb-20 max-w-md mx-auto flex flex-col">

            <h3 className="text-xl font-heading font-bold text-foreground mb-2">{packages[4].name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{packages[4].description}</p>
            <p className="text-3xl font-bold text-accent mb-6">{packages[4].price}</p>
            <ul className="space-y-3 mb-8 flex-1">
              {packages[4].features.map((f) =>
            <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                  <Check size={16} className="text-primary mt-0.5 shrink-0" />
                  {f}
                </li>
            )}
            </ul>
            <a
            href="#booking"
            className="block text-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors">

              Book Now
            </a>
          </motion.div>
        }

        {/* 360 Photo Booth Packages */}
        <div className="text-center mb-4">
          <span className="text-sm uppercase tracking-widest text-accent font-medium">Photo Booth Experiences</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-4">
          360 Photo Booth Packages
        </h3>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          Capture every angle with our premium 360 photo booth experiences.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {boothPackages.map((pkg, i) =>
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`rounded-xl p-6 flex flex-col ${
            pkg.popular ?
            "border-2 border-primary bg-card relative" :
            "border border-border bg-card"}`
            }>

              {pkg.popular &&
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
            }
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">{pkg.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{pkg.duration}</p>
              <p className="text-3xl font-bold text-accent mb-6">{pkg.price}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {pkg.features.map((f) =>
              <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Check size={16} className="text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
              )}
              </ul>
              <a
              href="#booking"
              className="block text-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors">

                Book Now
              </a>
            </motion.div>
          )}
        </div>

        {/* Add-Ons */}
        <h3 className="text-2xl font-heading font-bold text-foreground text-center mb-8">Add-Ons</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {addOns.map((addon) =>
          <div key={addon.name} className="rounded-xl border border-border bg-card p-5">
              <addon.icon size={24} className="text-accent mb-3" />
              <h4 className="font-semibold text-foreground mb-1">{addon.name}</h4>
              <p className="text-sm text-muted-foreground mb-3">{addon.description}</p>
              <p className="text-lg font-bold text-accent">{addon.price}</p>
            </div>
          )}
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Service Area:</strong> Includes 30-mile radius from Midtown Atlanta. +$1.50/mile for additional distance.
          </p>
          <p className="text-sm text-muted-foreground">
            Having a smaller party of 40 guests or fewer, or a larger party of 300 or more? Call us at{" "}
            <a href="tel:6784621651" className="text-primary hover:underline">(678) 462-1651</a>{" "}
            for custom pricing.
          </p>
        </div>
      </div>
    </section>);

};

export default PricingSection;