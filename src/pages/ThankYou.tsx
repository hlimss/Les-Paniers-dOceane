import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const ThankYou = () => {
  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: '#FEFDFB', paddingTop: '100px' }}>
      <div className="flex-1 flex items-center justify-center px-6" style={{ minHeight: 'calc(100vh - 100px)' }}>
        <div className="text-center max-w-lg w-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <CheckCircle className="w-20 h-20 text-primary mx-auto mb-8" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-heading font-light text-foreground mb-4"
          >
            Merci pour votre commande 🌿
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground text-lg mb-10 leading-relaxed"
          >
            Océane prépare votre panier avec soin. Vous recevrez un email de confirmation très bientôt.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Link
              to="/"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-all hover:scale-105"
            >
              Retour à l'accueil
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ThankYou;
