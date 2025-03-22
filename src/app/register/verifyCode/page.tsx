"use client";
import RegisterStepSidebar from "@/modules/auth/components/registerStepSidebar/RegisterStepSidebar";
import { BrokerRegisterSteps } from "@/modules/auth/constants/brokerRegisterSteps";
import useBrokerRegisterFormStore from "@/modules/auth/store/BrokerRegisterForms";
import InputVerificationCode from "@/modules/share/components/inputVerificationCode/InputVerificationCode";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";

const resendCodeMinutesInSeconds = 3;

export default function VerifyCode() {
  const { formData, backStep, step2Level } = useBrokerRegisterFormStore();
  const [timeLeft, setTimeLeft] = useState(resendCodeMinutesInSeconds);
  const [resendVisible, setResendVisible] = useState(false);
  const [timePhoneLeft, setTimePhoneLeft] = useState(
    resendCodeMinutesInSeconds
  );
  const [resendPhoneVisible, setResendPhoneVisible] = useState(false);

  useEffect(() => {
    HttpClient.getInstance().post("verify", {
      type: "phone",
      contact: "09123456789",
    });
    HttpClient.getInstance().post("verify", {
      type: "email",
      contact: "teset@test547658.com",
    });
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      setResendVisible(true);
    }
    if (timePhoneLeft > 0) {
      const timerId = setInterval(() => {
        setTimePhoneLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      setResendPhoneVisible(true);
    }
  }, [timeLeft, timePhoneLeft]);

  const handleResendCode = () => {
    // TODO logic resend code
    setTimeLeft(resendCodeMinutesInSeconds);
    setResendVisible(false);
  };
  const handleResendCodePhone = () => {
    // TODO logic resend code
    setTimePhoneLeft(resendCodeMinutesInSeconds);
    setResendPhoneVisible(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <>
      <div className="flex">
        <RegisterStepSidebar
          steps={BrokerRegisterSteps}
          step1Level={4}
          step2Level={step2Level}
        ></RegisterStepSidebar>
        <div className="pl-16 lg:pr-60 py-10 container mx-auto">
          <h1 className="font-bold">Verify Your Email</h1>
          <Typography variant="body1" color="gray">
            {formData.email || "test@gmailc.om"}
          </Typography>
          <div className="mt-3">
            <Typography variant="body1" component="h4">
              Enter your 4-digit code
            </Typography>
            <div className="flex gap-2 my-3">
              <InputVerificationCode length={4} onCompleted={() => {}} />
              <Button variant="contained" color="secondary">
                verify
              </Button>
            </div>
            <Typography variant="body1" component="span" className="">
              Didn’t recieve the code?{" "}
            </Typography>
            {resendVisible ? (
              <a
                href="#"
                onClick={handleResendCode}
                className="text-[#0A84FF] underline"
              >
                {" "}
                Resent new Code
              </a>
            ) : (
              <span className="font-bold"> {formatTime(timeLeft)}</span>
            )}
          </div>
          <div className="mt-14"></div>
          <h1 className="font-bold">Verify Your PhoneNumber</h1>
          <Typography variant="body1" color="gray">
            {formData.phoneNumber || "09365256254"}
          </Typography>
          <div className="mt-3">
            <Typography variant="body1" component="h4">
              Enter your 4-digit code
            </Typography>
            <div className="flex gap-2 my-3">
              <InputVerificationCode length={4} onCompleted={() => {}} />
              <Button variant="contained" color="secondary">
                verify
              </Button>
            </div>
            <Typography variant="body1" component="span" className="">
              Didn’t recieve the code?{" "}
            </Typography>
            {resendPhoneVisible ? (
              <a
                href="#"
                onClick={handleResendCodePhone}
                className="text-[#0A84FF] underline"
              >
                {" "}
                Resent new Code
              </a>
            ) : (
              <span className="font-bold"> {formatTime(timePhoneLeft)}</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
