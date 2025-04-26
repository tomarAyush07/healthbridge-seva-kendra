
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const impactData = [
  {
    title: "Health Coverage",
    value: "1000+",
    description: "Villages reached with essential healthcare services"
  },
  {
    title: "Maternal Health",
    value: "40%",
    description: "Reduction in maternal mortality in served areas"
  },
  {
    title: "Disease Prevention",
    value: "70%",
    description: "Rise in vaccination coverage among children"
  },
  {
    title: "Healthcare Access",
    value: "60%",
    description: "Increase in access to basic healthcare services"
  }
];

const ImpactSection = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-gradient-to-b from-healthbridge-light to-white">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
            <span className="text-gradient">{t('our_impact')}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('impact_title')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {impactData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
                >
                  <h3 className="text-healthbridge-blue font-semibold mb-2">{item.title}</h3>
                  <p className="text-3xl font-bold mb-2">{item.value}</p>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1496275068113-fff8c90750d1?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2670&h=2000" 
                alt="Impact in rural communities"
                className="w-full h-auto object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-healthbridge-dark/70 via-transparent to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-semibold mb-4">Our Commitment to Sustainable Impact</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3 text-white">
                    <CheckCircle className="w-5 h-5 text-healthbridge-teal" />
                    <span>Sustainable community health initiatives</span>
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <CheckCircle className="w-5 h-5 text-healthbridge-teal" />
                    <span>Training local healthcare workers</span>
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <CheckCircle className="w-5 h-5 text-healthbridge-teal" />
                    <span>Building lasting healthcare infrastructure</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
