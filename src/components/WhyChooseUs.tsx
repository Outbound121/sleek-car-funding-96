
import { Shield, Clock, ThumbsUp, Award } from "lucide-react";

export const WhyChooseUs = () => {
  const features = [{
    icon: <Clock className="h-10 w-10 mb-4 text-qmf-purple" />,
    title: "Quick Decision",
    description: "Apply now and get a decision in minutes! You could be approved today!"
  }, {
    icon: <Shield className="h-10 w-10 mb-4 text-qmf-purple" />,
    title: "Flexible Options",
    description: "Good or bad credit - we could help!"
  }, {
    icon: <ThumbsUp className="h-10 w-10 mb-4 text-qmf-purple" />,
    title: "No Obligation",
    description: "Initial soft credit checks that won't impact your credit score, so you can check eligibility with confidence."
  }, {
    icon: <Award className="h-10 w-10 mb-4 text-qmf-purple" />,
    title: "Expert Support",
    description: "Our team are car shopping experts and we've helped 1000s of people drive their next car."
  }];
  
  const scrollToForm = () => {
    const formElement = document.getElementById('iframe-container');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Quick Motor Finance?</h2>
        <p className="text-qmf-medium-gray text-lg max-w-3xl mx-auto">We're committed to providing a personal car shopping experience to all customers!</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-center">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-qmf-medium-gray">{feature.description}</p>
          </div>)}
      </div>

      <div className="mt-16 bg-qmf-purple text-white rounded-lg p-8 md:p-12">
        <div className="md:flex items-center justify-between">
          <div className="mb-6 md:mb-0 md:max-w-lg">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to drive your dream car?</h3>
            <p className="text-white/80">
              Apply now and get a decision in minutes. Our simple process makes car finance easy.
            </p>
          </div>
          <div>
            <button 
              className="px-6 py-3 bg-white text-qmf-purple font-semibold rounded-md hover:bg-gray-100 transition-colors w-full"
              onClick={scrollToForm}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>;
};
