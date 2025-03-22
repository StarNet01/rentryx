"use client";
import Header from "@/modules/landing/layouts/Header";
import {
  Container,
  Button,
  Rating,
  IconButton,
  Divider,
  Tab,
  Tabs,
  Grid2,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Instagram, LinkedIn, Language } from "@mui/icons-material";
import { useState } from "react";
import CustomTabPanel from "@/modules/share/components/ctp/CTP";
import AdItem from "@/modules/share/components/adItem/AdItem";

const CompanyPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Header />
      <div className="company-header p-5">
        <Button variant="text" sx={{ color: "#fff" }}>
          <svg
            className="w-6 h-6 text-white"
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
              d="M5 12h14M5 12l4-4m-4 4 4 4"
            />
          </svg>
          Back
        </Button>
        <div className="absolute bottom-[-130px] left-[100px] w-[206px] h-[206px] rounded-3xl flex align-bottom w-full">
          <img src="/test.jpg" alt="logo" className="rounded-3xl" />
          <div className="flex flex-col gap-1 w-full justify-end ml-5">
            <div className="flex gap-3 items-center w-fit">
              <h1 className="text-nowrap text-[32px]">Compnay Name</h1>
              <span>Verify</span>
              <svg
                className="w-6 h-6 text-[#159011]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M11.644 3.066a1 1 0 0 1 .712 0l7 2.666A1 1 0 0 1 20 6.68a17.694 17.694 0 0 1-2.023 7.98 17.406 17.406 0 0 1-5.402 6.158 1 1 0 0 1-1.15 0 17.405 17.405 0 0 1-5.403-6.157A17.695 17.695 0 0 1 4 6.68a1 1 0 0 1 .644-.949l7-2.666Zm4.014 7.187a1 1 0 0 0-1.316-1.506l-3.296 2.884-.839-.838a1 1 0 0 0-1.414 1.414l1.5 1.5a1 1 0 0 0 1.366.046l4-3.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex gap-5 items-center w-fit">
              <span>Rating</span>
              <span className="text-[24px]">4.6</span>
              <Rating
                name="text-feedback"
                value={4.6}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <span className="text-[#0A84FF] underline text-[12px] text-nowrap">
                135 review
              </span>
            </div>
          </div>
        </div>
      </div>
      <Container>
        <div className="flex justify-end mt-5">
          <IconButton color="primary" size="large">
            <LinkedIn />
          </IconButton>
          <IconButton color="primary" size="large">
            <Instagram />
          </IconButton>
          <IconButton color="primary" size="large">
            <Language />
          </IconButton>
          <Button variant="contained" color="error">
            Subscribe
          </Button>
        </div>

        <div className="flex justify-between items-end mt-5 gap-3">
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#8313B2",
              },
            }}
          >
            <Tab
              label="Information"
              {...a11yProps(0)}
              sx={{
                "&.Mui-selected": {
                  color: "#8313B2",
                },
              }}
            />
            <Tab
              label="Car listing"
              {...a11yProps(1)}
              sx={{
                "&.Mui-selected": {
                  color: "#8313B2",
                },
              }}
            />
          </Tabs>
          <div className="flex gap-3">
            <div className="bg-[#B6C6E6] rounded-xl flex flex-col justify-center items-center px-16 py-3">
              <h2 className="text-[#8313B2] text-[32px] font-bold">52</h2>
              <p className="text-[12px] text-white">Total Cars</p>
            </div>
            <div className="bg-[#B6C6E6] rounded-xl flex flex-col justify-center items-center px-16 py-3">
              <h2 className="text-[#8313B2] text-[32px] font-bold">135</h2>
              <p className="text-[12px] text-white">Total Reserve</p>
            </div>
          </div>
        </div>
        <CustomTabPanel value={value} index={0}>
          <div className="w-full flex gap-5 my-10">
            <div className="w-3/5">
              <div className="bg-[#F0F2F6] py-5 px-10 rounded-lg">
                <h4 className="text-[#a0a0a0]">Description</h4>
                <p className="text-[#151413]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
                <div className="flex justify-between mt-5">
                  <div className="flex flex-col gap-3">
                    <div>
                      <h4 className="text-[#a0a0a0]">Email Address</h4>
                      <p className="text-[#151413]">Test@test.com</p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h4 className="text-[#a0a0a0] mb-5">Coverage</h4>
                      <div>
                        <p className="text-[#151413]">Dubai</p>
                        <p className="text-[#151413]">Fujairah</p>
                        <p className="text-[#151413]">Sharjah</p>
                      </div>
                    </div>
                  </div>
                  <Divider
                    variant="fullWidth"
                    flexItem
                    orientation="vertical"
                    sx={{ color: "#A0A0A0" }}
                  />
                  <div className="flex flex-col gap-3">
                    <div>
                      <h4 className="text-[#a0a0a0]">Company Address</h4>
                      <p className="text-[#151413]">P.O. Box: 52546 , Dubai </p>
                    </div>
                    <div>
                      <h4 className="text-[#a0a0a0]">Phone Number</h4>
                      <p className="text-[#151413]">+ 971-2823591</p>
                    </div>
                    <div>
                      <h4 className="text-[#a0a0a0]">Categories car</h4>
                      <p className="text-[#151413]">Luxury</p>
                      <p className="text-[#151413]">Economy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#F0F2F6] py-5 px-10 rounded-lg flex justify-center gap-16 items-start w-2/5">
              <div>
                <h4 className="text-[#a0a0a0] mb-5">Available Hours</h4>
                <div className="flex gap-5 ">
                  <div className="flex flex-col gap-5">
                    <h4 className="text-[#a0a0a0]">Mon</h4>
                    <h4 className="text-[#a0a0a0]">Tue</h4>
                    <h4 className="text-[#a0a0a0]">Wed</h4>
                    <h4 className="text-[#a0a0a0]">Thu</h4>
                    <h4 className="text-[#a0a0a0]">Fri</h4>
                    <h4 className="text-[#a0a0a0]">Sat</h4>
                    <h4 className="text-[#a0a0a0]">Sun</h4>
                  </div>
                  <Divider
                    variant="fullWidth"
                    flexItem
                    orientation="vertical"
                    sx={{ color: "#A0A0A0" }}
                  />
                  <div className="flex flex-col gap-5">
                    <p className="text-[#151413]">7.30 am - 8.30 pm</p>
                    <p className="text-[#151413]">7.30 am - 8.30 pm</p>
                    <p className="text-[#151413]">7.30 am - 8.30 pm</p>
                    <p className="text-[#151413]">7.30 am - 8.30 pm</p>
                    <p className="text-[#151413]">7.30 am - 8.30 pm</p>
                    <p className="text-[#151413]">Closed</p>
                    <p className="text-[#151413]">Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Grid2 container rowSpacing={3}>
            <Grid2 size={6}>
              <AdItem />
            </Grid2>
            <Grid2 size={6}>
              <AdItem />
            </Grid2>
            <Grid2 size={6}>
              <AdItem />
            </Grid2>
            <Grid2 size={6}>
              <AdItem />
            </Grid2>
            <Grid2 size={6}>
              <AdItem />
            </Grid2>
            <Grid2 size={6}>
              <AdItem />
            </Grid2>
          </Grid2>
        </CustomTabPanel>
      </Container>
    </>
  );
};

export default CompanyPage;


 interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

 function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}