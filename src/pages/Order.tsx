import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Heart, Dumbbell, Minus, Plus, Check, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const formulas = [
  { id: "vegetarienne", name: "Végétarienne", price: 11.9, icon: Leaf },
  { id: "dietetique", name: "Diététique", price: 12.9, icon: Heart },
  { id: "sportive", name: "Sportive", price: 13.5, icon: Dumbbell },
];

const frequencies = [
  { id: "unique", name: "Commande unique", discount: 0 },
  { id: "hebdomadaire", name: "Hebdomadaire", discount: 10, badge: "-10%" },
  { id: "bimensuelle", name: "Bimensuelle", discount: 5, badge: "-5%" },
];

const clientSchema = z.object({
  fullName: z.string().trim().min(2, "Nom requis").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().min(10, "Téléphone requis").max(20),
  address: z.string().trim().min(5, "Adresse requise").max(300),
  postalCode: z.string().trim().min(4, "Code postal requis").max(10),
  city: z.string().trim().min(2, "Ville requise").max(100),
  allergies: z.string().max(500).optional(),
  cgv: z.literal(true, { errorMap: () => ({ message: "Vous devez accepter les CGV" }) }),
});

type ClientForm = z.infer<typeof clientSchema>;

const steps = ["Formule", "Quantité", "Fréquence", "Informations"];

