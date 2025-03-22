"use client";
import { IBrokerRegisterSteps } from "../../constants/brokerRegisterSteps";
import Stepper from "@/modules/share/components/stepper/Stepper";

const RegisterStepSidebar = ({
  steps,
  step1Level,
  step2Level,
}: {
  steps: IBrokerRegisterSteps[];
  step1Level: number;
  step2Level?: number;
}) => {
  return (
    <div className="px-8 bg-primary pt-10 min-h-[100vh] w-3/12 flex flex-col">
      <Stepper activeStep={step1Level} step={steps[0]} />
      {step2Level && <Stepper activeStep={step2Level} step={steps[1]} />}
    </div>
  );
};

export default RegisterStepSidebar;
