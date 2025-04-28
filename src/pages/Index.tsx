import { useState, useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ServiceCards from "../components/ServiceCards";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import ImpactSection from "../components/ImpactSection";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Show loader for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen onFinished={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ServiceCards />
        <Stats />
        <ImpactSection />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
