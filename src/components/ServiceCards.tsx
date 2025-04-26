
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Users, Pill, Activity } from "lucide-react";

const services = [
  {
    id: 'telemedicine',
    icon: <Phone className="h-6 w-6" />,
    color: 'bg-blue-100 text-healthbridge-blue',
    action: 'Connect Now',
  },
  {
    id: 'health_camps',
    icon: <Users className="h-6 w-6" />,
    color: 'bg-green-100 text-green-600',
    action: 'Find Camps',
  },
  {
    id: 'medicine_delivery',
    icon: <Pill className="h-6 w-6" />,
    color: 'bg-orange-100 text-healthbridge-orange',
    action: 'Order Medicine',
  },
  {
    id: 'diagnostics',
    icon: <Activity className="h-6 w-6" />,
    color: 'bg-purple-100 text-purple-600',
    action: 'Book Test',
  }
];

const ServiceCards = () => {
  const { t } = useLanguage();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white to-healthbridge-light">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="text-gradient">{t('our_services')}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive healthcare solutions designed for the unique needs of rural and underserved communities across India.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants} className="card-hover">
              <Card className="border-none shadow-lg h-full">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4`}>
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-display">{t(service.id)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-6 text-gray-600">
                    Accessible healthcare services for everyone, no matter where you live.
                  </CardDescription>
                  <Button variant="outline" size="sm" className="w-full">
                    {service.action}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCards;
