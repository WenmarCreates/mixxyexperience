import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }} />

      <div className="absolute inset-0 bg-foreground/60" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10 mb-8">

          <Sparkles size={16} className="text-accent" />
          <span className="text-sm text-white/80">Atlanta's Premier Mobile Bar Experience</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl md:text-7xl font-heading font-bold text-white mb-2 drop-shadow-lg">
          LITTLE MIXXY

        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-5xl md:text-7xl text-gold-italic mb-8 drop-shadow-lg">
          Atlanta's Luxury Mobile Beverage Tap Cart

        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          From Italian-style tap carts and satellite bars to champagne walls, photography, and curated guest experiences, we create stylish, unforgettable moments for weddings, corporate events, private celebrations, and more.
 Let’s Get Mixxy!


        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">

          <a
            href="#pricing"
            className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-all inline-flex items-center gap-2">

            View Pricing <ArrowRight size={18} />
          </a>
          <a
            href="#booking"
            className="px-8 py-4 rounded-lg border border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-all">

            Book Now
          </a>
        </motion.div>
      </div>
    </section>);

};

export default HeroSection;