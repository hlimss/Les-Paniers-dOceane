import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Formulas from "@/components/Formulas";
import WhyUs from "@/components/WhyUs";
import Exercises from "@/components/Exercises";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main style={{ backgroundColor: '#FEFDFB', minHeight: '100vh' }}>
      <HeroSection />
      <HowItWorks />
      <Formulas />
      <WhyUs />
      <Exercises />
      <Testimonials />
      <Footer />
    </main>
  );
};

export default Index;
