"use client";
import RegisterStepSidebar from "@/modules/auth/components/registerStepSidebar/RegisterStepSidebar";
import { BrokerRegisterSteps } from "@/modules/auth/constants/brokerRegisterSteps";
import useBrokerRegisterFormStore from "@/modules/auth/store/BrokerRegisterForms";
import Button from "@mui/material/Button";

export default function Subscription() {
  const { formData, step2Level } = useBrokerRegisterFormStore();

  return (
    <>
      <div className="flex">
        <RegisterStepSidebar
          steps={BrokerRegisterSteps}
          step1Level={4}
          step2Level={step2Level}
        ></RegisterStepSidebar>
        <div className="pl-16 lg:pr-60 py-10 container mx-auto">
          <h1 className="font-bold text-[20px] mb-3">Choose package</h1>

          <div className=" p-6 bg-[#F0F2F6] border border-[#97AFDE] rounded-lg shadow mb-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              Free package
            </h5>
            <p className="mb-3 font-normal text-gray-700 ">3 Months Free</p>

            <div className="flex justify-end">
              <Button variant="contained" color="secondary">
                Buy Package
              </Button>
            </div>
          </div>
          <div className=" p-6 bg-[#F0F2F6] border border-[#97AFDE] rounded-lg shadow mb-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              yearly
            </h5>
            <p className="mb-3 font-normal text-gray-700 ">5 Months Free</p>

            <div className="flex justify-end">
              <Button variant="contained" color="secondary">
                Buy Package
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
