'use client'
import HttpClient from "@/modules/share/services/httpClient/HttpClient";
import {
  Divider,
  Button,
  Container,
  Grid2,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import useSWR from "swr";

interface FAQType {
  id: number;
  question: string;
  answer: string;
}

const Main = () => {
  const { data: faqs, mutate } = useSWR("faqs/home", (url) =>
    HttpClient.getInstance().fetcher(url)
  );

  return (
    <>
      <div className="top-img flex items-center justify-start">
        <div>
          <div className="flex flex-col justify-center p-4 gap-4">
            <h1 className="text-white text-[48px]">Are You Ready?</h1>
            <Button variant="contained" color="primary">
              Launch Ads
            </Button>
            <Button variant="contained" color="primary">
              Find Cars
            </Button>
          </div>
        </div>
      </div>

      <Grid2 container px={10} spacing={6} mt={10}>
        <Grid2 size={6}>
          <h2 className="text-[#97AFDE] text-[36px] text-justify">
            Who We Are?
          </h2>

          <p>
            We are revolutionizing the car rental industry with a modern and
            professional platform designed exclusively for connecting rental
            companies and brokers. Our goal is to ensure secure, transparent,
            and efficient collaboration for all users.
          </p>
        </Grid2>
        <Grid2 size={6}>
          <h2 className="text-[#97AFDE] text-[36px] text-justify">
            Why Choose Us?
          </h2>
          <p>
            Unmatched Security: Verified documents and identity checks ensure
            that all users are authentic and trustworthy. Streamlined
            Management: Effortlessly handle vehicle fleets and reservations in a
            user-friendly system. Modern Design: Our minimalist and intuitive
            interface guarantees a seamless experience. Our Mission To create a
            trusted, efficient platform where rental companies and brokers can
            collaborate with ease, focusing on their growth while we handle the
            technical complexities.
          </p>
        </Grid2>
      </Grid2>
      <div className="car-bg-main-1 min-h-[673px] w-full flex justify-end items-start">
        <Grid2 container px={10} spacing={6} mt={10} justifyContent="end">
          <Grid2 size={6}>
            <h2 className="text-[#8313B2] text-[36px] text-justify">Join US</h2>
            <p>
              Become part of a professional network that transforms the way you
              manage vehicles and reservations. We are the solution you've
              always needed!
            </p>
          </Grid2>
        </Grid2>
      </div>
      <Grid2 container px={10} spacing={6} mt={10} alignItems={"end"}>
        <Grid2 size={3} className="text-center">
          <h2 className="text-[#111] text-[36px]">Company Package</h2>
          <div className="border-[#A0A0A0] border rounded-lg bg-[#F0F2F6] p-5 flex flex-col justify-between min-h-[560px]">
            <div>
              <h3 className="text-[#97AFDE]">3 Months Free</h3>
              <Divider />
            </div>
            <h3 className="text-[#8313B2] flex font-bold justify-center">
              Get Start
              <svg
                className="w-6 h-6 text-[#8313B2]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </h3>
          </div>
        </Grid2>
        <Grid2 size={9}>
          <div className="border-[#A0A0A0] border rounded-lg bg-[#F0F2F6] p-5 mb-5">
            <div className="flex justify-between mb-3">
              <span className="text-[#97AFDE]">Basic Package</span>
              <div className="text-right">
                <h6 className="text-[#97AFDE]">AED 1,500</h6>
                <p className="text-[#A0A0A0]">
                  +5% vat (per month,12 months contract)
                </p>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col gap-3">
              <span className="flex">
                <svg
                  className="w-6 h-6 text-[#8313B2]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z"
                    clipRule="evenodd"
                  />
                </svg>
                Listing up to 10 cars per month
              </span>
              <span className="flex">
                <svg
                  className="w-6 h-6 text-[#8313B2]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z"
                    clipRule="evenodd"
                  />
                </svg>
                Listing up to 10 cars per month
              </span>
              <span className="flex">
                <svg
                  className="w-6 h-6 text-[#8313B2]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z"
                    clipRule="evenodd"
                  />
                </svg>
                Listing up to 10 cars per month
              </span>
              <span className="flex">
                <svg
                  className="w-6 h-6 text-[#8313B2]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z"
                    clipRule="evenodd"
                  />
                </svg>
                Listing up to 10 cars per month
              </span>
              <h3 className="text-[#8313B2] flex font-bold self-end">
                Buy Your Package
                <svg
                  className="w-6 h-6 text-[#8313B2]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                  />
                </svg>
              </h3>
            </div>
          </div>
          <div className="border-[#A0A0A0] border rounded-lg bg-[#F0F2F6] p-5">
            <div className="flex justify-between mb-3">
              <span className="text-[#97AFDE]">Basic Package</span>
              <div className="text-right">
                <h6 className="text-[#97AFDE]">AED 1,500</h6>
                <p className="text-[#A0A0A0]">
                  +5% vat (per month,12 months contract)
                </p>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col gap-3">
              <span className="flex">
                <svg
                  className="w-6 h-6 text-[#8313B2]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z"
                    clipRule="evenodd"
                  />
                </svg>
                Listing up to 10 cars per month
              </span>
              <span className="flex">
                <svg
                  className="w-6 h-6 text-[#8313B2]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z"
                    clipRule="evenodd"
                  />
                </svg>
                Listing up to 10 cars per month
              </span>
              <span className="flex">
                <svg
                  className="w-6 h-6 text-[#8313B2]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z"
                    clipRule="evenodd"
                  />
                </svg>
                Listing up to 10 cars per month
              </span>
              <span className="flex">
                <svg
                  className="w-6 h-6 text-[#8313B2]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z"
                    clipRule="evenodd"
                  />
                </svg>
                Listing up to 10 cars per month
              </span>
              <h3 className="text-[#8313B2] flex font-bold self-end">
                Buy Your Package
                <svg
                  className="w-6 h-6 text-[#8313B2]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                  />
                </svg>
              </h3>
            </div>
          </div>
        </Grid2>
      </Grid2>
      <div className="sec-main-2 min-h-[716px] mt-16 flex justify-end gap-10 items-center pr-20">
        <div className=" rounded-3xl bg-[#F0F2F6] py-16 max-h-[560px] min-w-[335px]">
          <div className="mb-72">
            <div className="bg-[#8313B2] py-8">
              <h3 className="text-[#fff] flex font-bold justify-center">
                Yearly
              </h3>
            </div>
          </div>
          <h3 className="text-[#151413] flex font-bold justify-center">
            Sell Traffic
            <svg
              className="w-6 h-6 text-[#151413]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 12H5m14 0-4 4m4-4-4-4"
              />
            </svg>
          </h3>
        </div>
        <div className=" rounded-3xl bg-[#F0F2F6] py-16 max-h-[560px] min-w-[335px]">
          <div className="mb-72">
            <div className="bg-[#8313B2] py-8">
              <h3 className="text-[#fff] flex font-bold justify-center">
                Free
              </h3>
            </div>
          </div>
          <h3 className="text-[#151413] flex font-bold justify-center">
            Sell Traffic
            <svg
              className="w-6 h-6 text-[#151413]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 12H5m14 0-4 4m4-4-4-4"
              />
            </svg>
          </h3>
        </div>
      </div>
      <div className="my-10">
        <Grid2 container px={10} spacing={6} mt={10}>
          <Grid2 size={12}>
            <h2 className="text-[#111] text-[36px]">
              Frequently Asked Question
            </h2>
          </Grid2>
          <Grid2 size={6}>
            <div className="text-[#111] text-[36px] flex flex-col gap-4">
              {faqs &&
                faqs
                  .slice(0, Math.floor(faqs.length / 2))
                  .map((faq: any, i: number) => (
                    <li key={i}>
                      <FAQItem question={faq.question} answer={faq.answer} />
                    </li>
                  ))}
            </div>
          </Grid2>
          <Grid2 size={6}>
            <div className="text-[#111] text-[36px] flex flex-col gap-4">
              {faqs &&
                faqs
                  .slice(Math.floor(faqs.length / 2))
                  .map((faq: any, i: number) => (
                    <li key={i}>
                      <FAQItem question={faq.question} answer={faq.answer} />
                    </li>
                  ))}
            </div>
          </Grid2>
        </Grid2>
      </div>
    </>
  );
};

export default Main;

const FAQItem = ({ question, answer }: any) => {
  return (
    <Accordion
      sx={{
        backgroundColor: "rgba(151, 175, 222, 0.2)",
        borderRadius: "10px !important",
        py: 1,
        boxShadow: "none !important",
        border: "1px solid #97AFDE",
      }}
    >
      <AccordionSummary
        expandIcon={
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 10C0.5 4.7533 4.7533 0.5 10 0.5H30C35.2467 0.5 39.5 4.7533 39.5 10V30C39.5 35.2467 35.2467 39.5 30 39.5H10C4.7533 39.5 0.5 35.2467 0.5 30V10Z"
              fill="#97AFDE"
            />
            <path
              d="M0.5 10C0.5 4.7533 4.7533 0.5 10 0.5H30C35.2467 0.5 39.5 4.7533 39.5 10V30C39.5 35.2467 35.2467 39.5 30 39.5H10C4.7533 39.5 0.5 35.2467 0.5 30V10Z"
              stroke="#97AFDE"
            />
            <path
              d="M31 20C31 20.1862 30.926 20.3648 30.7944 20.4965C30.6627 20.6282 30.4841 20.7021 30.2979 20.7021H20.7021V30.2979C20.7021 30.4841 20.6282 30.6627 20.4965 30.7944C20.3648 30.926 20.1862 31 20 31C19.8138 31 19.6352 30.926 19.5035 30.7944C19.3718 30.6627 19.2979 30.4841 19.2979 30.2979V20.7021H9.70213C9.51591 20.7021 9.33732 20.6282 9.20565 20.4965C9.07397 20.3648 9 20.1862 9 20C9 19.8138 9.07397 19.6352 9.20565 19.5035C9.33732 19.3718 9.51591 19.2979 9.70213 19.2979H19.2979V9.70213C19.2979 9.51591 19.3718 9.33732 19.5035 9.20565C19.6352 9.07397 19.8138 9 20 9C20.1862 9 20.3648 9.07397 20.4965 9.20565C20.6282 9.33732 20.7021 9.51591 20.7021 9.70213V19.2979H30.2979C30.4841 19.2979 30.6627 19.3718 30.7944 19.5035C30.926 19.6352 31 19.8138 31 20Z"
              fill="#151413"
            />
          </svg>
        }
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography component="span">{question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
