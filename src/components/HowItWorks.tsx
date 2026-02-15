import { motion } from "framer-motion";
import { ListChecks, Truck, ChefHat } from "lucide-react";

const steps = [
  {
    icon: ListChecks,
    title: "Je choisis ma formule",
    description: "Végétarienne, diététique ou sportive : sélectionnez le panier qui vous correspond.",
  },
  {
    icon: Truck,
    title: "Je reçois mon panier",
    description: "Livraison gratuite chaque semaine avec des produits frais et locaux.",
  },
  {
    icon: ChefHat,
    title: "Je cuisine en 30 min",
    description: "Des recettes simples et savoureuses, prêtes en un clin d'œil.",
  },
];

const HowItWorks = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-light text-foreground mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Trois étapes simples pour manger sainement sans effort
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <span className="text-sm font-medium text-accent uppercase tracking-wider mb-2 block">
                Étape {index + 1}
              </span>
              <h3 className="text-xl font-heading font-medium text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
