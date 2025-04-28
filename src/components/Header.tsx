import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";  // Import useAuth
import { cn } from "@/lib/utils";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();  // Access the AuthContext

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { path: "/", label: 'home' },
    { path: "/schemes", label: 'schemes' },
    { path: "/blog", label: 'blog' },
    { path: "/about", label: 'about' },
    { path: "/contact", label: 'contact' }
  ];

  const isActivePath = (path: string) => {
    if (path === "/" && location.pathname !== "/") {
      return false;
    }
    return location.pathname.startsWith(path);
  };

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
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "relative py-2 text-healthbridge-dark transition-colors group",
                isActivePath(link.path) ? "text-healthbridge-blue" : "hover:text-healthbridge-blue"
              )}
            >
              {t(link.label)}
              <div
                className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-healthbridge-blue to-healthbridge-teal transform origin-left transition-transform duration-300",
                  isActivePath(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSelector />
          {!isAuthenticated ? (
            <>
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
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={logout}>
              Logout
            </Button>
          )}
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
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-md relative overflow-hidden group",
                  isActivePath(link.path) 
                    ? "bg-blue-50 text-healthbridge-blue" 
                    : "hover:bg-gray-50"
                )}
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10">{t(link.label)}</span>
                <div
                  className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-healthbridge-blue to-healthbridge-teal w-full transform origin-left transition-transform duration-300",
                    isActivePath(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="w-full" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      {t('login')}
                    </Button>
                  </Link>
                  <Link to="/signup" className="w-full" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-healthbridge-blue hover:bg-healthbridge-blue/90">
                      {t('signup')}
                    </Button>
                  </Link>
                </>
              ) : (
                <Button variant="outline" className="w-full" onClick={logout}>
                  Logout
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
