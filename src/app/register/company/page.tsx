"use client";
import Step1 from "@/modules/auth/components/registerCompany/step1/Step1";
import Step2 from "@/modules/auth/components/registerCompany/step2/Step2";
import Step3 from "@/modules/auth/components/registerCompany/step3/Step3";
import Step4 from "@/modules/auth/components/registerCompany/step4/Step4";
import RegisterStepSidebar from "@/modules/auth/components/registerStepSidebar/RegisterStepSidebar";
import { CompanyRegisterSteps } from "@/modules/auth/constants/companyRegisterSteps";
import useCompanyRegisterForms from "@/modules/auth/store/CompanyRegisterForms";


export default function CompanyRegister() {
  const { step1Level, step2Level } = useCompanyRegisterForms();

  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 />;
      case 2:
        return <Step3 />;
      case 3:
        return <Step4 />;
    }
  };

  return (
    <>
      <div className="flex">
        <RegisterStepSidebar
          steps={CompanyRegisterSteps}
          step1Level={step1Level}
          step2Level={step2Level}
        ></RegisterStepSidebar>
        <div className="pl-16 lg:pr-60 py-10 container mx-auto">
          {renderStep(step1Level)}
        </div>
      </div>
    </>
  );
}
