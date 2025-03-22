"use client";
import RegisterBrokerStep1 from "@/modules/auth/components/registerBrokerStep1/RegisterBrokerStep1";
import RegisterBrokerStep2 from "@/modules/auth/components/registerBrokerStep2/RegisterBrokerStep2";
import RegisterBrokerStep3 from "@/modules/auth/components/registerBrokerStep3/RegisterBrokerStep3";
import RegisterStepSidebar from "@/modules/auth/components/registerStepSidebar/RegisterStepSidebar";
import { BrokerRegisterSteps } from "@/modules/auth/constants/brokerRegisterSteps";
import useBrokerRegisterFormStore from "@/modules/auth/store/BrokerRegisterForms";

export default function BrokerRegister() {
  const { nextStep, backStep, step1Level,step2Level } =
    useBrokerRegisterFormStore();

  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return <RegisterBrokerStep1 />;
      case 1:
        return <RegisterBrokerStep2 />;
      case 2:
        return <RegisterBrokerStep3 />;
    }
  };

  return (
    <>
      <div className="flex">
        <RegisterStepSidebar
          steps={BrokerRegisterSteps}
          step1Level={step1Level} step2Level={step2Level}
        ></RegisterStepSidebar>
        <div className="pl-16 lg:pr-60 py-10 container mx-auto">
          {renderStep(step1Level)}
        </div>
      </div>
    </>
  );
}
