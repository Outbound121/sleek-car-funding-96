
import { Button } from "@/components/ui/button";
import { ChevronLeft, ClipboardCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ApplicationReviewProps {
  formData: {
    loan: {
      amount: number;
      term: number;
      deposit: number;
    };
    personal: {
      title: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address: string;
      postcode: string;
      dateOfBirth: string;
    };
    employment: {
      status: string;
      employer: string;
      jobTitle: string;
      income: string;
      employmentYears: string;
    };
  };
  onSubmit: () => void;
  onPrev: () => void;
}

export const ApplicationReview = ({ formData, onSubmit, onPrev }: ApplicationReviewProps) => {
  // Calculate monthly payment (simplified)
  const calculateMonthlyPayment = () => {
    const principal = formData.loan.amount - formData.loan.deposit;
    const apr = 9.9;
    const monthlyRate = apr / 100 / 12;
    const termMonths = formData.loan.term;
    
    const payment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));
    return payment.toFixed(2);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-qmf-purple/10 rounded-full mb-4">
          <ClipboardCheck className="h-8 w-8 text-qmf-purple" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Review Your Application</h2>
        <p className="text-qmf-medium-gray">Please check your information before submitting</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-qmf-purple/5 border-b">
            <CardTitle className="text-lg">Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-y-3">
              <span className="text-qmf-medium-gray">Loan Amount:</span>
              <span className="font-medium">£{formData.loan.amount.toLocaleString()}</span>
              
              <span className="text-qmf-medium-gray">Deposit:</span>
              <span className="font-medium">£{formData.loan.deposit.toLocaleString()}</span>
              
              <span className="text-qmf-medium-gray">Term:</span>
              <span className="font-medium">{formData.loan.term} months</span>
              
              <span className="text-qmf-medium-gray">Monthly Payment:</span>
              <span className="font-medium text-qmf-purple">£{calculateMonthlyPayment()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-qmf-purple/5 border-b">
            <CardTitle className="text-lg">Personal Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-y-3">
              <span className="text-qmf-medium-gray">Full Name:</span>
              <span className="font-medium">
                {formData.personal.title && formData.personal.title.toUpperCase()}
                {" "}
                {formData.personal.firstName} {formData.personal.lastName}
              </span>
              
              <span className="text-qmf-medium-gray">Email:</span>
              <span className="font-medium">{formData.personal.email}</span>
              
              <span className="text-qmf-medium-gray">Phone:</span>
              <span className="font-medium">{formData.personal.phone}</span>
              
              <span className="text-qmf-medium-gray">Address:</span>
              <span className="font-medium">{formData.personal.address}</span>
              
              <span className="text-qmf-medium-gray">Postcode:</span>
              <span className="font-medium">{formData.personal.postcode}</span>
              
              <span className="text-qmf-medium-gray">Date of Birth:</span>
              <span className="font-medium">
                {formData.personal.dateOfBirth && new Date(formData.personal.dateOfBirth).toLocaleDateString('en-GB')}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-qmf-purple/5 border-b">
            <CardTitle className="text-lg">Employment Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-y-3">
              <span className="text-qmf-medium-gray">Employment Status:</span>
              <span className="font-medium capitalize">{formData.employment.status}</span>
              
              {(formData.employment.status === "employed" || formData.employment.status === "self-employed") && (
                <>
                  <span className="text-qmf-medium-gray">
                    {formData.employment.status === "self-employed" ? "Business Name:" : "Employer:"}
                  </span>
                  <span className="font-medium">{formData.employment.employer}</span>
                  
                  <span className="text-qmf-medium-gray">Job Title:</span>
                  <span className="font-medium">{formData.employment.jobTitle}</span>
                  
                  <span className="text-qmf-medium-gray">Years at Current Employment:</span>
                  <span className="font-medium">{formData.employment.employmentYears}</span>
                </>
              )}
              
              <span className="text-qmf-medium-gray">Annual Income:</span>
              <span className="font-medium">£{Number(formData.employment.income).toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 space-y-4">
        <p className="text-sm text-gray-500 italic text-center">
          By clicking "Submit Application" you agree to our terms and conditions and privacy policy.
          We'll perform a soft credit check which won't affect your credit score.
        </p>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onPrev}
            className="flex items-center"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button 
            onClick={onSubmit} 
            className="bg-qmf-purple hover:bg-qmf-purple/90"
          >
            Submit Application
          </Button>
        </div>
      </div>
    </div>
  );
};
