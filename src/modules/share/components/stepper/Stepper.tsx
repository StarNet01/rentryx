"use client";
import { IBrokerRegisterSteps } from "@/modules/auth/constants/brokerRegisterSteps";

const Stepper = ({
  step,
  activeStep,
}: {
  step: IBrokerRegisterSteps;
  activeStep: number;
}) => {
  return (
    <>
      <div>
        <h3 className="text-white my-4 font-bold text-xl">{step.title}</h3>
        <ol className="relative text-gray-500 border-s border-gray-200">
          {step.levels.map((item, i) => {
            if (i === activeStep) return <Active title={item} key={i} />;
            if (i < activeStep) return <Complite title={item} key={i} />;
            if (i > activeStep) return <NextItem title={item} key={i} />;
            return <NextItem title={item} key={i} />;
          })}
        </ol>
      </div>
    </>
  );
};

export default Stepper;

const Complite = ({ title }: any) => {
  return (
    <>
      <li className="mb-10 ms-5">
        <span className="absolute flex items-center justify-center w-3 h-3 bg-[#8313B2] rounded-full -start-1.5 ring-4 ring-[#8313B2]"></span>
        <h3 className="font-medium leading-tight text-[#8313B2]">{title}</h3>
      </li>
    </>
  );
};
const Active = ({ title }: any) => {
  return (
    <>
      <li className="mb-10 ms-5">
        <span className="absolute flex items-center justify-center w-3 h-3 bg-[#8313B2] rounded-full -start-1.5 ring-4 ring-[#fff]"></span>
        <h3 className="font-medium leading-tight text-[#8313B2]">{title}</h3>
      </li>
    </>
  );
};
const NextItem = ({ title }: any) => {
  return (
    <>
      <li className="mb-10 ms-5">
        <span className="absolute flex items-center justify-center w-3 h-3 bg-[#fff] rounded-full -start-1.5 ring-4 ring-[#fff]"></span>
        <h3 className="font-medium leading-tight text-[#fff]">{title}</h3>
      </li>
    </>
  );
};
