
import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Color palette for the avatar circles
const colors = [
  "bg-[#9b87f5]",
  "bg-[#7E69AB]", 
  "bg-[#0EA5E9]",
  "bg-[#F97316]",
  "bg-[#D946EF]",
];

const reviews = [
  {
    id: 1,
    name: "Simon Dudley",
    review: "Outstanding service from start to finish, didnt think I had a cat in hells chance of getting finance but these guys got me sorted in no time",
    rating: 5,
    date: "15 March 2023",
  },
  {
    id: 2,
    name: "Clare James",
    review: "Many thanks for sorting out my car finance and the same day drive away was perfect!",
    rating: 5,
    date: "2 February 2023",
  },
  {
    id: 3,
    name: "Leanne Carter",
    review: "Hi Matt, Well what can I say?.......I TOTALLY LOVE MY CAR!!!!!!, Thank you so much!!, Leanne",
    rating: 5,
    date: "27 April 2023",
  },
  {
    id: 4,
    name: "Nicky Simpson",
    review: "Just got my first car from The Car Finance Hub, sorted me out with a cracking deal thank you for the smooth journey",
    rating: 5,
    date: "10 May 2023",
  },
  {
    id: 5,
    name: "Jacky Ellis",
    review: "Despite been on benefits the car finance hub was able to secure funding for me to purchase a 2014 plate vauxhall cross enabling me get to my 2 boys to school on time",
    rating: 5,
    date: "3 June 2023",
  },
];

// Helper function to get initials from name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

export const CustomerReviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleReviews, setVisibleReviews] = useState(3);
  
  // Determine visible reviews based on screen width
  useEffect(() => {
    const updateVisibleReviews = () => {
      if (window.innerWidth < 640) {
        setVisibleReviews(1);
      } else if (window.innerWidth < 1024) {
        setVisibleReviews(2);
      } else {
        setVisibleReviews(3);
      }
    };
    
    updateVisibleReviews();
    window.addEventListener("resize", updateVisibleReviews);
    return () => window.removeEventListener("resize", updateVisibleReviews);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % (reviews.length - visibleReviews + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + (reviews.length - visibleReviews + 1)) % (reviews.length - visibleReviews + 1));
  };

  // Auto rotation
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);

  // Generate star ratings
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star 
          key={i} 
          className={`h-4 w-4 ${i < rating ? "text-qmf-yellow fill-qmf-yellow" : "text-gray-300"}`} 
        />
      ));
  };

  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
        <p className="text-qmf-medium-gray text-lg max-w-3xl mx-auto">
          Don't just take our word for it – hear from our satisfied customers who found their perfect car finance solution.
        </p>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * (100 / visibleReviews)}%)` }}
          >
            {reviews.map((review, index) => (
              <div 
                key={review.id} 
                className={`w-full px-3 md:px-4`}
                style={{ flex: `0 0 ${100 / visibleReviews}%` }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${colors[index % colors.length]}`}>
                        {getInitials(review.name)}
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold">{review.name}</h4>
                        <div className="flex mt-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <Quote className="ml-auto text-qmf-purple/20 h-8 w-8" />
                    </div>
                    <p className="text-qmf-medium-gray mb-4">"{review.review}"</p>
                    <div className="text-sm text-qmf-medium-gray/70">{review.date}</div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <button 
          className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 focus:outline-none"
          onClick={prevSlide}
          aria-label="Previous review"
        >
          <ChevronLeft className="h-6 w-6 text-qmf-dark-gray" />
        </button>
        <button 
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 focus:outline-none"
          onClick={nextSlide}
          aria-label="Next review"
        >
          <ChevronRight className="h-6 w-6 text-qmf-dark-gray" />
        </button>
      </div>

      {/* Dots for navigation */}
      <div className="flex justify-center mt-8">
        {Array(reviews.length - visibleReviews + 1)
          .fill(0)
          .map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 mx-1 rounded-full focus:outline-none transition-colors ${
                i === currentSlide ? "bg-qmf-purple" : "bg-gray-300"
              }`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
      </div>

      {/* Trust indicators */}
      <div className="mt-16 text-center">
        <p className="text-qmf-medium-gray mb-6">Trusted by thousands of customers across the UK</p>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <div className="flex items-center">
            <div className="flex">
              {renderStars(5)}
            </div>
            <span className="ml-2 font-semibold">4.8/5</span>
          </div>
          <div className="text-qmf-medium-gray">Over 2,000+ happy customers</div>
          <div className="text-qmf-medium-gray">FCA Regulated</div>
        </div>
      </div>
    </div>
  );
};
