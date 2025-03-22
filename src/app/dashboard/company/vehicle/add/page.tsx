"use client";
import RegisterStepSidebar from "@/modules/auth/components/registerStepSidebar/RegisterStepSidebar";
import { VehicleAddSteps } from "@/modules/auth/constants/brokerRegisterSteps";
import Step1 from "@/modules/dashboard/company/components/addVehicle/step1/Step1";
import Step2 from "@/modules/dashboard/company/components/addVehicle/step2/Step2";
import Step3 from "@/modules/dashboard/company/components/addVehicle/step3/Step3";
import Step4 from "@/modules/dashboard/company/components/addVehicle/step4/Step4";
import Step5 from "@/modules/dashboard/company/components/addVehicle/step5/Step5";
import useAddVehicleFormStore from "@/modules/dashboard/company/store/AddVehicleForm";

const page = () => {
  const { step } = useAddVehicleFormStore();

  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      case 5:
        return;
    }
  };

  return (
    <>
      {step === 5 ? (
         <Step5 />
      ) : (
        <>
          <div className="flex">
            <RegisterStepSidebar
              steps={VehicleAddSteps}
              step1Level={step}
            ></RegisterStepSidebar>
            <div className="pl-16 lg:pr-60 py-10 container mx-auto">
              {renderStep(step)}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default page;
