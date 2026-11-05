import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const isDeclined = searchParams.get("response") === "declined";

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Thank You | Little Mixxy";
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;550;600&display=swap";
    document.head.appendChild(fontLink);
    return () => {
      document.title = previousTitle;
      fontLink.remove();
    };
  }, []);

  return (
    <div className="confirmation-page min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border bg-card px-6 py-5 sm:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link to="/" aria-label="Little Mixxy home">
            <img src={logo} alt="Little Mixxy" className="h-14 w-auto max-w-[160px] object-contain" />
          </Link>
          <span className="text-xs font-medium text-muted-foreground sm:text-sm">Let’s Get Mixxy!</span>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-16 sm:py-24">
        <div className="w-full max-w-xl text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
            <Check className="h-9 w-9" strokeWidth={1.5} aria-hidden="true" />
          </div>
          <p className="mb-4 text-xs font-medium uppercase text-primary">Little Mixxy · Atlanta</p>
          <h1 className="text-3xl font-[550] leading-tight sm:text-5xl">
            {isDeclined ? "Thank you for letting us know." : <>Thank you for<br className="hidden sm:block" /> your response.</>}
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
            {isDeclined
              ? "You’ve chosen not to proceed with this proposal. Thank you for considering Little Mixxy for your event."
              : "We’ve received your proposal response. Our team will be in touch shortly with the next steps."}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            {isDeclined
              ? "If your plans change, we’d love to hear from you."
              : "Your event booking is not yet confirmed."}
          </p>
          <Button asChild size="lg" className="mt-9">
            <Link to="/"><ArrowLeft aria-hidden="true" />Back to Little Mixxy</Link>
          </Button>
          <div className="mx-auto mt-12 max-w-sm border-t border-border pt-6">
            <p className="mb-2 text-sm text-muted-foreground">For urgent requests, give us a call.</p>
            <Button asChild variant="link" className="text-foreground">
              <a href="tel:6784621651"><Phone aria-hidden="true" />678-462-1651</a>
            </Button>
          </div>
        </div>
      </main>

      <footer className="border-t border-border px-6 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Little Mixxy. All rights reserved.
      </footer>
    </div>
  );
};

export default ThankYou;