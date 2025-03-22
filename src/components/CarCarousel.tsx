import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Car, Fuel, Calendar, CreditCard } from "lucide-react";

// Car data
const cars = [
  {
    id: 1,
    title: "2020 BMW 3 Series",
    price: 22995,
    mileage: 25000,
    fuelType: "Diesel",
    year: 2020,
    monthlyPayment: 349,
  },
  {
    id: 2,
    title: "2021 Audi A4",
    price: 25495,
    mileage: 20000,
    fuelType: "Petrol",
    year: 2021,
    monthlyPayment: 389,
  },
  {
    id: 3,
    title: "2022 Mercedes C-Class",
    price: 28995,
    mileage: 15000,
    fuelType: "Hybrid",
    year: 2022,
    monthlyPayment: 429,
  },
  {
    id: 4,
    title: "2019 Volkswagen Golf",
    price: 18995,
    mileage: 32000,
    fuelType: "Petrol",
    year: 2019,
    monthlyPayment: 289,
  },
  {
    id: 5,
    title: "2021 Tesla Model 3",
    price: 34995,
    mileage: 18000,
    fuelType: "Electric",
    year: 2021,
    monthlyPayment: 499,
  }
];

export const CarCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };
    
    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  useEffect(() => {
    if (!autoplayEnabled) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, autoplayEnabled]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cars.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cars.length) % cars.length);
  };

  const getVisibleCars = () => {
    const result = [];
    for (let i = 0; i < visibleItems; i++) {
      const index = (currentIndex + i) % cars.length;
      result.push(cars[index]);
    }
    return result;
  };

  const scrollToForm = () => {
    const iframeContainer = document.getElementById('iframe-container');
    if (iframeContainer) {
      iframeContainer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <div 
        ref={containerRef}
        className="overflow-hidden"
        onMouseEnter={() => setAutoplayEnabled(false)}
        onMouseLeave={() => setAutoplayEnabled(true)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {getVisibleCars().map((car) => (
            <Card key={car.id} className="w-full transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="p-0">
                <div className="relative h-48 rounded-t-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                  <Car className="w-24 h-24 text-gray-400" />
                  <div className="absolute top-0 right-0 bg-qmf-purple text-white px-4 py-2 rounded-bl-lg font-semibold">
                    £{car.monthlyPayment}/mo
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <CardTitle className="mb-4">{car.title}</CardTitle>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-qmf-medium-gray">
                    <Car className="h-4 w-4 mr-2" />
                    <span>{car.mileage.toLocaleString()} miles</span>
                  </div>
                  <div className="flex items-center text-qmf-medium-gray">
                    <Fuel className="h-4 w-4 mr-2" />
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="flex items-center text-qmf-medium-gray">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center font-bold text-qmf-purple">
                    £{car.price.toLocaleString()}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={scrollToForm} variant="outline" className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" /> Apply for Finance
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Button 
        variant="outline" 
        className="absolute top-1/2 -left-4 transform -translate-y-1/2 rounded-full w-10 h-10 p-0 bg-white shadow-md hover:bg-gray-100"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button 
        variant="outline" 
        className="absolute top-1/2 -right-4 transform -translate-y-1/2 rounded-full w-10 h-10 p-0 bg-white shadow-md hover:bg-gray-100"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="text-center mt-12 pb-8">
        <Button 
          className="bg-qmf-purple hover:bg-qmf-purple/90"
          onClick={scrollToForm}
        >
          <CreditCard className="mr-2 h-4 w-4" /> Apply for Finance
        </Button>
      </div>
    </div>
  );
};
