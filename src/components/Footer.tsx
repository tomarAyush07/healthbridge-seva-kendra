import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import { 
  Facebook, Twitter, Instagram, Mail, MapPin, Phone, Heart, 
  ChevronRight, Globe, Star, Sparkles, Shield, Youtube, 
  Linkedin, Download, FileText, Users, Headphones, Clock,
  Award, BookOpen, Calendar, MessageCircle, Stethoscope,
  Hospital, Syringe, Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "from-blue-600 to-blue-800" },
    { icon: Twitter, href: "#", label: "Twitter", color: "from-blue-400 to-blue-600" },
    { icon: Instagram, href: "#", label: "Instagram", color: "from-blue-500 to-indigo-600" },
    { icon: Youtube, href: "#", label: "Youtube", color: "from-red-500 to-red-700" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "from-blue-500 to-blue-700" },
  ];

  const quickLinks = [
    { label: t('home'), href: "/" },
    { label: t('about'), href: "/about" },
    { label: t('schemes'), href: "/schemes" },
    { label: t('blog'), href: "/blog" },
    { label: t('contact'), href: "/contact" },
  ];

  const resourceLinks = [
    { label: t('faqs'), href: "/faqs", icon: MessageCircle },
    { label: t('privacy_policy'), href: "/privacy", icon: Shield },
    { label: t('terms_of_service'), href: "/terms", icon: FileText },
    { label: t('careers'), href: "/careers", icon: Users },
    { label: t('support'), href: "/support", icon: Headphones },
  ];

  const healthServices = [
    { label: "Telemedicine", href: "/services/telemedicine", icon: Stethoscope },
    { label: "Health Camps", href: "/services/camps", icon: Hospital },
    { label: "Emergency Care", href: "/services/emergency", icon: Syringe },
    { label: "Health Monitoring", href: "/services/monitoring", icon: Activity },
  ];

  const downloadLinks = [
    { label: "Annual Report 2023", href: "/downloads/annual-report-2023.pdf", icon: Download },
    { label: "Healthcare Guide", href: "/downloads/healthcare-guide.pdf", icon: BookOpen },
    { label: "Patient Resources", href: "/downloads/patient-resources.pdf", icon: FileText },
  ];

  const achievements = [
    { number: "50,000+", label: "Patients Served", icon: Users },
    { number: "24/7", label: "Support Available", icon: Clock },
    { number: "100+", label: "Healthcare Partners", icon: Award },
    { number: "500+", label: "Health Camps", icon: Calendar },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900 isolate">
      {/* Rich Background Effect */}
      <div className="absolute inset-0 -z-10">
        {/* Enhanced Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-blue-900/95 to-indigo-900/90" />
        
        {/* Professional Mirror Surface */}
        <div className="absolute inset-0 backdrop-blur-[150px] bg-gradient-to-br from-gray-800/10 via-blue-800/10 to-indigo-800/10" 
             style={{ 
               backdropFilter: 'blur(150px) brightness(1.1)',
               WebkitBackdropFilter: 'blur(150px) brightness(1.1)'
             }} 
        />
        
        {/* Elegant Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
        
        {/* Optimized Gradient Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${70 + i * 20}%`,
                height: `${70 + i * 20}%`,
                background: `linear-gradient(${45 + i * 60}deg, 
                  rgba(17, 24, 39, ${0.02 + i * 0.005}) 0%, 
                  rgba(30, 58, 138, ${0.02 + i * 0.005}) 50%, 
                  rgba(49, 46, 129, ${0.02 + i * 0.005}) 100%)`,
                top: `${(i * 30) % 100}%`,
                left: `${(i * 35) % 100}%`,
                transform: `rotate(${i * 60}deg)`,
                filter: 'blur(20px)',
              }}
              animate={{
                scale: [1, 1.03, 1],
                opacity: [0.3, 0.5, 0.3],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 35 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 1,
              }}
            />
          ))}
        </div>

        {/* Rich Accent Points */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`glow-${i}`}
            className="absolute pointer-events-none"
            style={{
              width: '300px',
              height: '300px',
              background: `radial-gradient(circle, 
                rgba(59, 130, 246, ${0.15 - i * 0.02}) 0%, 
                rgba(37, 99, 235, ${0.12 - i * 0.02}) 50%, 
                transparent 70%)`,
              top: `${15 + i * 25}%`,
              left: `${10 + i * 25}%`,
              filter: 'blur(80px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 20, 0],
              y: [0, 15, 0],
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Enhanced Reflection Lines */}
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={`line-${i}`}
              className="absolute h-px w-full"
              style={{
                top: `${i * 12}%`,
                background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)',
                transform: `translateY(${Math.sin(i) * 10}px) rotate(${i * 0.3}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Professional Content Container */}
      <div className="container relative z-10 px-6 py-24">
        {/* Achievement Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-2xl bg-blue-900/20 rounded-xl p-6 border border-blue-300/20 text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <achievement.icon className="w-8 h-8 text-blue-300 mx-auto mb-4" />
              <h4 className="text-3xl font-bold text-blue-100 mb-2">{achievement.number}</h4>
              <p className="text-blue-300">{achievement.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="relative rounded-3xl overflow-hidden backdrop-blur-2xl bg-blue-950/10 p-12 shadow-2xl border border-blue-300/20"
             style={{ 
               backdropFilter: 'blur(25px) brightness(1.2)',
               WebkitBackdropFilter: 'blur(25px) brightness(1.2)',
               background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05))'
             }}>
          {/* Elegant Glassmorphism */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-blue-500/5 to-transparent pointer-events-none" />
          
          {/* Content Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-20">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12 lg:col-span-4"
            >
              <Link to="/" className="group inline-flex items-center gap-6">
                <div className="relative flex-shrink-0">
                  <motion.div
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Globe className="w-12 h-12 group-hover:rotate-12 transition-transform duration-500" />
                  </motion.div>
                </div>
                <div className="space-y-2">
                  <span className="text-4xl font-display font-bold bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 bg-clip-text text-transparent">
                    HealthBridge
                  </span>
                  <div className="flex items-center gap-3 text-sm text-blue-300">
                    <Shield className="w-4 h-4 text-blue-400" />
                    <span className="font-medium">Healthcare Innovation</span>
                    <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                  </div>
                </div>
              </Link>

              {/* Description */}
              <p className="text-blue-100 leading-relaxed backdrop-blur-2xl bg-blue-900/20 rounded-xl p-8 shadow-xl border border-blue-300/20 text-base">
                {t('footer_description')}
              </p>
            </motion.div>

            {/* Right Side Sections */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8 backdrop-blur-2xl bg-blue-900/20 rounded-xl p-8 shadow-xl border border-blue-300/20 h-fit"
              >
                <h3 className="text-2xl font-display font-semibold bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent pb-2">
                  {t('quick_links')}
                </h3>
                <ul className="space-y-4 mt-4">
                  {quickLinks.map((link, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <Link
                        to={link.href}
                        className="group flex items-center gap-3 text-blue-200 hover:text-blue-100 transition-colors duration-300"
                      >
                        <ChevronRight className="w-4 h-4 transition-colors duration-300" />
                        <span>{link.label}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Health Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-8 backdrop-blur-2xl bg-blue-900/20 rounded-xl p-8 shadow-xl border border-blue-300/20 h-fit"
              >
                <h3 className="text-2xl font-display font-semibold bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent pb-2">
                  Our Services
                </h3>
                <ul className="space-y-4 mt-4">
                  {healthServices.map((service, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <Link
                        to={service.href}
                        className="group flex items-center gap-3 text-blue-200 hover:text-blue-100 transition-colors duration-300"
                      >
                        <service.icon className="w-5 h-5 text-blue-400" />
                        <span>{service.label}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Resources with Icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-8 backdrop-blur-2xl bg-blue-900/20 rounded-xl p-8 shadow-xl border border-blue-300/20 h-fit"
              >
                <h3 className="text-2xl font-display font-semibold bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent pb-2">
                  Resources
                </h3>
                <ul className="space-y-4 mt-4">
                  {resourceLinks.map((link, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <Link
                        to={link.href}
                        className="group flex items-center gap-3 text-blue-200 hover:text-blue-100 transition-colors duration-300"
                      >
                        <link.icon className="w-5 h-5 text-blue-400" />
                        <span>{link.label}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Downloads Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="space-y-8 backdrop-blur-2xl bg-blue-900/20 rounded-xl p-8 shadow-xl border border-blue-300/20 h-fit"
              >
                <h3 className="text-2xl font-display font-semibold bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent pb-2">
                  Downloads
                </h3>
                <ul className="space-y-4 mt-4">
                  {downloadLinks.map((link, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <a
                        href={link.href}
                        className="group flex items-center gap-3 text-blue-200 hover:text-blue-100 transition-colors duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <link.icon className="w-5 h-5 text-blue-400" />
                        <span>{link.label}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Contact and Social Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative mt-20 pt-12 border-t border-blue-300/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-6">
                <h3 className="text-2xl font-display font-semibold bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
                  Contact Us
                </h3>
                <ul className="space-y-4">
                  <motion.li
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="flex items-start gap-4"
                  >
                    <MapPin className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <span className="text-blue-200 leading-relaxed">{t('footer_address')}</span>
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="flex items-center gap-4"
                  >
                    <Phone className="w-6 h-6 text-blue-400 flex-shrink-0" />
                    <a href="tel:+911234567890" className="text-blue-200 hover:text-blue-100 transition-colors duration-300">
                      +91 123 456 7890
                    </a>
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="flex items-center gap-4"
                  >
                    <Mail className="w-6 h-6 text-blue-400 flex-shrink-0" />
                    <a href="mailto:info@healthbridge.com" className="text-blue-200 hover:text-blue-100 transition-colors duration-300">
                      info@healthbridge.com
                    </a>
                  </motion.li>
                </ul>
              </div>

              {/* Social Links Grid */}
              <div className="space-y-6">
                <h3 className="text-2xl font-display font-semibold bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
                  Connect With Us
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group"
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <div className={cn(
                        "p-4 rounded-xl bg-gradient-to-br shadow-xl backdrop-blur-2xl border border-blue-300/20 transition-transform duration-300",
                        social.color
                      )}>
                        <social.icon className="w-6 h-6 text-white" />
                      </div>
                      <motion.div
                        className={cn(
                          "absolute -inset-2 rounded-xl blur-2xl -z-10 transition-opacity duration-300",
                          `bg-gradient-to-br ${social.color}`
                        )}
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.5 }}
                      />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="relative mt-20 pt-12"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent" />
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 backdrop-blur-2xl bg-blue-900/20 rounded-xl p-8 border border-blue-300/20">
              <p className="text-blue-200 text-base flex items-center gap-3">
                © {currentYear} HealthBridge. {t('rights_reserved')}
                <motion.span
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Heart className="w-5 h-5 text-blue-400 inline" />
                </motion.span>
              </p>
              <div className="flex items-center gap-10 text-base">
                {['privacy', 'terms', 'cookies'].map((item, index) => (
                  <Link
                    key={index}
                    to={`/${item}`}
                    className="relative group text-blue-200 hover:text-blue-100 transition-colors duration-300"
                  >
                    {t(item)}
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-300 group-hover:w-full transition-all duration-300" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <div className="h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
        <div className="h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent mt-0.5" />
      </div>
    </footer>
  );
};

export default Footer;
