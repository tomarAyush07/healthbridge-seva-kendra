
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

const Newsletter = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <section className="py-16 bg-healthbridge-blue relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-healthbridge-teal/30 rounded-full blur-3xl" />
        <div className="absolute left-1/4 top-1/4 w-1/4 h-1/4 bg-healthbridge-blue/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
            {t('subscribe')}
          </h2>
          
          <p className="text-white/80 mb-8">
            Get the latest updates about health schemes, camps, and wellness tips delivered directly to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input 
              type="email"
              placeholder={t('email_placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/90 border-0 placeholder:text-gray-500 text-gray-900 h-12"
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-healthbridge-orange hover:bg-healthbridge-orange/90 h-12 px-8"
            >
              {isSubmitting ? 'Subscribing...' : t('subscribe_button')}
            </Button>
          </form>
          
          <p className="mt-4 text-white/60 text-sm">
            By subscribing, you agree to our Privacy Policy and consent to receive health-related updates.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
