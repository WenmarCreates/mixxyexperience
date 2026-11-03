import { describe, expect, it } from "vitest";
import { packages } from "@/components/PricingSection";
import { packageOptions } from "@/components/BookingSection";

const drinkCards = packages.filter((p) => !p.name.includes("Satellite") && !p.name.includes("Tap & Go"));

describe("drink package consistency", () => {
  it("shows Mixxy PG, Mixxy Classic and Mixxy Premium on the pricing page", () => {
    expect(drinkCards.map((p) => p.name)).toEqual(["Mixxy PG", "Mixxy Classic", "Mixxy Premium"]);
  });

  it("prices Mixxy Classic at $775 on the pricing page and in the booking form", () => {
    expect(drinkCards.find((p) => p.name === "Mixxy Classic")?.price).toBe("$775");
    expect(packageOptions.find((p) => p.label === "Mixxy Classic")?.displayLabel).toBe("Mixxy Classic – $775");
  });

  it("no longer offers Mixxy Plus on the pricing page or in the booking form", () => {
    expect(packages.some((p) => p.name === "Mixxy Plus")).toBe(false);
    expect(packageOptions.some((p) => p.label === "Mixxy Plus")).toBe(false);
  });

  it("offers the same drink packages in the booking form as on the pricing page", () => {
    expect(packageOptions.map((p) => p.label)).toEqual(drinkCards.map((p) => p.name));
  });
});
