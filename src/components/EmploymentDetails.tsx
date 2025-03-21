
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Briefcase } from "lucide-react";

interface EmploymentDetailsProps {
  formData: {
    status: string;
    employer: string;
    jobTitle: string;
    income: string;
    employmentYears: string;
  };
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const EmploymentDetails = ({ formData, updateFormData, onNext, onPrev }: EmploymentDetailsProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.status) newErrors.status = "Employment status is required";
    
    if (formData.status === "employed" || formData.status === "self-employed") {
      if (!formData.employer) newErrors.employer = "Employer name is required";
      if (!formData.jobTitle) newErrors.jobTitle = "Job title is required";
    }
    
    if (!formData.income) {
      newErrors.income = "Annual income is required";
    } else if (isNaN(parseInt(formData.income)) || parseInt(formData.income) <= 0) {
      newErrors.income = "Please enter a valid income amount";
    }
    
    if (formData.status === "employed" || formData.status === "self-employed") {
      if (!formData.employmentYears) {
        newErrors.employmentYears = "Years at current employment is required";
      } else if (isNaN(parseInt(formData.employmentYears)) || parseInt(formData.employmentYears) < 0) {
        newErrors.employmentYears = "Please enter a valid number of years";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const isEmployed = formData.status === "employed" || formData.status === "self-employed";

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-qmf-purple/10 rounded-full mb-4">
          <Briefcase className="h-8 w-8 text-qmf-purple" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Employment Details</h2>
        <p className="text-qmf-medium-gray">Please provide your current employment information</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="status" className={errors.status ? "text-red-500" : ""}>Employment Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleChange("status", value)}
          >
            <SelectTrigger id="status" className={errors.status ? "border-red-500" : ""}>
              <SelectValue placeholder="Select employment status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employed">Employed</SelectItem>
              <SelectItem value="self-employed">Self-Employed</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="unemployed">Unemployed</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
        </div>

        {isEmployed && (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="employer" className={errors.employer ? "text-red-500" : ""}>
                {formData.status === "self-employed" ? "Business Name" : "Employer Name"}
              </Label>
              <Input
                id="employer"
                value={formData.employer}
                onChange={(e) => handleChange("employer", e.target.value)}
                className={errors.employer ? "border-red-500" : ""}
              />
              {errors.employer && <p className="text-red-500 text-sm mt-1">{errors.employer}</p>}
            </div>

            <div>
              <Label htmlFor="jobTitle" className={errors.jobTitle ? "text-red-500" : ""}>Job Title</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => handleChange("jobTitle", e.target.value)}
                className={errors.jobTitle ? "border-red-500" : ""}
              />
              {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="income" className={errors.income ? "text-red-500" : ""}>Annual Income (£)</Label>
            <Input
              id="income"
              type="number"
              min="0"
              value={formData.income}
              onChange={(e) => handleChange("income", e.target.value)}
              className={errors.income ? "border-red-500" : ""}
            />
            {errors.income && <p className="text-red-500 text-sm mt-1">{errors.income}</p>}
          </div>

          {isEmployed && (
            <div>
              <Label htmlFor="employmentYears" className={errors.employmentYears ? "text-red-500" : ""}>Years at Current Employment</Label>
              <Input
                id="employmentYears"
                type="number"
                min="0"
                value={formData.employmentYears}
                onChange={(e) => handleChange("employmentYears", e.target.value)}
                className={errors.employmentYears ? "border-red-500" : ""}
              />
              {errors.employmentYears && <p className="text-red-500 text-sm mt-1">{errors.employmentYears}</p>}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <Button 
          variant="outline" 
          onClick={onPrev}
          className="flex items-center"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button 
          onClick={handleContinue} 
          className="bg-qmf-purple hover:bg-qmf-purple/90"
        >
          Continue <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
