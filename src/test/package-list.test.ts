import { describe, expect, it } from "vitest";
import { packages, addOns, boothPackages } from "@/components/PricingSection";
import { packageOptions, otherAddOns, boothOptions } from "@/components/BookingSection";

const drinkCards = packages.filter((p) => !p.name.includes("Satellite") && !p.name.includes("Tap & Go"));
// Extra Service Time is auto-calculated from event times, so it is not a checkbox add-on.
const bookableAdvertisedAddOns = addOns.filter((a) => a.name !== "Extra Service Time");

describe("drink package consistency", () => {
  it("shows Mixxy PG, Mixxy Classic and Mixxy Premium on the pricing page", () => {
    expect(drinkCards.map((p) => p.name)).toEqual(["Mixxy PG", "Mixxy Classic", "Mixxy Premium"]);
  });

  it("prices Mixxy Classic at $775 on the pricing page and in the booking form", () => {
    expect(drinkCards.find((p) => p.name === "Mixxy Classic")?.price).toBe("$775");
    expect(packageOptions.find((p) => p.label === "Mixxy Classic")?.displayLabel?.split("$").at(-1)).toBe("775");
  });

  it("no longer offers Mixxy Plus on the pricing page or in the booking form", () => {
    expect(packages.some((p) => p.name === "Mixxy Plus")).toBe(false);
    expect(packageOptions.some((p) => p.label === "Mixxy Plus")).toBe(false);
  });

  it("offers the same drink packages in the booking form as on the pricing page", () => {
    expect(packageOptions.map((p) => p.label)).toEqual(drinkCards.map((p) => p.name));
  });
});

describe("add-on consistency", () => {
  it("lets customers select every advertised add-on in the booking form", () => {
    expect(otherAddOns.map((a) => a.label)).toEqual(bookableAdvertisedAddOns.map((a) => a.name));
  });

  it("prices the Custom Tap Truck Banner at a one-time $185 on the pricing page and in the booking form", () => {
    expect(addOns.find((a) => a.name === "Custom Tap Truck Banner")?.price).toBe("$185");
    expect(otherAddOns.find((a) => a.label === "Custom Tap Truck Banner")?.price).toBe("$185");
  });
});

describe("photo booth price consistency", () => {
  it("prices the Gold 360 Booth at $735 on the pricing page and in the booking form", () => {
    expect(boothPackages.find((p) => p.name === "Gold 360 Booth")?.price).toBe("$735");
    expect(boothOptions.find((p) => p.label === "Gold 360 Booth")?.displayLabel).toBe("Gold 360 Booth – $735");
  });

  it("prices every booth package the same on the pricing page and in the booking form", () => {
    boothPackages.forEach((pkg) => {
      const option = boothOptions.find((p) => p.label === pkg.name);
      expect(option?.displayLabel).toBe(`${pkg.name} – ${pkg.price}`);
    });
  });
});
