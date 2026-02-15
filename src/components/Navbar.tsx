import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isHome ? "bg-transparent" : "bg-background/90 backdrop-blur-md border-b"}`}
      style={!isHome ? { borderColor: '#F5F1E8' } : {}}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-heading font-light text-xl tracking-wide">
          <span className={isHome ? "text-cream" : "text-foreground"}>
            Les Paniers d'Océane
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-sm font-medium transition-colors ${isHome ? "text-cream/80 hover:text-cream" : "text-muted-foreground hover:text-foreground"}`}>
            Accueil
          </Link>
          <Link
            to="/commander"
            className="text-sm font-medium bg-primary text-primary-foreground px-5 py-2 rounded-full hover:bg-primary/90 transition-all duration-300 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 hover:-translate-y-0.5 border border-primary/20"
          >
            Commander
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden ${isHome ? "text-cream" : "text-foreground"}`}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b overflow-hidden"
            style={{ borderColor: '#F5F1E8' }}
          >
            <div className="px-6 py-4 space-y-3">
              <Link to="/" onClick={() => setOpen(false)} className="block text-foreground py-2">Accueil</Link>
              <Link to="/commander" onClick={() => setOpen(false)} className="block bg-primary text-primary-foreground text-center py-3 rounded-full font-medium shadow-md shadow-primary/25 hover:shadow-lg transition-all duration-300 border border-primary/20">
                Commander
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
