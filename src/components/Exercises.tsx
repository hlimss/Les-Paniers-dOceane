import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Heart, Zap, Target } from "lucide-react";
import { useState, useEffect } from "react";

interface Exercise {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  description: string;
  instructions: string[];
  difficulty: "Débutant" | "Intermédiaire" | "Avancé";
  duration: string;
  muscles: string[];
}

const exercises: Exercise[] = [
  {
    id: "1",
    name: "Squats",
    category: "Jambes",
    icon: Dumbbell,
    image: "https://plus.unsplash.com/premium_photo-1666736569069-79c1789adf52?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Exercice fondamental pour renforcer les jambes et les fessiers",
    instructions: [
      "Tenez-vous debout, pieds écartés à la largeur des épaules",
      "Gardez le dos droit et les abdominaux contractés",
      "Descendez lentement en pliant les genoux jusqu'à ce que vos cuisses soient parallèles au sol",
      "Poussez sur vos talons pour remonter à la position de départ",
      "Répétez 12-15 fois pour 3 séries"
    ],
    difficulty: "Débutant",
    duration: "10 min",
    muscles: ["Quadriceps", "Fessiers", "Mollets"]
  },
  {
    id: "2",
    name: "Pompes",
    category: "Haut du corps",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1758875570185-eaed16371474?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBvbXBlcyUyMGd5bXxlbnwwfHwwfHx8MA%3D%3D",
    description: "Renforcez les bras, les épaules et la poitrine",
    instructions: [
      "Placez-vous en position de planche, mains au sol, écartées à la largeur des épaules",
      "Gardez le corps aligné de la tête aux pieds",
      "Descendez lentement en pliant les bras jusqu'à ce que votre poitrine touche presque le sol",
      "Poussez pour remonter à la position de départ",
      "Répétez 8-12 fois pour 3 séries"
    ],
    difficulty: "Intermédiaire",
    duration: "15 min",
    muscles: ["Pectoraux", "Triceps", "Épaules"]
  },
  {
    id: "3",
    name: "Planche",
    category: "Abdominaux",
    icon: Target,
    image: "https://plus.unsplash.com/premium_photo-1675691395861-0f92bfc48c14?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGxhbmNoZSUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D",
    description: "Renforcez le gainage et les abdominaux profonds",
    instructions: [
      "Placez-vous face au sol, appuyé sur les avant-bras et les orteils",
      "Gardez le corps droit et aligné, comme une planche",
      "Contractez les abdominaux et maintenez la position",
      "Respiration normale et régulière",
      "Tenez 30-60 secondes pour 3 séries"
    ],
    difficulty: "Débutant",
    duration: "5 min",
    muscles: ["Abdominaux", "Dos", "Épaules"]
  },
  {
    id: "4",
    name: "Burpees",
    category: "Cardio",
    icon: Zap,
    image: "https://plus.unsplash.com/premium_photo-1726481790240-550e63b17862?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVycGVlcyUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D",
    description: "Exercice complet pour améliorer l'endurance et la force",
    instructions: [
      "Commencez debout, puis accroupissez-vous et placez les mains au sol",
      "Sautez les pieds en arrière pour arriver en position de planche",
      "Faites une pompe (optionnel pour débutants)",
      "Ramenez les pieds vers les mains en sautant",
      "Sautez en l'air avec les bras levés",
      "Répétez 8-10 fois pour 3 séries"
    ],
    difficulty: "Avancé",
    duration: "20 min",
    muscles: ["Tout le corps", "Cardio"]
  },
  {
    id: "5",
    name: "Fentes",
    category: "Jambes",
    icon: Dumbbell,
    image: "https://images.unsplash.com/photo-1650116385006-2a82a7b9941b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmVudGVzJTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D",
    description: "Renforcez les jambes et améliorez l'équilibre",
    instructions: [
      "Tenez-vous debout, pieds joints",
      "Faites un grand pas en avant avec une jambe",
      "Descendez jusqu'à ce que les deux genoux soient à 90 degrés",
      "Poussez sur la jambe avant pour revenir à la position de départ",
      "Alternez les jambes",
      "Répétez 10-12 fois par jambe pour 3 séries"
    ],
    difficulty: "Intermédiaire",
    duration: "12 min",
    muscles: ["Quadriceps", "Fessiers", "Ischio-jambiers"]
  },
  {
    id: "6",
    name: "Gainage latéral",
    category: "Abdominaux",
    icon: Target,
    image: "https://media.istockphoto.com/id/1470239881/fr/photo/femme-%C3%A2g%C3%A9e-en-forme-heureuse-debout-en-planche-lat%C3%A9rale-entra%C3%AEnement-sur-tapis-de-yoga-dans.webp?a=1&b=1&s=612x612&w=0&k=20&c=sYtZFW5zVI11V3sXWpPnH8DUmGGH_ZCV4Mew5b-mLLg=",
    description: "Renforcez les obliques et améliorez la stabilité",
    instructions: [
      "Allongez-vous sur le côté, appuyé sur l'avant-bras",
      "Soulevez les hanches pour former une ligne droite",
      "Gardez le corps aligné, ne laissez pas les hanches tomber",
      "Maintenez la position en contractant les abdominaux",
      "Tenez 30-45 secondes de chaque côté pour 3 séries"
    ],
    difficulty: "Intermédiaire",
    duration: "8 min",
    muscles: ["Obliques", "Abdominaux", "Épaules"]
  }
];

