import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const timeOptions = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
  "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM",
  "11:00 PM", "11:30 PM",
];

const eventTypes = [
  "💒 Wedding Celebration", "🎂 Birthday Celebration", "💐 Bridal Shower",
  "👶 Baby Shower", "🏢 Corporate Event", "🎓 Graduation Party",
  "👨‍👩‍👧‍👦 Family Gathering", "🍽️ Rehearsal Dinner", "🎉 Private Party",
  "🎪 Festival or Market", "✨ Other",
];

const guestRanges = ["Below 50 guests", "50-100 guests", "100-200 guests", "200-300 guests", "More than 300 guests"];

const packageOptions = [
  { value: "classic", label: "Mixxy Classic – $775", sub: "4 beer/wine/prosecco taps, 3 hrs, 1 bartender + 1 Tap-Tender" },
  { value: "plus", label: "Mixxy Plus – $875", sub: "Classic + swap up to 2 taps for cocktails, personalized signage" },
  { value: "premium", label: "Mixxy Premium – $975", sub: "Full 6-tap experience, 2 bartenders, premium styling & décor" },
  { value: "pg", label: "Mixxy PG – $600", sub: "Non-alcoholic: mocktails, lemonades, iced teas, sodas" },
];

const addOnOptions = [
  { value: "extra-time", label: "Extra Service Time", price: "$150/hr" },
  { value: "alcohol-pickup", label: "Concierge Alcohol Pickup", price: "$50" },
  { value: "custom-decor", label: "Custom Décor & Branding", price: "$75" },
  { value: "generator", label: "Generator Rental", price: "$100" },
];

const BookingSection = () => {
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const toggleAddOn = (value: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

   const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      eventDate: formData.get("eventDate"),
      eventLocation: formData.get("eventLocation"),
      startTime: formData.get("startTime"),
      endTime: formData.get("endTime"),
      eventType: formData.get("eventType"),
      guestCount: formData.get("guestCount"),
      package: packageOptions.find((p) => p.value === selectedPackage)?.label || selectedPackage,
      addOns: selectedAddOns.map((v) => addOnOptions.find((a) => a.value === v)?.label || v),
      details: formData.get("details"),
    };

    try {
      const res = await fetch("https://aismartlinx.app.n8n.cloud/webhook-test/40fe32f0-4267-47c4-8f69-e190b4ea9737", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Webhook failed");
      toast.success("Booking request submitted! We'll be in touch within one business day.");
    } catch {
      toast.error("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body text-sm";
  const labelClass = "block text-sm font-medium text-foreground mb-1.5";
  const selectClass = `${inputClass} appearance-none`;

  return (
    <section id="booking" className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center text-foreground mb-4">
            Reserve Your Date
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
            Ready to make your event unforgettable? Fill out the form below and our team will be in touch within one business day.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>First Name *</label>
                <input type="text" name="firstName" required className={inputClass} placeholder="First name" />
              </div>
              <div>
                <label className={labelClass}>Last Name *</label>
                <input type="text" name="lastName" required className={inputClass} placeholder="Last name" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Email *</label>
                <input type="email" name="email" required className={inputClass} placeholder="your@email.com" />
              </div>
              <div>
                <label className={labelClass}>Phone *</label>
                <input type="tel" name="phone" required className={inputClass} placeholder="(555) 555-5555" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Event Date *</label>
                <input type="date" name="eventDate" required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Event Location *</label>
                <input type="text" name="eventLocation" required className={inputClass} placeholder="Venue or address" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Start Time *</label>
                <select name="startTime" required className={selectClass} defaultValue="">
                  <option value="" disabled>Select start time</option>
                  {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>End Time *</label>
                <select name="endTime" required className={selectClass} defaultValue="">
                  <option value="" disabled>Select end time</option>
                  {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Event Type *</label>
                <select name="eventType" required className={selectClass} defaultValue="">
                  <option value="" disabled>Select event type</option>
                  {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Expected Guest Count</label>
                <select name="guestCount" className={selectClass} defaultValue="">
                  <option value="" disabled>Select range</option>
                  {guestRanges.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>

            {/* Package Selection */}
            <div>
              <label className={labelClass}>Select a Package *</label>
              <div className="space-y-3">
                {packageOptions.map((pkg) => (
                  <label
                    key={pkg.value}
                    className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedPackage === pkg.value
                        ? "border-primary bg-primary/10"
                        : "border-border bg-secondary hover:border-muted-foreground/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="package"
                      value={pkg.value}
                      required
                      checked={selectedPackage === pkg.value}
                      onChange={() => setSelectedPackage(pkg.value)}
                      className="mt-1 accent-primary"
                    />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{pkg.label}</p>
                      <p className="text-xs text-muted-foreground">{pkg.sub}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Add-Ons */}
            <div>
              <label className={labelClass}>Add-Ons (optional)</label>
              <div className="grid sm:grid-cols-2 gap-3">
                {addOnOptions.map((addon) => (
                  <label
                    key={addon.value}
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedAddOns.includes(addon.value)
                        ? "border-primary bg-primary/10"
                        : "border-border bg-secondary hover:border-muted-foreground/30"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAddOns.includes(addon.value)}
                      onChange={() => toggleAddOn(addon.value)}
                      className="accent-primary"
                    />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{addon.label}</p>
                      <p className="text-xs text-accent">{addon.price}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass}>Tell us more! We love the details.</label>
              <textarea name="details" rows={4} className={inputClass} placeholder="Any special requests, themes, or details about your event..." />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Booking Request"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSection;
