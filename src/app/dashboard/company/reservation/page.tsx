"use client";
import DashboardLayout from "@/modules/dashboard/layouts/DashboardLayout";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

const page = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [filter, setFilter] = useState("All");

  const { data: RequestList, mutate } = useSWR(
    `company_reservations/${1}`,
    (url) => HttpClient.getInstance().fetcher(url)
  );

  return (
    <div>
      <DashboardLayout panelType="company">
        <h1 className="font-bold text-2xl">Reserve listing</h1>

        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400">
          <ul className="flex flex-wrap -mb-px">
            <li className="me-2">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(1);
                }}
                className={
                  activeTab === 1
                    ? "inline-block p-4 text-[#8313B2] border-b-2 border-[#8313B2] rounded-t-lg active"
                    : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-30"
                }
              >
                Request
              </a>
            </li>
            <li className="me-2">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(2);
                }}
                className={
                  activeTab !== 1
                    ? "inline-block p-4 text-[#8313B2] border-b-2 border-[#8313B2] rounded-t-lg active"
                    : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-30"
                }
                aria-current="page"
              >
                History
              </a>
            </li>
          </ul>
        </div>

        {activeTab === 1 ? (
          <>
            <div className="relative overflow-x-auto mt-5">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-[#A0A0A0] uppercase bg-gray-50 ">
                  <tr className="bg-white border-b  border-[#A0A0A0]">
                    <th scope="col" className="px-6 py-3">
                      Request Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Broker
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Car model
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Car type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Pickup date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Drop off date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Booking Duration
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {RequestList &&
                    RequestList.reservations
                      .filter((x: any) => x.status === "Pending")
                      .map((item: any, i: number) => (
                        <RowItem data={item} key={i} mutate={mutate} />
                      ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-end">
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="All"
                    onClick={() => setFilter("All")}
                    control={<Radio />}
                    label="All"
                    defaultChecked
                  />
                  <FormControlLabel
                    value="Approved"
                    onClick={() => setFilter("Approved")}
                    sx={{
                      color: "#79F6A7",
                      "&.Mui-checked": {
                        color: "#79F6A7",
                      },
                    }}
                    control={<Radio />}
                    label="Approved"
                  />
                  <FormControlLabel
                    value="Rejected"
                    onClick={() => setFilter("Rejected")}
                    control={<Radio />}
                    label="Rejected"
                    sx={{
                      color: "#EB5858",
                      "&.Mui-checked": {
                        color: "#EB5858",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="Expired"
                    onClick={() => setFilter("Expired")}
                    control={<Radio />}
                    label="Expired"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <div className="relative overflow-x-auto mt-5">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-[#A0A0A0] uppercase bg-gray-50 ">
                  <tr className="bg-white border-b  border-[#A0A0A0]">
                    <th scope="col" className="px-6 py-3">
                      Request Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Broker
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Car model
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Car type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Pickup date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Drop off date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Booking Duration
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {RequestList &&
                    RequestList.reservations
                      .filter((x: any) => x.status !== "Pending")
                      .filter((y: any) => {
                        switch (filter) {
                          case "All":
                            return y;
                          case "Approved":
                            return y.status === "Approved";
                          case "Rejected":
                            return y.status === "Rejected";
                          case "Expired":
                            return y.status === "Expired";
                          default:
                            return y;
                        }
                      })
                      .map((item: any, i: number) => (
                        <RowItemHistory data={item} key={i} />
                      ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </DashboardLayout>
    </div>
  );
};

export default page;

const RowItem = ({ data, mutate }: any) => {
  const router = useRouter();

  const handleApprove = (e: any) => {
    e.preventDefault();
    HttpClient.getInstance()
      .put(`company_reservations/${data.id}`, {
        status: "Approved",
      })
      .then(() => {
        mutate();
        toast.success("Reservation Approved successfully");
      })
      .catch(() => toast.error("This didn't work."));
  };
  const handleReject = (e: any) => {
    e.preventDefault();
    HttpClient.getInstance()
      .put(`company_reservations/${data.id}`, {
        status: "Rejected",
      })
      .then(() => {
        mutate();
        toast.success("Reservation Rejected successfully");
      })
      .catch(() => toast.error("This didn't work."));
  };
  const handleMakeChat = (e: any) => {
    e.preventDefault();
    HttpClient.getInstance()
      .post(`create_chat`, {
        withUserID: data.user_id,
      })
      .then((response: any) => {
        const chatId = response.data.chat_id;
        router.push(`/dashboard/company/messages?selected=${chatId}`);
      })
      .catch(() => {
        toast.error("cant create chat");
      });
  };

  return (
    <>
      <tr className="bg-white border-b-2  border-[#A0A0A0]">
        <td className="px-6 py-4">{data.request_date}</td>
        <td className="px-6 py-4">{data.broker}</td>
        <td className="px-6 py-4">{data.car_model}</td>
        <td className="px-6 py-4">{data.car_type}</td>
        <td className="px-6 py-4">{data.pickup_date}</td>
        <td className="px-6 py-4">{data.drop_off_date}</td>
        <td className="px-6 py-4">{data.booking_duration}</td>
        <td className="px-6 py-4 flex gap-3">
          <a href="#" onClick={handleApprove}>
            <svg
              className="w-6 h-6 text-[#79F6A7]"
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
                d="M5 11.917 9.724 16.5 19 7.5"
              />
            </svg>
          </a>
          <a href="#" onClick={handleReject}>
            <svg
              className="w-6 h-6 text-[#EB5858]"
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
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </a>
          <a href="#" onClick={handleMakeChat}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.125 9.99991C11.125 10.2224 11.059 10.4399 10.9354 10.6249C10.8118 10.8099 10.6361 10.9541 10.4305 11.0393C10.225 11.1244 9.99875 11.1467 9.78052 11.1033C9.56229 11.0599 9.36184 10.9527 9.2045 10.7954C9.04717 10.6381 8.94002 10.4376 8.89662 10.2194C8.85321 10.0012 8.87549 9.77495 8.96064 9.56939C9.04578 9.36382 9.18998 9.18812 9.37498 9.0645C9.55999 8.94089 9.7775 8.87491 10 8.87491C10.2984 8.87491 10.5845 8.99343 10.7955 9.20441C11.0065 9.41539 11.125 9.70154 11.125 9.99991ZM5.875 8.87491C5.6525 8.87491 5.43499 8.94089 5.24998 9.0645C5.06498 9.18812 4.92078 9.36382 4.83564 9.56939C4.75049 9.77495 4.72821 10.0012 4.77162 10.2194C4.81502 10.4376 4.92217 10.6381 5.0795 10.7954C5.23684 10.9527 5.43729 11.0599 5.65552 11.1033C5.87375 11.1467 6.09995 11.1244 6.30552 11.0393C6.51109 10.9541 6.68679 10.8099 6.8104 10.6249C6.93402 10.4399 7 10.2224 7 9.99991C7 9.70154 6.88147 9.41539 6.6705 9.20441C6.45952 8.99343 6.17337 8.87491 5.875 8.87491ZM14.125 8.87491C13.9025 8.87491 13.685 8.94089 13.5 9.0645C13.315 9.18812 13.1708 9.36382 13.0856 9.56939C13.0005 9.77495 12.9782 10.0012 13.0216 10.2194C13.065 10.4376 13.1722 10.6381 13.3295 10.7954C13.4868 10.9527 13.6873 11.0599 13.9055 11.1033C14.1238 11.1467 14.35 11.1244 14.5555 11.0393C14.7611 10.9541 14.9368 10.8099 15.0604 10.6249C15.184 10.4399 15.25 10.2224 15.25 9.99991C15.25 9.70154 15.1315 9.41539 14.9205 9.20441C14.7095 8.99343 14.4234 8.87491 14.125 8.87491ZM19.75 9.99991C19.7504 11.6832 19.3149 13.338 18.486 14.803C17.6572 16.2681 16.4631 17.4937 15.02 18.3604C13.577 19.2271 11.9341 19.7054 10.2514 19.7488C8.56863 19.7922 6.9033 19.3992 5.4175 18.608L2.22531 19.6721C1.96102 19.7602 1.6774 19.773 1.40624 19.709C1.13509 19.645 0.887113 19.5068 0.69011 19.3098C0.493108 19.1128 0.354864 18.8648 0.290873 18.5937C0.226882 18.3225 0.239673 18.0389 0.327812 17.7746L1.39187 14.5824C0.696389 13.2748 0.307935 11.826 0.255998 10.3458C0.20406 8.86568 0.490005 7.39316 1.09213 6.04003C1.69425 4.6869 2.59672 3.48873 3.73105 2.53646C4.86537 1.58419 6.20173 0.902854 7.63869 0.544165C9.07565 0.185476 10.5754 0.158863 12.0242 0.466346C13.473 0.773829 14.8327 1.40733 16.0001 2.31875C17.1675 3.23018 18.1119 4.39558 18.7616 5.7265C19.4114 7.05741 19.7494 8.51886 19.75 9.99991ZM18.25 9.99991C18.2496 8.7344 17.9582 7.48593 17.3981 6.3511C16.838 5.21627 16.0244 4.2255 15.0201 3.45544C14.0159 2.68537 12.8479 2.15666 11.6067 1.91021C10.3654 1.66375 9.08405 1.70616 7.86178 2.03415C6.63951 2.36215 5.50909 2.96693 4.55796 3.80171C3.60682 4.6365 2.86049 5.6789 2.37668 6.84828C1.89288 8.01766 1.68458 9.28266 1.7679 10.5454C1.85122 11.8082 2.22393 13.0349 2.85719 14.1305C2.91034 14.2225 2.94334 14.3247 2.954 14.4304C2.96467 14.5361 2.95276 14.6429 2.91906 14.7437L1.75 18.2499L5.25625 17.0808C5.33262 17.0548 5.41275 17.0415 5.49344 17.0415C5.62516 17.0417 5.7545 17.0766 5.86844 17.1427C7.12263 17.8684 8.54581 18.2509 9.99479 18.2518C11.4438 18.2527 12.8674 17.872 14.1225 17.1479C15.3776 16.4239 16.4199 15.382 17.1445 14.1272C17.869 12.8724 18.2503 11.4489 18.25 9.99991Z"
                fill="#97AFDE"
              />
            </svg>
          </a>
        </td>
      </tr>
    </>
  );
};

const RowItemHistory = ({ data }: any) => {
  return (
    <>
      <tr
        className={`border-b-2 border-[#A0A0A0] ${
          data.status === "Approved"
            ? "bg-[#79F6A7]"
            : data.status === "Rejected"
            ? "bg-[#EB5858]"
            : "bg-white"
        }`}
      >
        <td className="px-6 py-4">{data.request_date}</td>
        <td className="px-6 py-4">{data.broker}</td>
        <td className="px-6 py-4">{data.car_model}</td>
        <td className="px-6 py-4">{data.car_type}</td>
        <td className="px-6 py-4">{data.pickup_date}</td>
        <td className="px-6 py-4">{data.drop_off_date}</td>
        <td className="px-6 py-4">{data.booking_duration}</td>
        <td className="px-6 py-4 flex gap-3">
          {data.hasReview ? (
            <span>
              <svg
                className="w-6 h-6 text-[#EAAB4E]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            </span>
          ) : (
            <span>
              <svg
                className="w-6 h-6 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
                />
              </svg>
            </span>
          )}
        </td>
      </tr>
    </>
  );
};
