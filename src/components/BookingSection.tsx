import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const timeOptions = [
"8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
"11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
"2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
"5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
"8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM",
"11:00 PM", "11:30 PM"];


const eventTypes = [
"Wedding Celebration", "Birthday Celebration", "Bridal Shower",
"Baby Shower", "Corporate Event", "Graduation Party",
"Family Gathering", "Rehearsal Dinner", "Private Party",
"Festival or Market", "Other"];


const guestRanges = ["Below 50 guests", "50-100 guests", "100-200 guests", "200-300 guests", "More than 300 guests"];

const INCLUDED_HOURS = 3;

const packageOptions = [
{ value: "pg", label: "Mixxy PG", displayLabel: "Mixxy PG – $600", sub: "Non-alcoholic: mocktails, lemonades, iced teas, sodas" },
{ value: "classic", label: "Mixxy Classic", displayLabel: "Mixxy Classic – $775", sub: "4 beer/wine/prosecco taps, 3 hrs, 1 bartender + 1 Tap-Tender" },
{ value: "plus", label: "Mixxy Plus", displayLabel: "Mixxy Plus – $875", sub: "Classic + swap up to 2 taps for cocktails, personalized signage" },
{ value: "premium", label: "Mixxy Premium", displayLabel: "Mixxy Premium – $975", sub: "Full 6-tap experience, 2 bartenders, premium styling & décor" },
{ value: "satellite", label: "Mini Mixxy Satellite Bar", displayLabel: "Mini Mixxy Satellite Bar – $150/hr", sub: "Portable luxury bar, 2 bartenders, min 2 hours" }];


const boothOptions = [
{ value: "gold", label: "Gold 360 Booth", displayLabel: "Gold 360 Booth – $635", sub: "3 hrs, booth concierge, stanchions, unlimited 4K videos, custom template" },
{ value: "platinum", label: "Platinum 360 Booth", displayLabel: "Platinum 360 Booth – $835", sub: "All Gold features + Hollywood red carpet, animated overlays, props" },
{ value: "glamour", label: "Glamour Booth", displayLabel: "Glamour Booth – $999", sub: "Professional camera & lighting, glamour overlay, custom print sleeves" },
{ value: "glamour-plus", label: "Glamour Booth+", displayLabel: "Glamour Booth+ – From $1,200", sub: "All Glamour features + enhanced luxury styling, VIP experience" }];


const otherAddOns = [
{ value: "balloon-decor", label: "Balloon Décor", price: "$150" },
{ value: "champagne-wall", label: "Champagne Wall", price: "$150" },
{ value: "event-photography", label: "Event Photography", price: "From $225" },
{ value: "alcohol-pickup", label: "Concierge Alcohol Pickup", price: "$50" },
{ value: "generator", label: "Generator Rental", price: "$100" },
{ value: "extra-time", label: "Extra Service Time", price: "$150/hr" }];


