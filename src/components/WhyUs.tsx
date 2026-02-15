import { motion } from "framer-motion";
import { MapPin, Salad, Truck, Clock } from "lucide-react";

const reasons = [
  {
    icon: MapPin,
    title: "Produits frais & locaux",
    description: "Des ingrédients sourcés auprès de producteurs de votre région.",
  },
  {
    icon: Salad,
    title: "Recettes équilibrées",
    description: "Élaborées par une nutritionniste pour votre bien-être au quotidien.",
  },
  {
    icon: Truck,
    title: "Livraison gratuite",
    description: "Livré directement chez vous, sans frais supplémentaires.",
  },
  {
    icon: Clock,
    title: "30 min de cuisine max",
    description: "Des recettes pensées pour les emplois du temps chargés.",
  },
];

const WhyUs = () => {
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
            Pourquoi nous choisir ?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <reason.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-heading font-medium text-foreground mb-2">
                {reason.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
