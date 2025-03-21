
import { Shield, Clock, ThumbsUp, Award } from "lucide-react";

export const WhyChooseUs = () => {
  const features = [
    {
      icon: <Clock className="h-10 w-10 mb-4 text-qmf-purple" />,
      title: "Quick Approval",
      description: "Get pre-approved in as little as 15 minutes with our streamlined application process."
    },
    {
      icon: <Shield className="h-10 w-10 mb-4 text-qmf-purple" />,
      title: "Flexible Options",
      description: "We offer tailored finance solutions regardless of your credit history."
    },
    {
      icon: <ThumbsUp className="h-10 w-10 mb-4 text-qmf-purple" />,
      title: "No Obligation",
      description: "Soft credit checks that won't impact your credit score, so you can explore your options with confidence."
    },
    {
      icon: <Award className="h-10 w-10 mb-4 text-qmf-purple" />,
      title: "Expert Support",
      description: "Our knowledgeable team provides personalized guidance throughout your car finance journey."
    }
  ];

  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Quick Motor Finance?</h2>
        <p className="text-qmf-medium-gray text-lg max-w-3xl mx-auto">
          We're committed to making car finance simple, transparent, and accessible for everyone.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-center">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-qmf-medium-gray">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-qmf-purple text-white rounded-lg p-8 md:p-12">
        <div className="md:flex items-center justify-between">
          <div className="mb-6 md:mb-0 md:max-w-lg">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to drive your dream car?</h3>
            <p className="text-white/80">
              Apply now and get a decision in minutes. Our simple process makes car finance easy.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 bg-white text-qmf-purple font-semibold rounded-md hover:bg-gray-100 transition-colors">
              Apply Now
            </button>
            <button className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-md hover:bg-white/10 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
