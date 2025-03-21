
import { Calendar, Car, CreditCard, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const FinanceHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById('iframe-container');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu if it's open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`w-full ${isScrolled ? "bg-white shadow-md py-1" : "bg-transparent py-2"} transition-all duration-300 z-50`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center py-0">
              <img 
                src="/lovable-uploads/fe31f1c8-6180-4be4-9dc5-1fac869f15ec.png" 
                alt="Quick Motor Finance" 
                className="h-20 md:h-24" 
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-qmf-dark-gray hover:text-qmf-purple transition-colors">Home</a>
            <a href="#" className="text-qmf-dark-gray hover:text-qmf-purple transition-colors">About Us</a>
            <a href="#" className="text-qmf-dark-gray hover:text-qmf-purple transition-colors">Vehicles</a>
            <a href="#" className="text-qmf-dark-gray hover:text-qmf-purple transition-colors">Contact</a>
          </nav>

          {/* Contact Info */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-qmf-purple" />
              <span className="text-qmf-dark-gray font-medium">0800 123 4567</span>
            </div>
            <Button variant="default" className="bg-qmf-purple hover:bg-qmf-purple/90" onClick={scrollToForm}>Apply Now</Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-qmf-dark-gray"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 p-4 border-t border-gray-100 z-50">
          <nav className="flex flex-col space-y-4">
            <a href="#" className="text-qmf-dark-gray hover:text-qmf-purple transition-colors py-2">Home</a>
            <a href="#" className="text-qmf-dark-gray hover:text-qmf-purple transition-colors py-2">About Us</a>
            <a href="#" className="text-qmf-dark-gray hover:text-qmf-purple transition-colors py-2">Vehicles</a>
            <a href="#" className="text-qmf-dark-gray hover:text-qmf-purple transition-colors py-2">Contact</a>
            <div className="flex items-center space-x-2 py-2">
              <Phone className="h-5 w-5 text-qmf-purple" />
              <span className="text-qmf-dark-gray font-medium">0800 123 4567</span>
            </div>
            <Button variant="default" className="bg-qmf-purple hover:bg-qmf-purple/90 w-full" onClick={scrollToForm}>Apply Now</Button>
          </nav>
        </div>
      )}

      {/* Hero Banner */}
      <div className="pt-10 pb-20 bg-gradient-to-r from-qmf-purple to-purple-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Drive Your Dream Car Today
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Quick and easy car finance with competitive rates. 
              Get approved in minutes, not days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-qmf-yellow hover:bg-qmf-yellow/90 text-qmf-dark-gray font-semibold" onClick={scrollToForm}>
                Apply Now <CreditCard className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
