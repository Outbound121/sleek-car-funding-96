
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  stars: number;
  text: string;
  carFinanced: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Boston, MA",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    stars: 5,
    text: "The application process was incredibly simple. I was approved within hours and driving my new car the next day. The team was professional and helpful throughout.",
    carFinanced: "BMW 3 Series"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "San Francisco, CA",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    stars: 5,
    text: "As a first-time car buyer with limited credit history, I was worried about getting approved. Quick Motor Finance found me a great rate, and the process was smooth from start to finish.",
    carFinanced: "Honda Civic"
  },
  {
    id: 3,
    name: "Jessica Williams",
    location: "Chicago, IL",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    stars: 4,
    text: "I had been rejected by my bank due to some past credit issues, but Quick Motor Finance took the time to understand my situation and found a solution that worked for me.",
    carFinanced: "Tesla Model 3"
  },
  {
    id: 4,
    name: "David Miller",
    location: "Austin, TX",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    stars: 5,
    text: "The rates offered were better than I expected, and the customer service was exceptional. I'll definitely be using Quick Motor Finance for my next vehicle purchase.",
    carFinanced: "Range Rover Sport"
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${index < rating ? 'text-qmf-accent fill-qmf-accent' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <Avatar className="h-12 w-12 mr-4 border-2 border-qmf-primary/20">
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-qmf-dark">{testimonial.name}</p>
              <p className="text-qmf-dark/60 text-sm">{testimonial.location}</p>
            </div>
          </div>
          <StarRating rating={testimonial.stars} />
        </div>
        
        <div className="mb-4 flex-grow">
          <Quote className="h-6 w-6 text-qmf-primary/30 mb-2" />
          <p className="text-qmf-dark/80 italic">{testimonial.text}</p>
        </div>
        
        <div className="pt-4 border-t border-qmf-secondary">
          <p className="text-sm text-qmf-dark/60">
            Car financed: <span className="font-medium text-qmf-primary">{testimonial.carFinanced}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const testimonialPageSize = 2;
  const totalPages = Math.ceil(testimonials.length / testimonialPageSize);
  
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };
  
  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };
  
  const currentTestimonials = testimonials.slice(
    currentPage * testimonialPageSize,
    (currentPage + 1) * testimonialPageSize
  );

  return (
    <section id="testimonials" className="py-20 bg-qmf-secondary">
      <div className="container px-6 md:px-10 mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-bold text-qmf-dark mb-4">What Our Customers Say</h2>
          <p className="text-qmf-dark/70 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what some of our satisfied customers have to say about their experience with Quick Motor Finance.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 border-qmf-primary/20"
              onClick={prevPage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentPage
                      ? 'bg-qmf-primary w-8'
                      : 'bg-qmf-primary/30'
                  }`}
                  onClick={() => setCurrentPage(index)}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 border-qmf-primary/20"
              onClick={nextPage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
