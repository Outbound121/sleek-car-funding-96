
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`w-full z-50 transition-all duration-300 px-6 md:px-10 ${
        isScrolled 
          ? 'py-3 bg-white shadow-md' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <span className="text-qmf-primary font-bold text-2xl">Quick</span>
            <span className="text-qmf-dark font-medium text-2xl">Motor</span>
            <span className="ml-1 text-qmf-primary font-bold text-2xl">Finance</span>
          </a>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {['Home', 'About Us', 'Vehicles', 'Finance Options', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-qmf-dark hover:text-qmf-primary transition-colors duration-200 font-medium"
            >
              {item}
            </a>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center">
          <a 
            href="tel:0800123456" 
            className="mr-6 flex items-center text-qmf-primary font-medium hover:text-qmf-dark transition-colors duration-200"
          >
            <Phone className="w-4 h-4 mr-2" />
            0800 123 456
          </a>
          <Button className="bg-qmf-primary hover:bg-qmf-primary/90 text-white">
            Apply Now
          </Button>
        </div>
        
        <button 
          className="md:hidden text-qmf-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg p-5 animate-fade-in z-50">
          <nav className="flex flex-col space-y-4">
            {['Home', 'About Us', 'Vehicles', 'Finance Options', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-qmf-dark hover:text-qmf-primary transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="mt-6 flex flex-col space-y-4">
            <a 
              href="tel:0800123456" 
              className="flex items-center text-qmf-primary font-medium"
            >
              <Phone className="w-4 h-4 mr-2" />
              0800 123 456
            </a>
            <Button className="w-full bg-qmf-primary hover:bg-qmf-primary/90 text-white">
              Apply Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