const difficultyColors = {
  "Débutant": "bg-primary/20 text-primary",
  "Intermédiaire": "bg-accent/20 text-accent",
  "Avancé": "bg-destructive/20 text-destructive"
};

const Exercises = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // Fermer le modal avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedExercise(null);
      }
    };
    if (selectedExercise) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedExercise]);

  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-light text-foreground mb-4">
            Exercices & Entraînements
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Découvrez des exercices simples et efficaces pour compléter votre alimentation équilibrée
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {exercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-card rounded-2xl overflow-hidden border border-cream-beige/50 shadow-md hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300 hover:border-primary/40 cursor-pointer"
              onClick={() => setSelectedExercise(exercise)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[exercise.difficulty]}`}>
                    {exercise.difficulty}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center">
                    <exercise.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-heading font-medium text-foreground">
                    {exercise.name}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{exercise.category}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {exercise.description}
                </p>

                {/* Info badges */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {exercise.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    {exercise.muscles.length} groupes
                  </span>
                </div>

                <button className="w-full py-2.5 rounded-full border-2 border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0">
                  Voir les instructions
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal pour les instructions détaillées */}
      <AnimatePresence>
        {selectedExercise && (
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedExercise(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-cream-beige/50 shadow-2xl"
          >
            {/* Image header */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={selectedExercise.image}
                alt={selectedExercise.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <button
                onClick={() => setSelectedExercise(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              >
                <span className="text-2xl text-foreground">×</span>
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-3xl font-heading font-medium text-foreground mb-2">
                    {selectedExercise.name}
                  </h3>
                  <p className="text-muted-foreground">{selectedExercise.category}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${difficultyColors[selectedExercise.difficulty]}`}>
                  {selectedExercise.difficulty}
                </span>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {selectedExercise.description}
              </p>

              {/* Instructions */}
              <div className="mb-6">
                <h4 className="text-xl font-heading font-medium text-foreground mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Instructions
                </h4>
                <ol className="space-y-3">
                  {selectedExercise.instructions.map((instruction, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-3 text-muted-foreground leading-relaxed"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-medium">
                        {idx + 1}
                      </span>
                      <span>{instruction}</span>
                    </motion.li>
                  ))}
                </ol>
              </div>

              {/* Muscles travaillés */}
              <div className="pt-6 border-t border-cream-beige/50">
                <h4 className="text-lg font-heading font-medium text-foreground mb-3">
                  Muscles sollicités
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExercise.muscles.map((muscle, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Exercises;
