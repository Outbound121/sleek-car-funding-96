import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Car, DollarSign, User, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";

const steps = [
  { id: 1, name: 'Vehicle', icon: Car },
  { id: 2, name: 'Finance', icon: DollarSign },
  { id: 3, name: 'Personal', icon: User },
  { id: 4, name: 'Complete', icon: FileText },
];

const FinanceForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    vehicleType: '',
    vehiclePrice: 25000,
    downPayment: 5000,
    loanTerm: '60',
    employmentStatus: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  
  const updateFormData = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application submitted!",
      description: "We've received your application and will contact you shortly.",
    });
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const formatLoanTerm = (months: string) => {
    const years = parseInt(months) / 12;
    return `${years} ${years === 1 ? 'year' : 'years'}`;
  };
  
  const monthlyPayment = () => {
    const principal = formData.vehiclePrice - formData.downPayment;
    const interestRate = 0.0499 / 12; // 4.99% annual rate converted to monthly
    const numberOfPayments = parseInt(formData.loanTerm);
    
    const payment = 
      (principal * interestRate * Math.pow(1 + interestRate, numberOfPayments)) /
      (Math.pow(1 + interestRate, numberOfPayments) - 1);
    
    return formatCurrency(payment);
  };

  return (
    <section id="finance-application" className="py-20 bg-white">
      <div className="container px-6 md:px-10 mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-bold text-qmf-dark mb-4">Quick & Easy Application</h2>
          <p className="text-qmf-dark/70 max-w-2xl mx-auto">
            Complete our simple application form in just a few minutes. Get pre-approved with no impact on your credit score.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-qmf-secondary -translate-y-1/2"></div>
            
            {steps.map((step) => (
              <div 
                key={step.id} 
                className="relative flex flex-col items-center z-10"
              >
                <div 
                  className={`
                    flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
                    ${currentStep >= step.id 
                      ? 'bg-qmf-primary border-qmf-primary text-white' 
                      : 'bg-white border-qmf-secondary text-qmf-dark/40'
                    }
                  `}
                >
                  {currentStep > step.id ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <span 
                  className={`
                    mt-2 text-sm font-medium transition-colors duration-300
                    ${currentStep >= step.id ? 'text-qmf-dark' : 'text-qmf-dark/40'}
                  `}
                >
                  {step.name}
                </span>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-qmf-secondary/50 overflow-hidden">
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="p-8"
                  >
                    <h3 className="text-2xl font-semibold mb-6 text-qmf-dark">Vehicle Information</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="vehicleType">Vehicle Type</Label>
                        <Select
                          value={formData.vehicleType}
                          onValueChange={(value) => updateFormData('vehicleType', value)}
                        >
                          <SelectTrigger id="vehicleType" className="w-full mt-2">
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sedan">Sedan</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                            <SelectItem value="truck">Truck</SelectItem>
                            <SelectItem value="van">Van</SelectItem>
                            <SelectItem value="sports">Sports Car</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="vehiclePrice">
                          Vehicle Price: {formatCurrency(formData.vehiclePrice)}
                        </Label>
                        <Slider
                          id="vehiclePrice"
                          min={5000}
                          max={100000}
                          step={1000}
                          value={[formData.vehiclePrice]}
                          onValueChange={(value) => updateFormData('vehiclePrice', value[0])}
                          className="mt-4"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="downPayment">
                          Down Payment: {formatCurrency(formData.downPayment)}
                        </Label>
                        <Slider
                          id="downPayment"
                          min={0}
                          max={formData.vehiclePrice / 2}
                          step={500}
                          value={[formData.downPayment]}
                          onValueChange={(value) => updateFormData('downPayment', value[0])}
                          className="mt-4"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="p-8"
                  >
                    <h3 className="text-2xl font-semibold mb-6 text-qmf-dark">Finance Information</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="loanTerm">
                          Loan Term: {formatLoanTerm(formData.loanTerm)}
                        </Label>
                        <RadioGroup
                          value={formData.loanTerm}
                          onValueChange={(value) => updateFormData('loanTerm', value)}
                          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3"
                        >
                          <div>
                            <RadioGroupItem
                              value="36"
                              id="term-36"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="term-36"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-qmf-primary [&:has([data-state=checked])]:border-qmf-primary cursor-pointer"
                            >
                              <span className="text-xl font-semibold">36</span>
                              <span className="text-sm text-muted-foreground">months</span>
                            </Label>
                          </div>
                          
                          <div>
                            <RadioGroupItem
                              value="60"
                              id="term-60"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="term-60"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-qmf-primary [&:has([data-state=checked])]:border-qmf-primary cursor-pointer"
                            >
                              <span className="text-xl font-semibold">60</span>
                              <span className="text-sm text-muted-foreground">months</span>
                            </Label>
                          </div>
                          
                          <div>
                            <RadioGroupItem
                              value="72"
                              id="term-72"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="term-72"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-qmf-primary [&:has([data-state=checked])]:border-qmf-primary cursor-pointer"
                            >
                              <span className="text-xl font-semibold">72</span>
                              <span className="text-sm text-muted-foreground">months</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div>
                        <Label htmlFor="employmentStatus">Employment Status</Label>
                        <Select
                          value={formData.employmentStatus}
                          onValueChange={(value) => updateFormData('employmentStatus', value)}
                        >
                          <SelectTrigger id="employmentStatus" className="w-full mt-2">
                            <SelectValue placeholder="Select employment status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fullTime">Full-time employed</SelectItem>
                            <SelectItem value="partTime">Part-time employed</SelectItem>
                            <SelectItem value="selfEmployed">Self-employed</SelectItem>
                            <SelectItem value="retired">Retired</SelectItem>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="bg-qmf-secondary/30 rounded-lg p-6 mt-6">
                        <h4 className="text-lg font-medium text-qmf-dark mb-4">Estimated Monthly Payment</h4>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-qmf-dark/70">Based on your selections</p>
                            <div className="text-xs text-qmf-dark/60 mt-1">
                              <p>Vehicle price: {formatCurrency(formData.vehiclePrice)}</p>
                              <p>Down payment: {formatCurrency(formData.downPayment)}</p>
                              <p>Term: {formatLoanTerm(formData.loanTerm)}</p>
                              <p className="text-xs mt-1">*Estimated rate: 4.99% APR</p>
                            </div>
                          </div>
                          <div>
                            <span className="text-3xl font-bold text-qmf-primary">{monthlyPayment()}</span>
                            <span className="text-sm text-qmf-dark/70 ml-1">/month</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="p-8"
                  >
                    <h3 className="text-2xl font-semibold mb-6 text-qmf-dark">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => updateFormData('firstName', e.target.value)}
                          className="mt-2"
                          placeholder="Enter your first name"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => updateFormData('lastName', e.target.value)}
                          className="mt-2"
                          placeholder="Enter your last name"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          className="mt-2"
                          placeholder="Enter your email address"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          className="mt-2"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <p className="text-sm text-qmf-dark/70">
                        By submitting this form, you consent to being contacted regarding your car finance application.
                        We respect your privacy and will not share your information with third parties.
                      </p>
                    </div>
                  </motion.div>
                )}
                
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="p-8"
                  >
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                        <Check className="h-8 w-8" />
                      </div>
                      
                      <h3 className="text-2xl font-semibold mb-4 text-qmf-dark">Application Ready!</h3>
                      
                      <p className="text-qmf-dark/70 mb-8">
                        Please review your information before submitting your application.
                      </p>
                      
                      <div className="bg-qmf-secondary/30 rounded-lg p-6 text-left mb-8">
                        <h4 className="font-medium mb-4">Application Summary</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-qmf-dark/60">Vehicle Type:</p>
                            <p className="font-medium">{formData.vehicleType || 'Not specified'}</p>
                          </div>
                          
                          <div>
                            <p className="text-qmf-dark/60">Vehicle Price:</p>
                            <p className="font-medium">{formatCurrency(formData.vehiclePrice)}</p>
                          </div>
                          
                          <div>
                            <p className="text-qmf-dark/60">Down Payment:</p>
                            <p className="font-medium">{formatCurrency(formData.downPayment)}</p>
                          </div>
                          
                          <div>
                            <p className="text-qmf-dark/60">Loan Term:</p>
                            <p className="font-medium">{formatLoanTerm(formData.loanTerm)}</p>
                          </div>
                          
                          <div>
                            <p className="text-qmf-dark/60">Employment Status:</p>
                            <p className="font-medium">{formData.employmentStatus || 'Not specified'}</p>
                          </div>
                          
                          <div>
                            <p className="text-qmf-dark/60">Monthly Payment:</p>
                            <p className="font-medium text-qmf-primary">{monthlyPayment()}</p>
                          </div>
                          
                          <div>
                            <p className="text-qmf-dark/60">Full Name:</p>
                            <p className="font-medium">
                              {formData.firstName ? `${formData.firstName} ${formData.lastName}` : 'Not specified'}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-qmf-dark/60">Contact:</p>
                            <p className="font-medium">{formData.email || 'Not specified'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div className="px-8 py-6 bg-qmf-secondary/20 border-t border-qmf-secondary/50 flex justify-between">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                    >
                      Back
                    </Button>
                  )}
                  
                  {currentStep < steps.length && (
                    <Button
                      type="button"
                      className="ml-auto bg-qmf-primary hover:bg-qmf-primary/90 text-white"
                      onClick={nextStep}
                    >
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                  
                  {currentStep === steps.length && (
                    <Button
                      type="submit"
                      className="ml-auto bg-qmf-accent hover:bg-qmf-accent/90 text-qmf-dark font-medium"
                    >
                      Submit Application
                    </Button>
                  )}
                </div>
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinanceForm;
