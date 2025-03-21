
import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    id: 1,
    name: "Emma Wilson",
    review: "Quick Motor Finance made the entire process so simple. I was approved within hours and driving my new car the next day. Their staff were friendly and professional throughout.",
    rating: 5,
    date: "15 March 2023",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 2,
    name: "Michael Johnson",
    review: "I was worried about getting car finance with my credit history, but Quick Motor Finance found me a great deal with an affordable monthly payment. Couldn't be happier!",
    rating: 5,
    date: "2 February 2023",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Sarah Thompson",
    review: "The whole experience was straightforward and transparent. No hidden fees or surprises – just great customer service and a competitive rate on my car loan.",
    rating: 4,
    date: "27 April 2023",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
  },
  {
    id: 4,
    name: "David Rodriguez",
    review: "As a first-time car buyer, I appreciated how Quick Motor Finance explained every step of the process. They found me a deal that fit my budget perfectly.",
    rating: 5,
    date: "10 May 2023",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: 5,
    name: "Olivia Chen",
    review: "Quick approval and excellent rates. The online application took minutes to complete, and I was contacted by a friendly advisor who guided me through the rest of the process.",
    rating: 5,
    date: "3 June 2023",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
];

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
            {reviews.map((review) => (
              <div 
                key={review.id} 
                className={`w-full px-3 md:px-4`}
                style={{ flex: `0 0 ${100 / visibleReviews}%` }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src={review.image} 
                          alt={review.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
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
