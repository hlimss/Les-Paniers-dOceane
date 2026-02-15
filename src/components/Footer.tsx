import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-cream/80 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <Link to="/" className="inline-block mb-6">
          <span className="text-2xl font-heading font-light text-cream tracking-wide">
            Les Paniers d'Océane
          </span>
        </Link>

        <nav className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
          <Link to="/" className="hover:text-cream transition-colors">Accueil</Link>
          <Link to="/commander" className="hover:text-cream transition-colors">Commander</Link>
          <span className="cursor-default hover:text-cream transition-colors">À propos</span>
          <span className="cursor-default hover:text-cream transition-colors">Contact</span>
          <span className="cursor-default hover:text-cream transition-colors">CGV</span>
          <span className="cursor-default hover:text-cream transition-colors">Mentions légales</span>
        </nav>

        <div className="flex justify-center mb-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-cream/20 transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        <p className="text-xs text-cream/50">
          © 2025 Les Paniers d'Océane. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
