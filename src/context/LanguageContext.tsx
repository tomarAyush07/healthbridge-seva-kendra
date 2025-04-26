
import { createContext, useState, useContext, ReactNode } from 'react';

// Language options
type Language = 'en' | 'hi' | 'bn' | 'te' | 'mr' | 'ta' | 'ur' | 'gu' | 'kn' | 'ml';

type LanguageLabels = {
  [key in Language]: string;
};

const languageLabels: LanguageLabels = {
  en: 'English',
  hi: 'हिन्दी (Hindi)',
  bn: 'বাংলা (Bengali)',
  te: 'తెలుగు (Telugu)',
  mr: 'मराठी (Marathi)',
  ta: 'தமிழ் (Tamil)',
  ur: 'اردو (Urdu)',
  gu: 'ગુજરાતી (Gujarati)',
  kn: 'ಕನ್ನಡ (Kannada)',
  ml: 'മലയാളം (Malayalam)',
};

// Translation data structure
type Translations = {
  [key: string]: {
    [lang in Language]?: string;
  };
};

// Initial translations data
const translations: Translations = {
  // Header
  'home': {
    'en': 'Home',
    'hi': 'होम',
  },
  'schemes': {
    'en': 'Schemes',
    'hi': 'योजनाएँ',
  },
  'blog': {
    'en': 'Blog',
    'hi': 'ब्लॉग',
  },
  'about': {
    'en': 'About',
    'hi': 'हमारे बारे में',
  },
  'contact': {
    'en': 'Contact',
    'hi': 'संपर्क',
  },
  'login': {
    'en': 'Login',
    'hi': 'लॉगिन',
  },
  'signup': {
    'en': 'Sign Up',
    'hi': 'साइन अप',
  },
  
  // Hero section
  'hero_title': {
    'en': 'Healthcare for Every Indian',
    'hi': 'हर भारतीय के लिए स्वास्थ्य सेवा',
  },
  'hero_subtitle': {
    'en': 'Bridging the healthcare gap in underserved communities',
    'hi': 'असेवित समुदायों में स्वास्थ्य सेवा अंतर को पाटना',
  },
  'get_started': {
    'en': 'Get Started',
    'hi': 'शुरू करें',
  },
  'learn_more': {
    'en': 'Learn More',
    'hi': 'और जानें',
  },
  
  // Services
  'our_services': {
    'en': 'Our Services',
    'hi': 'हमारी सेवाएं',
  },
  'telemedicine': {
    'en': 'Telemedicine',
    'hi': 'टेलीमेडिसिन',
  },
  'health_camps': {
    'en': 'Health Camps',
    'hi': 'स्वास्थ्य शिविर',
  },
  'medicine_delivery': {
    'en': 'Medicine Delivery',
    'hi': 'दवा वितरण',
  },
  'diagnostics': {
    'en': 'Diagnostics',
    'hi': 'नैदानिकी',
  },
  
  // Stats
  'happy_patients': {
    'en': 'Happy Patients',
    'hi': 'खुश मरीज',
  },
  'medical_experts': {
    'en': 'Medical Experts',
    'hi': 'चिकित्सा विशेषज्ञ',
  },
  'hospitals': {
    'en': 'Hospitals',
    'hi': 'अस्पताल',
  },
  'villages_covered': {
    'en': 'Villages Covered',
    'hi': 'कवर किए गए गाँव',
  },
  
  // Impact
  'our_impact': {
    'en': 'Our Impact',
    'hi': 'हमारा प्रभाव',
  },
  'impact_title': {
    'en': 'Making a Difference in Rural Healthcare',
    'hi': 'ग्रामीण स्वास्थ्य सेवा में बदलाव लाना',
  },
  
  // Testimonials
  'testimonials': {
    'en': 'Testimonials',
    'hi': 'प्रशंसापत्र',
  },
  'what_people_say': {
    'en': 'What People Say',
    'hi': 'लोग क्या कहते हैं',
  },
  
  // Newsletter
  'subscribe': {
    'en': 'Subscribe to our Newsletter',
    'hi': 'हमारे न्यूज़लेटर के लिए सदस्यता लें',
  },
  'email_placeholder': {
    'en': 'Enter your email',
    'hi': 'अपना ईमेल दर्ज करें',
  },
  'subscribe_button': {
    'en': 'Subscribe',
    'hi': 'सदस्यता लें',
  },
  
  // Footer
  'rights_reserved': {
    'en': 'All Rights Reserved',
    'hi': 'सर्वाधिकार सुरक्षित',
  },
  
  // About page translations
  'about_title': {
    'en': 'About HealthBridge',
    'hi': 'हेल्थब्रिज के बारे में',
  },
  'about_mission': {
    'en': 'Our Mission',
    'hi': 'हमारा मिशन',
  },
  'about_description': {
    'en': 'HealthBridge is dedicated to transforming healthcare accessibility in India.',
    'hi': 'हेल्थब्रिज भारत में स्वास्थ्य सेवा की पहुंच को बदलने के लिए समर्पित है।',
  },
  
  // Contact page translations
  'contact_title': {
    'en': 'Get in Touch',
    'hi': 'संपर्क करें',
  },
  'contact_description': {
    'en': "Have questions about our services? We're here to help.",
    'hi': 'हमारी सेवाओं के बारे में सवाल हैं? हम मदद के लिए यहां हैं।',
  },
  'send_message': {
    'en': 'Send Message',
    'hi': 'संदेश भेजें',
  },
  'name_placeholder': {
    'en': 'Your Name',
    'hi': 'आपका नाम'
  },
  'email_contact_placeholder': {
    'en': 'Your Email',
    'hi': 'आपका ईमेल'
  },
  'message_placeholder': {
    'en': 'Your Message',
    'hi': 'आपका संदेश'
  },
  'contact_info': {
    'en': 'Contact Information',
    'hi': 'संपर्क जानकारी'
  },
  'address': {
    'en': 'Address',
    'hi': 'पता'
  },
  'phone': {
    'en': 'Phone',
    'hi': 'फोन'
  },
  'email': {
    'en': 'Email',
    'hi': 'ईमेल'
  }
};

// Types for context
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  getLanguageLabel: (code: Language) => string;
  availableLanguages: Language[];
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || translations[key]['en'] || key;
  };

  const getLanguageLabel = (code: Language): string => {
    return languageLabels[code] || code;
  };

  const availableLanguages: Language[] = ['en', 'hi', 'bn', 'te', 'mr', 'ta', 'ur', 'gu', 'kn', 'ml'];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getLanguageLabel, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
