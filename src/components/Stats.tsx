
import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from "@/context/LanguageContext";

type StatItemProps = {
  value: number;
  label: string;
  suffix: string;
  duration: number;
  delay: number;
  color: string;
};

const StatItem = ({ value, label, suffix, duration, delay, color }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * value));
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
      controls.start({ opacity: 1, y: 0 });
    }
  }, [inView, value, duration, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center"
    >
      <div className="text-4xl md:text-5xl font-bold mb-2">
        <span className={color}>{count}</span>
        <span className={color}>{suffix}</span>
      </div>
      <p className="text-gray-600 text-center">{label}</p>
    </motion.div>
  );
};

const Stats = () => {
  const { t } = useLanguage();

  const stats = [
    { 
      value: 35, 
      suffix: 'k+', 
      label: t('happy_patients'), 
      duration: 2.5, 
      delay: 0,
      color: 'text-healthbridge-blue'
    },
    { 
      value: 500, 
      suffix: '+', 
      label: t('medical_experts'), 
      duration: 2, 
      delay: 0.2,
      color: 'text-healthbridge-teal'
    },
    { 
      value: 120, 
      suffix: '+', 
      label: t('hospitals'), 
      duration: 1.5, 
      delay: 0.4,
      color: 'text-healthbridge-orange'
    },
    { 
      value: 1000, 
      suffix: '+', 
      label: t('villages_covered'), 
      duration: 3, 
      delay: 0.6,
      color: 'text-healthbridge-gold'
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-healthbridge-blue to-healthbridge-teal rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat, index) => (
              <StatItem key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