/** Convert "2:30 PM" → minutes since midnight */
const parseTimeToMinutes = (time: string): number => {
  const [timePart, period] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

const BookingSection = () => {
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedBooth, setSelectedBooth] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [extraHoursManual, setExtraHoursManual] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleAddOn = (value: string) => {
    setSelectedAddOns((prev) =>
    prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  /** Auto-calculated extra hours based on event duration */
  const calculatedExtraHours = useMemo(() => {
    if (!startTime || !endTime) return 0;
    const startMin = parseTimeToMinutes(startTime);
    const endMin = parseTimeToMinutes(endTime);
    const durationHours = (endMin - startMin) / 60;
    if (durationHours <= INCLUDED_HOURS) return 0;
    return Math.ceil(durationHours - INCLUDED_HOURS);
  }, [startTime, endTime]);

  /** Final extra hours: manual override if set, otherwise auto-calculated */
  const extraHours = extraHoursManual !== null ? extraHoursManual : calculatedExtraHours;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Build payload with individual add-on fields
    const payload: Record<string, unknown> = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      eventDate: formData.get("eventDate"),
      eventLocation: formData.get("eventLocation"),
      startTime,
      endTime,
      eventType: formData.get("eventType"),
      guestCount: formData.get("guestCount"),
      package: packageOptions.find((p) => p.value === selectedPackage)?.label || selectedPackage,
      details: formData.get("details"),
      ...(selectedBooth && { "360 Photo Booth": boothOptions.find((b) => b.value === selectedBooth)?.label || selectedBooth })
    };

    // Add Extra Service Time with quantity
    if (extraHours > 0) {
      payload["Extra Service Time"] = extraHours;
    }

    // Add selected add-ons as numbered entries with their names
    const selectedAddOnLabels = otherAddOns.filter((addon) => selectedAddOns.includes(addon.value));
    selectedAddOnLabels.forEach((addon, index) => {
      payload[`Add-Ons${index + 1}`] = addon.label;
    });

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const formBody = new URLSearchParams();
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formBody.append(key, String(value));
        }
      });

      const res = await fetch("https://aismartlinx.app.n8n.cloud/webhook-test/40fe32f0-4267-47c4-8f69-e190b4ea9737", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody.toString(),
        signal: controller.signal,
        mode: "no-cors"
      });

      clearTimeout(timeoutId);
      toast.success("Thank you for reaching out to Little Mixxy! We've received your booking request, and our team will follow up shortly. For urgent bookings, feel free to call us directly at 678-462-1651.");
      form.reset();
      setSelectedPackage("");
      setSelectedAddOns([]);
      setSelectedBooth("");
      setStartTime("");
      setEndTime("");
      setExtraHoursManual(null);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        toast.error("Request timed out. Please try again or contact us directly.");
      } else {
        toast.error("Something went wrong. Please try again or contact us directly.");
      }
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
          transition={{ duration: 0.6 }}>

          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center text-foreground mb-4">Reserve Your Little Mixxy Experience

          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">Ready to get Mixxy? Tell us about your event below and our team will be in touch with you within one business day.

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
                <select
                  name="startTime"
                  required
                  className={selectClass}
                  value={startTime}
                  onChange={(e) => {setStartTime(e.target.value);setExtraHoursManual(null);}}>

                  <option value="" disabled>Select start time</option>
                  {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>End Time *</label>
                <select
                  name="endTime"
                  required
                  className={selectClass}
                  value={endTime}
                  onChange={(e) => {setEndTime(e.target.value);setExtraHoursManual(null);}}>

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
                {packageOptions.map((pkg) =>
                <label
                  key={pkg.value}
                  className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedPackage === pkg.value ?
                  "border-primary bg-primary/10" :
                  "border-border bg-secondary hover:border-muted-foreground/30"}`
                  }>

                    <input
                    type="radio"
                    name="package"
                    value={pkg.value}
                    required
                    checked={selectedPackage === pkg.value}
                    onChange={() => setSelectedPackage(pkg.value)}
                    className="mt-1 accent-primary" />

                    <div>
                      <p className="font-semibold text-foreground text-sm">{pkg.displayLabel}</p>
                      
                    </div>
                  </label>
                )}
              </div>

              {/* Auto-calculated extra service time display */}
              {selectedPackage && startTime && endTime && calculatedExtraHours > 0 &&
              <div className="mt-3 p-3 rounded-lg border border-accent/30 bg-accent/5">
                  <p className="text-sm text-foreground">
                    ⏱ Your event is{" "}
                    <strong>{((parseTimeToMinutes(endTime) - parseTimeToMinutes(startTime)) / 60).toFixed(1)} hours</strong>
                    , which exceeds the included {INCLUDED_HOURS} hours.
                  </p>
                  <p className="text-sm text-accent font-semibold mt-1">
                    Suggested extra service time: {calculatedExtraHours} hr{calculatedExtraHours > 1 ? "s" : ""} (+${calculatedExtraHours * 150})
                  </p>
                </div>
              }
            </div>

            {/* Extra Service Time – manual adjustment */}
            <div>
              <label className={labelClass}>
                Extra Service Time ($150/hr){calculatedExtraHours > 0 ? " *" : ""}
              </label>
              <div className="flex items-center gap-3">
                <select
                  className={selectClass}
                  value={extraHours}
                  onChange={(e) => setExtraHoursManual(Number(e.target.value))}
                  required={calculatedExtraHours > 0}>

                  {calculatedExtraHours === 0 && <option value={0}>No extra time</option>}
                  {Array.from({ length: 6 }, (_, i) => i + 1).
                  filter((h) => h >= calculatedExtraHours).
                  map((h) =>
                  <option key={h} value={h}>
                        {h} hour{h > 1 ? "s" : ""} (+${h * 150})
                      </option>
                  )}
                </select>
              </div>
              {extraHoursManual !== null && extraHoursManual !== calculatedExtraHours && calculatedExtraHours > 0 &&
              <p className="text-xs text-muted-foreground mt-1">
                  Auto-suggested was {calculatedExtraHours} hr{calculatedExtraHours > 1 ? "s" : ""}. You've manually set {extraHoursManual}.
                </p>
              }
            </div>

            {/* 360 Photo Booth Packages */}
            <div>
              <label className={labelClass}>360 Photo Booth Package</label>
              <div className="space-y-3">
                {boothOptions.map((booth) =>
                <label
                  key={booth.value}
                  className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedBooth === booth.value ?
                  "border-primary bg-primary/10" :
                  "border-border bg-secondary hover:border-muted-foreground/30"}`
                  }>

                    <input
                    type="radio"
                    name="booth"
                    value={booth.value}
                    checked={selectedBooth === booth.value}
                    onChange={() => setSelectedBooth(booth.value)}
                    className="mt-1 accent-primary" />

                    <div>
                      <p className="font-semibold text-foreground text-sm">{booth.displayLabel}</p>
                      
                    </div>
                  </label>
                )}
                {selectedBooth &&
                <button
                  type="button"
                  onClick={() => setSelectedBooth("")}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors underline">

                    Remove booth selection
                  </button>
                }
              </div>
            </div>

            {/* Other Add-Ons */}
            <div>
              <label className={labelClass}>Add-Ons (optional)</label>
              <div className="grid sm:grid-cols-2 gap-3">
                {otherAddOns.map((addon) =>
                <label
                  key={addon.value}
                  className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedAddOns.includes(addon.value) ?
                  "border-primary bg-primary/10" :
                  "border-border bg-secondary hover:border-muted-foreground/30"}`
                  }>

                    <input
                    type="checkbox"
                    checked={selectedAddOns.includes(addon.value)}
                    onChange={() => toggleAddOn(addon.value)}
                    className="accent-primary" />

                    <div>
                      <p className="font-semibold text-foreground text-sm">{addon.label}</p>
                      
                    </div>
                  </label>
                )}
              </div>
            </div>

            <div>
              <label className={labelClass}>Tell us more! We love the details.</label>
              <textarea name="details" rows={4} className={inputClass} placeholder="Any special requests, themes, or details about your event..." />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors disabled:opacity-50">

              {isSubmitting ? "Submitting..." : "Submit Booking Request"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>);

};

export default BookingSection;