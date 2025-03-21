
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car, Calculator, CreditCard } from "lucide-react";

interface FinanceCalculatorProps {
  formData: {
    amount: number;
    term: number;
    deposit: number;
  };
  updateFormData: (data: any) => void;
  onNext: () => void;
}

export const FinanceCalculator = ({ formData, updateFormData, onNext }: FinanceCalculatorProps) => {
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [apr, setApr] = useState(9.9);
  
  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const principal = formData.amount - formData.deposit;
    const monthlyRate = apr / 100 / 12;
    const termMonths = formData.term;
    
    const payment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));
    setMonthlyPayment(parseFloat(payment.toFixed(2)));
  };

  useEffect(() => {
    calculateMonthlyPayment();
  }, [formData, apr]);

  const handleAmountChange = (value: number[]) => {
    updateFormData({ amount: value[0] });
  };

  const handleTermChange = (value: number[]) => {
    updateFormData({ term: value[0] });
  };

  const handleDepositChange = (value: number[]) => {
    updateFormData({ deposit: value[0] });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="text-center md:text-left mb-6">
          <h2 className="text-2xl font-bold mb-2">Loan Details</h2>
          <p className="text-qmf-medium-gray">Adjust the sliders to see how much you could borrow</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="loan-amount">Loan Amount</Label>
              <span className="font-semibold">£{formData.amount.toLocaleString()}</span>
            </div>
            <Slider 
              id="loan-amount"
              defaultValue={[formData.amount]} 
              max={50000} 
              min={1000} 
              step={100} 
              onValueChange={handleAmountChange}
              className="py-4"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>£1,000</span>
              <span>£50,000</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="loan-term">Loan Term (months)</Label>
              <span className="font-semibold">{formData.term} months</span>
            </div>
            <Slider 
              id="loan-term"
              defaultValue={[formData.term]} 
              max={84} 
              min={12} 
              step={12} 
              onValueChange={handleTermChange}
              className="py-4"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>12 months</span>
              <span>84 months</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="deposit">Deposit</Label>
              <span className="font-semibold">£{formData.deposit.toLocaleString()}</span>
            </div>
            <Slider 
              id="deposit"
              defaultValue={[formData.deposit]} 
              max={formData.amount * 0.5} 
              min={0} 
              step={100} 
              onValueChange={handleDepositChange}
              className="py-4"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>£0</span>
              <span>£{(formData.amount * 0.5).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-qmf-light-gray rounded-lg p-6 flex flex-col">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold mb-1">Your Estimated Payment</h3>
          <p className="text-qmf-medium-gray text-sm">Based on {apr}% APR representative</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm mb-6 flex-grow">
          <div className="flex items-center justify-center mb-6">
            <Calculator className="h-8 w-8 mr-3 text-qmf-purple" />
            <h4 className="text-lg font-medium">Payment Summary</h4>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 py-2 border-b border-gray-100">
              <span className="text-qmf-medium-gray">Loan Amount:</span>
              <span className="font-medium text-right">£{formData.amount.toLocaleString()}</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b border-gray-100">
              <span className="text-qmf-medium-gray">Your Deposit:</span>
              <span className="font-medium text-right">£{formData.deposit.toLocaleString()}</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b border-gray-100">
              <span className="text-qmf-medium-gray">Finance Amount:</span>
              <span className="font-medium text-right">£{(formData.amount - formData.deposit).toLocaleString()}</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b border-gray-100">
              <span className="text-qmf-medium-gray">Term:</span>
              <span className="font-medium text-right">{formData.term} months</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b border-gray-100">
              <span className="text-qmf-medium-gray">Interest Rate:</span>
              <span className="font-medium text-right">{apr}% APR</span>
            </div>
            <div className="grid grid-cols-2 py-2">
              <span className="text-lg font-bold">Monthly Payment:</span>
              <span className="text-lg font-bold text-right text-qmf-purple">£{monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-auto">
          <Button 
            onClick={onNext} 
            className="w-full bg-qmf-purple hover:bg-qmf-purple/90 text-white"
          >
            Continue Application <CreditCard className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-center text-sm text-qmf-medium-gray mt-4">
            <Car className="inline-block mr-1 h-4 w-4" />
            No obligation to proceed and no impact on your credit score
          </p>
        </div>
      </div>
    </div>
  );
};
