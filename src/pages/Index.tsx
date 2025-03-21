
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { FinanceHeader } from "@/components/FinanceHeader";
import { CarCarousel } from "@/components/CarCarousel";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { CustomerReviews } from "@/components/CustomerReviews";
import { Footer } from "@/components/Footer";

const Index = () => {
  const { toast } = useToast();

  // Add script to the page after component mounts
  useEffect(() => {
    // Create jQuery script
    const jqueryScript = document.createElement('script');
    jqueryScript.src = "https://code.jquery.com/jquery-3.4.1.min.js";
    jqueryScript.integrity = "sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=";
    jqueryScript.crossOrigin = "anonymous";
    
    // Create the autoconvert cookies script
    const acCookiesScript = document.createElement('script');
    acCookiesScript.src = "https://iframe.app.autoconvert.co.uk/js/iframe/ac/ac-cookies.min.js";
    acCookiesScript.type = "text/javascript";
    
    // Create the main script
    const mainScript = document.createElement('script');
    mainScript.type = "text/javascript";
    mainScript.text = `
      var AcTarget = "thecarfinancehub2";
      var AcInjectParentScript = document.createElement('script');
      document.body.appendChild(AcInjectParentScript);
      var acRng = Math.floor(Math.random() * 10000000) + 1;
      AcInjectParentScript.onload = function () {};
      AcInjectParentScript.src = "https://iframe.app.autoconvert.co.uk/js/iframe/"+AcTarget+"/parent-comms.js?ver=" + acRng;
    `;
    
    // Append scripts to document body
    document.body.appendChild(jqueryScript);
    document.body.appendChild(acCookiesScript);
    document.body.appendChild(mainScript);
    
    // Clean up on component unmount
    return () => {
      document.body.removeChild(jqueryScript);
      document.body.removeChild(acCookiesScript);
      document.body.removeChild(mainScript);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-qmf-light-gray">
      <FinanceHeader />

      <main className="flex-1">
        {/* Finance Application Form Section - replaced with iframe container */}
        <section className="container mx-auto py-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8">
            <div id="iframe-container" className="w-full min-h-[600px]"></div>
            
            {/* Compliance Text */}
            <div className="mt-4 text-sm text-gray-700 border-t pt-4 pb-4">
              <p className="font-semibold mb-2">Representative APR 12.6%. Rates may vary depending on individual circumstances. WE ARE A FINANCE BROKER, NOT A LENDER.</p>
              
              <p className="font-semibold mb-1">REPRESENTATIVE EXAMPLE:</p>
              
              <p>
                Borrowing £5,495.00 over 60 months with a representative APR of 12.6%, an annual interest rate of 5.75% (Fixed) 
                and a deposit of £0.00, with the initial payment of £268.06 and final payment of £268.06, and £119.06 per month 
                over 58 months, with a total cost of credit of £1946.00, and a total amount payable of £7,441.50
              </p>
            </div>
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
