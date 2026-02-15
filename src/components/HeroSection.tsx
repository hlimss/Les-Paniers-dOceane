import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-basket.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Panier de légumes frais et bio"
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(0.85) contrast(1.1) saturate(1.2) hue-rotate(-5deg)',
            transform: 'scale(1.05)',
          }}
          loading="eager"
        />
        {/* Overlay gradient amélioré avec teinte sage-green pour harmoniser les couleurs */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/75" />
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to right, rgba(156, 175, 136, 0.15) 0%, transparent 50%), radial-gradient(ellipse at center, transparent 0%, rgba(44, 44, 44, 0.6) 100%)'
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-heading font-light text-cream tracking-tight mb-6"
        >
          Mangez mieux.{" "}
          <span className="font-medium italic">Simplement.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-cream/80 font-light mb-10 leading-relaxed"
        >
          Des paniers repas équilibrés, livrés chez vous chaque semaine
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to="/commander"
            className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 border border-primary/20 hover:border-primary/40"
          >
            Commander mon panier
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-8 h-8 text-cream/60" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
