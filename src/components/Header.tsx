
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 bg-white/90 backdrop-blur-sm shadow-sm z-40">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-healthbridge-blue to-healthbridge-teal flex items-center justify-center text-white font-bold">
            HB
          </div>
          <span className="font-display text-xl font-semibold text-healthbridge-dark hidden md:block">
            HealthBridge
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-healthbridge-dark hover:text-healthbridge-blue transition-colors">
            {t('home')}
          </Link>
          <Link to="/schemes" className="text-healthbridge-dark hover:text-healthbridge-blue transition-colors">
            {t('schemes')}
          </Link>
          <Link to="/blog" className="text-healthbridge-dark hover:text-healthbridge-blue transition-colors">
            {t('blog')}
          </Link>
          <Link to="/about" className="text-healthbridge-dark hover:text-healthbridge-blue transition-colors">
            {t('about')}
          </Link>
          <Link to="/contact" className="text-healthbridge-dark hover:text-healthbridge-blue transition-colors">
            {t('contact')}
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSelector />
          <Link to="/login">
            <Button variant="outline" size="sm">
              {t('login')}
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-healthbridge-blue hover:bg-healthbridge-blue/90" size="sm">
              {t('signup')}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSelector />
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col p-4 space-y-3">
            <Link 
              to="/" 
              className="px-4 py-2 hover:bg-gray-100 rounded-md" 
              onClick={() => setIsOpen(false)}
            >
              {t('home')}
            </Link>
            <Link 
              to="/schemes" 
              className="px-4 py-2 hover:bg-gray-100 rounded-md" 
              onClick={() => setIsOpen(false)}
            >
              {t('schemes')}
            </Link>
            <Link 
              to="/blog" 
              className="px-4 py-2 hover:bg-gray-100 rounded-md" 
              onClick={() => setIsOpen(false)}
            >
              {t('blog')}
            </Link>
            <Link 
              to="/about" 
              className="px-4 py-2 hover:bg-gray-100 rounded-md" 
              onClick={() => setIsOpen(false)}
            >
              {t('about')}
            </Link>
            <Link 
              to="/contact" 
              className="px-4 py-2 hover:bg-gray-100 rounded-md" 
              onClick={() => setIsOpen(false)}
            >
              {t('contact')}
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t">
              <Link 
                to="/login" 
                className="w-full" 
                onClick={() => setIsOpen(false)}
              >
                <Button variant="outline" className="w-full">
                  {t('login')}
                </Button>
              </Link>
              <Link 
                to="/signup" 
                className="w-full" 
                onClick={() => setIsOpen(false)}
              >
                <Button className="w-full bg-healthbridge-blue hover:bg-healthbridge-blue/90">
                  {t('signup')}
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
