import { motion } from "framer-motion";
import { Leaf, Heart, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";

const formulas = [
  {
    icon: Leaf,
    name: "Végétarienne",
    price: "11,90€",
    badge: "Populaire",
    features: ["3 recettes végétariennes", "Pour 2 personnes", "Produits 100% bio"],
    badgeColor: "bg-primary text-primary-foreground",
  },
  {
    icon: Heart,
    name: "Diététique",
    price: "12,90€",
    badge: null,
    features: ["Repas équilibrés", "Complets & savoureux", "Validés par une nutritionniste"],
    badgeColor: "",
  },
  {
    icon: Dumbbell,
    name: "Sportive",
    price: "13,50€",
    badge: "Protéiné",
    features: ["Riche en protéines", "Aide à la récupération", "Énergie longue durée"],
    badgeColor: "bg-accent text-accent-foreground",
  },
];

const Formulas = () => {
  return (
    <section className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-light text-foreground mb-4">
            Nos Formules
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Choisissez le panier qui correspond à vos envies et vos besoins
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {formulas.map((formula, index) => (
            <motion.div
              key={formula.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ scale: 1.02, y: -6 }}
              className="relative bg-card rounded-2xl p-8 border-2 border-border/50 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:border-primary/30"
            >
              {formula.badge && (
                <span className={`absolute top-4 right-4 text-xs font-medium px-3 py-1 rounded-full ${formula.badgeColor}`}>
                  {formula.badge}
                </span>
              )}

              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <formula.icon className="w-6 h-6 text-primary" />
              </div>

              <h3 className="text-xl font-heading font-medium text-foreground mb-2">
                {formula.name}
              </h3>

              <div className="mb-6">
                <span className="text-3xl font-heading font-medium text-foreground">
                  {formula.price}
                </span>
                <span className="text-muted-foreground text-sm ml-1">/ panier</span>
              </div>

              <ul className="space-y-3 mb-8">
                {formula.features.map((feature) => (
                  <li key={feature} className="flex items-center text-muted-foreground text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/commander"
                className="block text-center w-full py-3 rounded-full border-2 border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
              >
                Découvrir
              </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Formulas;
