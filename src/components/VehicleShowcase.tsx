
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

interface Vehicle {
  id: number;
  name: string;
  price: number;
  image: string;
  year: number;
  mileage: number;
  transmission: string;
  fuelType: string;
}

const vehicles: Vehicle[] = [
  {
    id: 1,
    name: "Tesla Model 3",
    price: 42990,
    image: "https://images.unsplash.com/photo-1617704548623-340376564e51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    year: 2023,
    mileage: 0,
    transmission: "Automatic",
    fuelType: "Electric"
  },
  {
    id: 2,
    name: "BMW 3 Series",
    price: 46995,
    image: "https://images.unsplash.com/photo-1570356528233-b442cf2de345?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1153&q=80",
    year: 2023,
    mileage: 5000,
    transmission: "Automatic",
    fuelType: "Hybrid"
  },
  {
    id: 3,
    name: "Mercedes-Benz C-Class",
    price: 51995,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    year: 2022,
    mileage: 8000,
    transmission: "Automatic",
    fuelType: "Petrol"
  },
  {
    id: 4,
    name: "Audi A4",
    price: 48995,
    image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    year: 2023,
    mileage: 3000,
    transmission: "Automatic",
    fuelType: "Diesel"
  },
  {
    id: 5,
    name: "Range Rover Sport",
    price: 79995,
    image: "https://images.unsplash.com/photo-1551345768-a8cbc686924f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    year: 2022,
    mileage: 12000,
    transmission: "Automatic",
    fuelType: "Hybrid"
  }
];

const VehicleShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const showNextVehicle = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex + 1) % vehicles.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const showPrevVehicle = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex - 1 + vehicles.length) % vehicles.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const startAutoPlay = () => {
    timerRef.current = setInterval(() => {
      showNextVehicle();
    }, 5000);
  };
  
  const stopAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const calculateMonthlyPayment = (price: number) => {
    const downPayment = price * 0.2;
    const loanAmount = price - downPayment;
    const interestRate = 0.0499 / 12; // 4.99% annual rate converted to monthly
    const numberOfPayments = 60;
    
    const payment = 
      (loanAmount * interestRate * Math.pow(1 + interestRate, numberOfPayments)) /
      (Math.pow(1 + interestRate, numberOfPayments) - 1);
    
    return formatCurrency(payment);
  };
  
  useEffect(() => {
    startAutoPlay();
    
    return () => {
      stopAutoPlay();
    };
  }, []);

  return (
    <section className="py-20 bg-qmf-secondary">
      <div className="container px-6 md:px-10 mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-bold text-qmf-dark mb-4">Featured Vehicles</h2>
          <p className="text-qmf-dark/70 max-w-2xl mx-auto">
            Explore our selection of premium vehicles available for financing. From city cars to luxury SUVs, we have options to suit every lifestyle and budget.
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {vehicles.map((vehicle) => (
                <div 
                  key={vehicle.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <Card className="overflow-hidden border-none shadow-xl bg-white">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 bg-qmf-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        {vehicle.year}
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-qmf-dark">{vehicle.name}</h3>
                          <p className="text-qmf-dark/60 text-sm">{vehicle.transmission} • {vehicle.fuelType} • {vehicle.mileage.toLocaleString()} miles</p>
                        </div>
                        <div className="text-right">
                          <p className="text-qmf-primary font-bold text-2xl">{formatCurrency(vehicle.price)}</p>
                          <p className="text-qmf-dark/60 text-sm">
                            From <span className="font-medium">{calculateMonthlyPayment(vehicle.price)}</span>/mo
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Button
                          variant="outline"
                          className="border-qmf-primary text-qmf-primary hover:bg-qmf-primary hover:text-white"
                        >
                          <Info className="mr-2 h-4 w-4" />
                          Details
                        </Button>
                        
                        <Button className="bg-qmf-accent hover:bg-qmf-accent/90 text-qmf-dark font-medium">
                          Finance This Car
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-0 -translate-y-1/2 transform -translate-x-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full h-10 w-10 border-qmf-primary/20"
            onClick={showPrevVehicle}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-0 -translate-y-1/2 transform translate-x-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full h-10 w-10 border-qmf-primary/20"
            onClick={showNextVehicle}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          
          <div className="flex justify-center mt-6 space-x-2">
            {vehicles.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-qmf-primary w-8' 
                    : 'bg-qmf-primary/30'
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleShowcase;
