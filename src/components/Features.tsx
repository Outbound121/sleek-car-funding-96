
import { useEffect, useRef } from 'react';
import { Shield, Clock, ThumbsUp, Coins, HeartHandshake, Lightbulb } from 'lucide-react';

interface FeatureProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

const Feature = ({ icon: Icon, title, description, delay }: FeatureProps) => {
  const featureRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-reveal');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (featureRef.current) {
      observer.observe(featureRef.current);
    }
    
    return () => {
      if (featureRef.current) {
        observer.unobserve(featureRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={featureRef}
      className="opacity-0"
    >
      <div className="flex flex-col items-center text-center p-6">
        <div className="w-16 h-16 rounded-full bg-qmf-primary/10 flex items-center justify-center mb-4 animate-float">
          <Icon className="h-8 w-8 text-qmf-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-qmf-dark">{title}</h3>
        <p className="text-qmf-dark/70">{description}</p>
      </div>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: Clock,
      title: "Quick Decision",
      description: "Apply now and get a decision in minutes! You could be approved today!",
      delay: 100
    },
    {
      icon: Shield,
      title: "Secure Process",
      description: "Your personal and financial information is protected with bank-level security measures at every step.",
      delay: 200
    },
    {
      icon: ThumbsUp,
      title: "No Obligation",
      description: "Get pre-approved with no impact on your credit score and no obligation to proceed with financing.",
      delay: 300
    },
    {
      icon: Coins,
      title: "Competitive Rates",
      description: "Access the best rates from our network of lenders, tailored to your financial situation.",
      delay: 400
    },
    {
      icon: HeartHandshake,
      title: "Personalized Service",
      description: "Our finance experts work with you to find the best solution for your specific circumstances.",
      delay: 500
    },
    {
      icon: Lightbulb,
      title: "Flexible Options",
      description: "Choose from various loan terms and payment plans that suit your budget and financial goals.",
      delay: 600
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-white">
      <div className="container px-6 md:px-10 mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-bold text-qmf-dark mb-4">Why Choose Quick Motor Finance</h2>
          <p className="text-qmf-dark/70 max-w-2xl mx-auto">
            We're committed to making car financing simple, transparent, and tailored to your needs.
            Here's why thousands of customers choose us every year.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
