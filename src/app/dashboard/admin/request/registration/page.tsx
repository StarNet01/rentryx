"use client";
import RequestDetail from "@/modules/dashboard/admin/components/RequestDetail";
import { TopBoxReview } from "@/modules/dashboard/admin/components/TopBoxReview";
import DashboardLayout from "@/modules/dashboard/layouts/DashboardLayout";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";
import { Button } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  BarElement,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import useSWR from "swr";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  BarElement
);

interface RegistrationRequest {
  id: string;
  registerDate: string;
  // Company Info
  companyName: string;
  logo: string;
  numberOfCars: number;
  vatRegistered: boolean;
  vatNumber: string;
  website: string;
  package: "Basic" | "Premium" | "Enterprise";
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  // Address
  companyAddress: string;
  companyCity: string;
  companyPostalCode: string;
  // Business Info
  tradeLicenseNumber: string;
  companyLicenseImageID: string;
  // Additional Info
  socialNetworks: Array<{
    type: "instagram" | "linkedin";
    url: string;
  }>;
  vehicleCategories: string[];
  workingHours: {
    [key: string]: {
      enabled: boolean;
      start: string;
      end: string;
    };
  };
  geographicalCoverage: string[];
  // Payment Info
  paymentDate: string;
  paymentTime: string;
  cardNumber: string;
  packageCost: number;
}

const mockRegistrationRequests: RegistrationRequest[] = [
  {
    id: "1",
    registerDate: "2025-01-06",
    companyName: "Rental Car 14",
    logo: "/test.jpg",
    numberOfCars: 25,
    vatRegistered: true,
    vatNumber: "uirytvuty8g7v3465",
    website: "www.rentalcar14.com",
    package: "Basic",
    firstName: "Jerad",
    lastName: "Whitt",
    email: "Jerad@test.com",
    phoneNumber: "971-2823591",
    companyAddress: "P.O. Box: 52546, Dubai",
    companyCity: "Dubai",
    companyPostalCode: "59842",
    tradeLicenseNumber: "56465df654",
    companyLicenseImageID: "/testLice.jpg",
    socialNetworks: [
      { type: "instagram", url: "instagram.com/rentalcar14" },
      { type: "linkedin", url: "linkedin.com/company/rentalcar14" },
    ],
    vehicleCategories: ["Luxury", "SUV"],
    workingHours: {
      Monday: { enabled: true, start: "7:30", end: "20:30" },
      Tuesday: { enabled: true, start: "7:30", end: "20:30" },
      Wednesday: { enabled: true, start: "7:30", end: "20:30" },
      Thursday: { enabled: true, start: "7:30", end: "20:30" },
      Friday: { enabled: true, start: "7:30", end: "20:30" },
      Saturday: { enabled: false, start: "", end: "" },
      Sunday: { enabled: false, start: "", end: "" },
    },
    geographicalCoverage: ["Dubai", "Fujairah", "Sharjah"],
    paymentDate: "05/01/2025",
    paymentTime: "12:37",
    cardNumber: "******2356",
    packageCost: 100000,
  },
];

