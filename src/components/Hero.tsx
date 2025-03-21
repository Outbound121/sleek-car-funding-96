
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const benefits = [
    "Quick approval process",
    "Competitive interest rates",
    "Flexible repayment options"
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-qmf-secondary pt-24">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-qmf-dark/60 to-qmf-dark/20"></div>
        <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80')] bg-cover bg-center"></div>
      </div>
      
      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="max-w-3xl">
          <div 
            className={`transition-all duration-700 delay-100 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="inline-block bg-qmf-accent text-qmf-dark font-medium px-4 py-1 rounded-full text-sm mb-4">
              Car Finance Made Simple
            </span>
          </div>
          
          <h1 
            className={`text-white font-bold mb-6 transition-all duration-700 delay-200 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Drive Away Your Dream Car <br className="hidden md:inline" />
            With <span className="text-qmf-accent">Easy Financing</span>
          </h1>
          
          <p 
            className={`text-white/90 text-lg mb-8 max-w-xl transition-all duration-700 delay-300 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Get approved today with our simple application process. We offer competitive rates and flexible terms to suit your budget.
          </p>
          
          <div 
            className={`flex flex-wrap gap-3 mb-8 transition-all duration-700 delay-400 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"
              >
                <Check className="h-4 w-4 text-qmf-accent mr-2" />
                <span className="text-white text-sm">{benefit}</span>
              </div>
            ))}
          </div>
          
          <div 
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-500 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Button size="lg" className="bg-qmf-accent hover:bg-qmf-accent/90 text-qmf-dark font-medium">
              Apply Now 
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Calculate Repayments
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
