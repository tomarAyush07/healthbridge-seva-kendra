import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-healthbridge-light to-white py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-healthbridge-teal rounded-full blur-3xl" />
        <div className="absolute left-1/4 top-1/4 w-1/4 h-1/4 bg-healthbridge-orange rounded-full blur-3xl" />
      </div>

      <div className="container px-6 grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">
        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center text-center lg:text-left lg:items-start"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            <span className="text-gradient">{t('hero_title')}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
            {t('hero_subtitle')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Button 
              className="bg-healthbridge-blue hover:bg-healthbridge-blue/90 text-white px-8 py-6 rounded-xl text-lg"
            >
              {t('get_started')}
            </Button>
            <Button 
              variant="outline"
              className="border-healthbridge-blue text-healthbridge-blue hover:bg-healthbridge-blue/5 px-8 py-6 rounded-xl text-lg"
            >
              {t('learn_more')} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex items-center gap-6 flex-wrap justify-center lg:justify-start">
            <div className="flex items-center gap-2">
              <div className="bg-healthbridge-gold/20 rounded-full p-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-healthbridge-gold">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <span className="text-sm font-medium">Govt. Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-healthbridge-teal/20 rounded-full p-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-healthbridge-teal">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-healthbridge-orange/20 rounded-full p-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-healthbridge-orange">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <span className="text-sm font-medium">Secure & Private</span>
            </div>
          </div>
        </motion.div>
        
        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-healthbridge-teal to-healthbridge-blue rounded-2xl blur-xl opacity-20 animate-pulse-scale"></div>
            <img 
              src="/lovable-uploads/719f9236-4ef9-4250-aec0-901cdb639bd3.png"
              alt="AI-powered Healthcare Technology" 
              className="relative rounded-2xl shadow-xl w-full max-w-lg object-cover aspect-[16/9]"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 flex items-start gap-3 max-w-xs">
              <div className="bg-green-100 rounded-full p-2 mt-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">AI-Powered Healthcare</p>
                <p className="text-xl font-bold text-healthbridge-blue">Next-Gen Solutions</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
