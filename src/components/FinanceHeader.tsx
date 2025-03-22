
import { Calendar, Car, CreditCard, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const FinanceHeader = () => {
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
  };

  return (
    <header className={`w-full ${isScrolled ? "bg-white shadow-md py-1" : "bg-transparent py-2"} transition-all duration-300 z-50`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/finance" className="flex items-center py-0">
              <img 
                src="/lovable-uploads/fe31f1c8-6180-4be4-9dc5-1fac869f15ec.png" 
                alt="Quick Motor Finance" 
                className="h-24 md:h-24" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/finance" className="text-qmf-dark-gray hover:text-qmf-purple transition-colors">Home</Link>
            <span className="text-qmf-dark-gray cursor-default">About Us</span>
            <span className="text-qmf-dark-gray cursor-default">Vehicles</span>
            <span className="text-qmf-dark-gray cursor-default">Finance</span>
            <span className="text-qmf-dark-gray cursor-default">Contact</span>
          </nav>

          {/* Contact Info - Visible on all screen sizes */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-2">
              <Phone className="h-5 w-5 text-qmf-purple" />
              <span className="text-qmf-dark-gray font-medium">0113 2631214</span>
            </div>
            <Button variant="default" className="bg-qmf-purple hover:bg-qmf-purple/90" onClick={scrollToForm}>Apply Now</Button>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="pt-10 pb-20 bg-gradient-to-r from-qmf-purple to-purple-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Affordable & Quick Motor Finance.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Need a new car now? Get a finance decision in minutes with our FREE finance check 👇
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