const Order = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formula, setFormula] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [frequency, setFrequency] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientForm>({ resolver: zodResolver(clientSchema) });

  const selectedFormula = formulas.find((f) => f.id === formula);
  const selectedFrequency = frequencies.find((f) => f.id === frequency);
  const discount = selectedFrequency?.discount ?? 0;
  const unitPrice = selectedFormula?.price ?? 0;
  const total = unitPrice * quantity * (1 - discount / 100);

  const canNext = () => {
    if (step === 0) return !!formula;
    if (step === 1) return quantity > 0;
    if (step === 2) return !!frequency;
    return true;
  };

  const onSubmit = async (data: ClientForm) => {
    if (!formula || !frequency || !selectedFormula) {
      toast.error("Veuillez compléter toutes les étapes");
      return;
    }

    setIsLoading(true);

    try {
      // Stocker les données de commande dans localStorage (optionnel)
      const orderData = {
        formula: selectedFormula.name,
        quantity,
        frequency: selectedFrequency?.name || frequency,
        client: {
          ...data,
          preferences,
        },
        total,
        date: new Date().toISOString(),
        orderNumber: `OC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      };

      // Sauvegarder dans localStorage pour référence
      localStorage.setItem('lastOrder', JSON.stringify(orderData));

      // Simuler un délai pour l'UX
      await new Promise(resolve => setTimeout(resolve, 500));

      // Redirection directe vers la page de confirmation
      navigate('/merci');
    } catch (error) {
      console.error("Error processing order:", error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-0" style={{ backgroundColor: '#FEFDFB' }}>
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-heading font-light text-foreground text-center mb-12">
          Commander mon panier
        </h1>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-12">
          {steps.map((label, i) => (
            <div key={label} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    i < step
                      ? "bg-primary text-primary-foreground"
                      : i === step
                      ? "bg-primary/20 text-primary border-2 border-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                  style={{
                    backgroundColor: i < step ? '#9CAF88' : i === step ? 'rgba(156, 175, 136, 0.2)' : undefined,
                    borderColor: i === step ? '#9CAF88' : undefined
                  }}
                >
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className="text-xs text-muted-foreground mt-1 hidden sm:block">{label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-2 ${i < step ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Formula */}
            {step === 0 && (
              <div className="space-y-4">
                {formulas.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFormula(f.id)}
                    onMouseDown={(e) => {
                      const checkCircle = e.currentTarget.querySelector('[class*="rounded-full"][class*="border-2"]') as HTMLElement;
                      if (checkCircle) {
                        checkCircle.style.borderColor = '#E8B4B8';
                        checkCircle.style.backgroundColor = '#E8B4B8';
                      }
                    }}
                    onMouseUp={(e) => {
                      const checkCircle = e.currentTarget.querySelector('[class*="rounded-full"][class*="border-2"]') as HTMLElement;
                      if (checkCircle && formula === f.id) {
                        checkCircle.style.borderColor = '#9CAF88';
                        checkCircle.style.backgroundColor = '#9CAF88';
                      }
                    }}
                    className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all duration-300 text-left ${
                      formula === f.id
                        ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                        : "border-border/50 hover:border-primary/40 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <f.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-heading font-medium text-foreground">{f.name}</p>
                      <p className="text-sm text-muted-foreground">{f.price.toFixed(2)}€ / panier</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        formula === f.id ? "border-primary bg-primary" : "border-muted"
                      }`}
                      style={{
                        borderColor: formula === f.id ? '#9CAF88' : '#F5F1E8',
                        backgroundColor: formula === f.id ? '#9CAF88' : 'transparent'
                      }}
                    >
                      {formula === f.id && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Quantity */}
            {step === 1 && (
              <div className="text-center space-y-8">
                <p className="text-muted-foreground">Combien de paniers souhaitez-vous ?</p>
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center hover:border-primary transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-5xl font-heading font-light text-foreground w-20 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center hover:border-primary transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-lg font-heading text-foreground">
                  Total : <span className="font-medium">{(unitPrice * quantity).toFixed(2)}€</span>
                </p>
              </div>
            )}

            {/* Step 3: Frequency */}
            {step === 2 && (
              <div className="space-y-4">
                {frequencies.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFrequency(f.id)}
                    onMouseDown={(e) => {
                      const checkCircle = e.currentTarget.querySelector('[class*="rounded-full"][class*="border-2"]') as HTMLElement;
                      if (checkCircle) {
                        checkCircle.style.borderColor = '#E8B4B8';
                        checkCircle.style.backgroundColor = '#E8B4B8';
                      }
                    }}
                    onMouseUp={(e) => {
                      const checkCircle = e.currentTarget.querySelector('[class*="rounded-full"][class*="border-2"]') as HTMLElement;
                      if (checkCircle && frequency === f.id) {
                        checkCircle.style.borderColor = '#9CAF88';
                        checkCircle.style.backgroundColor = '#9CAF88';
                      }
                    }}
                    className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all duration-300 text-left ${
                      frequency === f.id
                        ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                        : "border-border/50 hover:border-primary/40 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="flex-1">
                      <p className="font-heading font-medium text-foreground">{f.name}</p>
                    </div>
                    {f.badge && (
                      <span className="text-xs font-medium bg-accent text-accent-foreground px-3 py-1 rounded-full">
                        {f.badge}
                      </span>
                    )}
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        frequency === f.id ? "border-primary bg-primary" : "border-muted"
                      }`}
                      style={{
                        borderColor: frequency === f.id ? '#9CAF88' : '#F5F1E8',
                        backgroundColor: frequency === f.id ? '#9CAF88' : 'transparent'
                      }}
                    >
                      {frequency === f.id && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                  </button>
                ))}
                {frequency && (
                  <p className="text-center text-lg font-heading text-foreground mt-6">
                    Total : <span className="font-medium">{total.toFixed(2)}€</span>
                    {discount > 0 && (
                      <span className="text-sm text-accent ml-2">(-{discount}%)</span>
                    )}
                  </p>
                )}
              </div>
            )}

            {/* Step 4: Client info */}
            {step === 3 && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" id="order-form">
                {[
                  { name: "fullName" as const, label: "Nom complet", type: "text" },
                  { name: "email" as const, label: "Email", type: "email" },
                  { name: "phone" as const, label: "Téléphone", type: "tel" },
                  { name: "address" as const, label: "Adresse", type: "text" },
                  { name: "postalCode" as const, label: "Code postal", type: "text" },
                  { name: "city" as const, label: "Ville", type: "text" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      {field.label} *
                    </label>
                    <input
                      {...register(field.name)}
                      type={field.type}
                      className="w-full px-4 py-3 rounded-xl border-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 shadow-sm focus:shadow-md focus:-translate-y-0.5"
                      style={{ borderColor: '#F5F1E8' }}
                    />
                    {errors[field.name] && (
                      <p className="text-destructive text-xs mt-1">{errors[field.name]?.message}</p>
                    )}
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Allergies / Intolérances
                  </label>
                  <textarea
                    {...register("allergies")}
                    rows={3}
                    placeholder="Ex: Arachides, lactose, gluten..."
                    className="w-full px-4 py-3 rounded-xl border-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-none placeholder:text-muted-foreground/50 shadow-sm focus:shadow-md focus:-translate-y-0.5"
                    style={{ borderColor: '#F5F1E8' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Préférences alimentaires (optionnel)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Végétarien", "Vegan", "Sans gluten", "Sans lactose"].map((pref) => (
                      <label
                        key={pref}
                        className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                        style={{ borderColor: '#F5F1E8' }}
                      >
                        <input
                          type="checkbox"
                          checked={preferences.includes(pref)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setPreferences([...preferences, pref]);
                            } else {
                              setPreferences(preferences.filter((p) => p !== pref));
                            }
                          }}
                          className="w-4 h-4 rounded"
                          style={{ accentColor: '#9CAF88' }}
                        />
                        <span className="text-sm text-foreground">{pref}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-muted/30 rounded-xl p-4 border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Récapitulatif</span>
                    <span className="text-lg font-heading font-medium text-foreground">
                      {total.toFixed(2)}€
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span>{selectedFormula.name}</span>
                      <span>{quantity}x</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-accent">
                        <span>Réduction ({discount}%)</span>
                        <span>-{(unitPrice * quantity * (discount / 100)).toFixed(2)}€</span>
                      </div>
                    )}
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("cgv")}
                    className="mt-1 w-4 h-4 rounded"
                    style={{ accentColor: '#9CAF88' }}
                  />
                  <span className="text-sm text-muted-foreground">
                    J'accepte les{" "}
                    <a href="#" className="text-primary hover:underline">
                      conditions générales de vente
                    </a>{" "}
                    *
                  </span>
                </label>
                {errors.cgv && (
                  <p className="text-destructive text-xs">{errors.cgv.message}</p>
                )}
              </form>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-10 mb-20">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 rounded-full border-2 border-primary/30 bg-background text-foreground hover:bg-primary/5 hover:border-primary/60 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              Retour
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => canNext() && setStep(step + 1)}
              disabled={!canNext()}
              className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg border border-primary/20 disabled:border-primary/10"
            >
              Suivant
            </button>
          ) : (
            <button
              type="submit"
              form="order-form"
              disabled={isLoading}
              className="px-8 py-3 rounded-full bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg flex items-center gap-2 border border-accent/20"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Traitement...
                </>
              ) : (
                "Procéder au paiement"
              )}
            </button>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Order;
