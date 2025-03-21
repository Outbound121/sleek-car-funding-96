
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { FinanceHeader } from "@/components/FinanceHeader";
import { FinanceCalculator } from "@/components/FinanceCalculator";
import { PersonalDetails } from "@/components/PersonalDetails";
import { EmploymentDetails } from "@/components/EmploymentDetails";
import { ApplicationReview } from "@/components/ApplicationReview";
import { CarCarousel } from "@/components/CarCarousel";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { CustomerReviews } from "@/components/CustomerReviews";
import { Footer } from "@/components/Footer";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("calculator");
  const [formData, setFormData] = useState({
    loan: {
      amount: 10000,
      term: 48,
      deposit: 1000,
    },
    personal: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      postcode: "",
      dateOfBirth: "",
    },
    employment: {
      status: "",
      employer: "",
      jobTitle: "",
      income: "",
      employmentYears: "",
    }
  });

  const updateFormData = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        ...data
      }
    }));
  };

  const handleNextStep = (currentStep: string, isValid: boolean = true) => {
    if (!isValid) {
      toast({
        title: "Please complete all required fields",
        description: "Make sure all information is filled out correctly.",
        variant: "destructive",
      });
      return;
    }

    const steps = ["calculator", "personal", "employment", "review"];
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentIndex < steps.length - 1) {
      setActiveTab(steps[currentIndex + 1]);
    }
  };

  const handlePrevStep = (currentStep: string) => {
    const steps = ["calculator", "personal", "employment", "review"];
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentIndex > 0) {
      setActiveTab(steps[currentIndex - 1]);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Application Submitted!",
      description: "Thank you for your application. We'll be in touch shortly.",
    });
    
    // In a real app, you would send the data to the server here
    console.log("Submitting application with data:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-qmf-light-gray">
      <FinanceHeader />

      <main className="flex-1">
        {/* Finance Application Form Section */}
        <section className="container mx-auto py-12">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="bg-qmf-purple py-6 px-8">
                <TabsList className="bg-white/20 grid w-full grid-cols-4">
                  <TabsTrigger value="calculator" className="text-white data-[state=active]:bg-white data-[state=active]:text-qmf-purple">
                    1. Loan Details
                  </TabsTrigger>
                  <TabsTrigger value="personal" className="text-white data-[state=active]:bg-white data-[state=active]:text-qmf-purple">
                    2. Personal Details
                  </TabsTrigger>
                  <TabsTrigger value="employment" className="text-white data-[state=active]:bg-white data-[state=active]:text-qmf-purple">
                    3. Employment
                  </TabsTrigger>
                  <TabsTrigger value="review" className="text-white data-[state=active]:bg-white data-[state=active]:text-qmf-purple">
                    4. Review
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-8">
                <TabsContent value="calculator">
                  <FinanceCalculator 
                    formData={formData.loan} 
                    updateFormData={(data) => updateFormData("loan", data)} 
                    onNext={() => handleNextStep("calculator")} 
                  />
                </TabsContent>
                
                <TabsContent value="personal">
                  <PersonalDetails 
                    formData={formData.personal} 
                    updateFormData={(data) => updateFormData("personal", data)} 
                    onNext={() => handleNextStep("personal")} 
                    onPrev={() => handlePrevStep("personal")}
                  />
                </TabsContent>
                
                <TabsContent value="employment">
                  <EmploymentDetails 
                    formData={formData.employment} 
                    updateFormData={(data) => updateFormData("employment", data)} 
                    onNext={() => handleNextStep("employment")} 
                    onPrev={() => handlePrevStep("employment")}
                  />
                </TabsContent>
                
                <TabsContent value="review">
                  <ApplicationReview 
                    formData={formData} 
                    onSubmit={handleSubmit} 
                    onPrev={() => handlePrevStep("review")}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </section>

        {/* Car Carousel Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Vehicles Available for Finance
            </h2>
            <CarCarousel />
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-qmf-light-gray">
          <WhyChooseUs />
        </section>

        {/* Customer Reviews Section */}
        <section className="py-16 bg-white">
          <CustomerReviews />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