const page = () => {
  const [ShowDetail, setShowDetail] = useState(null);
  const [isBroker, setisBroker] = useState(false);

  const {
    data: mockRegistrationRequests,
    mutate,
    isLoading,
  } = useSWR(
    `request/registration/${isBroker ? "broker" : "company"}`,
    (url: any) => HttpClient.getInstance().fetcher(url)
  );
  if (isLoading) return <div>Loading...</div>;
  //TODO for dev

  const closeDetail = () => {
    setShowDetail(null);
  };

  if (!ShowDetail)
    return (
      <>
        <DashboardLayout panelType="admin">
          <TopBoxReview />

          <div className="mt-10">
            <h1 className="font-bold text-[16px]">New Registration</h1>
            <div className="mt-5 flex gap-3">
              <Button
                variant={!isBroker ? "contained" : "text"}
                onClick={() => setisBroker(false)}
                color="primary"
              >
                Companies
              </Button>
              <Button
                variant={isBroker ? "contained" : "text"}
                onClick={() => setisBroker(true)}
                color="primary"
              >
                Brokers
              </Button>
            </div>
            <div className="relative overflow-x-auto mt-5">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-[#A0A0A0] uppercase bg-gray-50 ">
                  <tr className="bg-white border-b  border-[#A0A0A0]">
                    <th scope="col" className="px-6 py-3">
                      Register Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      No. of car
                    </th>
                    <th scope="col" className="px-6 py-3">
                      VAT Register
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Website
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Package
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {mockRegistrationRequests.map((request) => (
                    <RowItem
                      key={request.id}
                      data={request}
                      showDetail={(data: RegistrationRequest) => {
                        setShowDetail(data as any);
                      }}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            {/* <div className="mt-5 flex justify-center gap-3">
              <Button variant="contained" color="error">
                Reject
              </Button>
              <Button variant="contained" color="success">
                Accept
              </Button>
            </div> */}
          </div>
        </DashboardLayout>
      </>
    );

  return <RequestDetail close={closeDetail} data={ShowDetail} />;
};

export default page;

const RowItem = ({ data, showDetail }: any) => {
  return (
    <>
      <tr className="bg-white border-b-2  border-[#A0A0A0]">
        <td className="px-6 py-4">{data.registerDate}</td>
        <td className="px-6 py-4">{data.name}</td>
        <td className="px-6 py-4">{data.numberOfCars}</td>
        <td className="px-6 py-4">{data.vatRegistered ? "Yes" : "No"}</td>
        <td className="px-6 py-4">{data.website}</td>
        <td className="px-6 py-4">{data.package}</td>
        <td className="px-6 py-4 flex gap-3">
          <a
            href="#"
            onClick={(e: any) => {
              e.preventDefault();
              showDetail(data);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="22"
              viewBox="0 0 23 22"
              fill="none"
            >
              <path
                d="M11.6273 0.5C9.4296 0.5 7.28128 1.11581 5.45398 2.26957C3.62668 3.42332 2.20247 5.0632 1.36145 6.98182C0.52044 8.90045 0.300392 11.0116 0.729137 13.0484C1.15788 15.0852 2.21616 16.9562 3.77016 18.4246C5.32415 19.8931 7.30405 20.8931 9.4595 21.2982C11.615 21.7034 13.8491 21.4954 15.8795 20.7007C17.9099 19.906 19.6453 18.5602 20.8663 16.8335C22.0872 15.1068 22.7389 13.0767 22.7389 11C22.7358 8.21613 21.5641 5.54712 19.481 3.57862C17.3978 1.61013 14.5733 0.50294 11.6273 0.5ZM11.6273 19.8846C9.76771 19.8846 7.94989 19.3635 6.40372 18.3873C4.85754 17.411 3.65244 16.0234 2.94081 14.4C2.22918 12.7765 2.04299 10.9901 2.40577 9.2667C2.76856 7.54325 3.66403 5.96016 4.97894 4.71763C6.29386 3.47509 7.96917 2.62891 9.79301 2.2861C11.6168 1.94328 13.5073 2.11923 15.2253 2.79169C16.9434 3.46414 18.4118 4.6029 19.4449 6.06397C20.478 7.52504 21.0294 9.24279 21.0294 11C21.0266 13.3555 20.0351 15.6138 18.2725 17.2794C16.5099 18.945 14.12 19.8819 11.6273 19.8846ZM12.9094 11C12.9094 11.2396 12.8342 11.4739 12.6933 11.6731C12.5524 11.8723 12.3522 12.0276 12.1179 12.1193C11.8836 12.211 11.6259 12.235 11.3771 12.1883C11.1284 12.1415 10.9 12.0261 10.7207 11.8567C10.5414 11.6872 10.4193 11.4714 10.3698 11.2364C10.3203 11.0013 10.3457 10.7577 10.4428 10.5364C10.5398 10.315 10.7041 10.1258 10.915 9.99264C11.1258 9.85951 11.3737 9.78846 11.6273 9.78846C11.9673 9.78846 12.2934 9.9161 12.5339 10.1433C12.7743 10.3705 12.9094 10.6787 12.9094 11ZM17.6105 11C17.6105 11.2396 17.5353 11.4739 17.3944 11.6731C17.2535 11.8723 17.0533 12.0276 16.819 12.1193C16.5847 12.211 16.3269 12.235 16.0782 12.1883C15.8295 12.1415 15.6011 12.0261 15.4218 11.8567C15.2425 11.6872 15.1204 11.4714 15.0709 11.2364C15.0214 11.0013 15.0468 10.7577 15.1438 10.5364C15.2409 10.315 15.4052 10.1258 15.6161 9.99264C15.8269 9.85951 16.0748 9.78846 16.3284 9.78846C16.6684 9.78846 16.9945 9.9161 17.235 10.1433C17.4754 10.3705 17.6105 10.6787 17.6105 11ZM8.20831 11C8.20831 11.2396 8.13312 11.4739 7.99223 11.6731C7.85135 11.8723 7.65112 12.0276 7.41684 12.1193C7.18256 12.211 6.92477 12.235 6.67607 12.1883C6.42736 12.1415 6.19891 12.0261 6.01961 11.8567C5.8403 11.6872 5.71819 11.4714 5.66872 11.2364C5.61925 11.0013 5.64464 10.7577 5.74168 10.5364C5.83872 10.315 6.00305 10.1258 6.21389 9.99264C6.42474 9.85951 6.67262 9.78846 6.9262 9.78846C7.26623 9.78846 7.59234 9.9161 7.83279 10.1433C8.07323 10.3705 8.20831 10.6787 8.20831 11Z"
                fill="#616161"
              />
            </svg>
          </a>
        </td>
      </tr>
    </>
  );
};
