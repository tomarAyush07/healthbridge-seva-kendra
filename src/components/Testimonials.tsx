
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    location: 'Almora, Uttarakhand',
    text: 'HealthBridge has transformed healthcare access in our village. My elderly parents no longer have to travel hours for basic medicine.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 5
  },
  {
    id: 2,
    name: 'Anjali Sharma',
    location: 'Kalahandi, Odisha',
    text: 'The telemedicine service saved my son\'s life. We were able to consult a specialist quickly when he had a severe reaction.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 5
  },
  {
    id: 3,
    name: 'Mohammed Ismail',
    location: 'Baramulla, Kashmir',
    text: 'Their health camp detected my hypertension early. The community health worker regularly follows up and ensures I\'m taking my medication.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4
  },
  {
    id: 4,
    name: 'Lakshmi Devi',
    location: 'Araku Valley, Andhra Pradesh',
    text: 'The regular health checkups for pregnant women in our village have significantly reduced complications. I received excellent care throughout my pregnancy.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 5
  }
];

const Testimonials = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };
  
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="text-gradient">{t('testimonials')}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('what_people_say')}
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden py-12">
            <div className="relative h-[280px] md:h-[220px]">
              {testimonials.map((testimonial, index) => (
                activeIndex === index && (
                  <motion.div
                    key={testimonial.id}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    className="absolute w-full bg-healthbridge-light rounded-2xl p-6 md:p-8"
                  >
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex-shrink-0">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <blockquote className="mb-4 text-gray-700 italic">
                          "{testimonial.text}"
                        </blockquote>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-gray-500">{testimonial.location}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </div>
          </div>
          
          <div className="flex justify-center gap-2 mt-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {testimonials.map((_, index) => (
              <Button 
                key={index} 
                variant="ghost" 
                size="sm" 
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full p-0 min-w-0 ${
                  activeIndex === index 
                    ? 'bg-healthbridge-blue' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
            <Button 
              variant="outline" 
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
