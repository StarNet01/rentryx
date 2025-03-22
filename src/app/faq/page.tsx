"use client";
import Footer from "@/modules/landing/layouts/Footer";
import Header from "@/modules/landing/layouts/Header";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";
import toast from "react-hot-toast";
import useSWR from "swr";

interface FAQType {
  id: number;
  question: string;
  answer: string;
}

interface UserQuestionType {
  question: string;
  email?: string;
}

const page = () => {
  const [userQuestion, setUserQuestion] = useState("");

  const { data: faqs, mutate } = useSWR("faqs", (url) =>
    HttpClient.getInstance().fetcher(url)
  );

  const handleSubmitQuestion = async () => {
    if (!userQuestion.trim()) return;

    try {
      await HttpClient.getInstance().post("question", {
        question: userQuestion,
      });
      setUserQuestion("");
      toast.success("your question send successfully");
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <div className="flex flex-col justify-center mt-10">
          <div className="text-center mb-5">
            <h1 className="text-[36px]">frequently asked question</h1>
            <p className="text-[16px]">
              Find answers to the most commonly asked question below.
            </p>
          </div>
          <ul className="space-y-5">
            {faqs &&
              faqs.map((faq: any, i: number) => (
                <li key={i}>
                  <FAQItem question={faq.question} answer={faq.answer} />
                </li>
              ))}
          </ul>
          <Divider sx={{ my: 5 }} />
          <div className="h-full mb-10">
            <h2 className="text-[32px]">Have a question? Ask us</h2>
            <p className="text-[#A0A0A0] mb-3">
              Can’t find what you’re looking for? Let us know your question, and
              we’ll assist you
            </p>
            <div>
              <TextField
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": {
                    height: "100%",
                    backgroundColor: "#F0F2F6",
                    borderRadius: "20px",
                    border: "1px solid #A0A0A0",
                  },
                }}
                fullWidth
                placeholder="Write your question"
                multiline
                rows={8}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleSubmitQuestion}
                          color="primary"
                          sx={{
                            backgroundColor: "#97AFDE",
                            ":hover": { backgroundColor: "#97AFfE" },
                          }}
                        >
                          <SendIcon sx={{ color: "#fff" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default page;

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
