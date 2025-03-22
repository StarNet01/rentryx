"use client";
import DashboardLayout from "@/modules/dashboard/layouts/DashboardLayout";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import useSWR from "swr";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const requests = [
  {
    id: 1,
    request_date: "2024-03-15",
    company_name: "Luxury Cars Co.",
    car_model: "BMW X7",
    car_type: "SUV",
    pickup_date: "2024-04-01",
    drop_off_date: "2024-04-10",
    total_days: 9,
    total_price: 4500,
    status: "Pending",
    company_id: 101,
  },
  {
    id: 2,
    request_date: "2024-03-14",
    company_name: "Premium Motors",
    car_model: "Mercedes S-Class",
    car_type: "Sedan",
    pickup_date: "2024-03-20",
    drop_off_date: "2024-03-25",
    total_days: 5,
    total_price: 3000,
    status: "Accepted",
    company_id: 102,
  },
  {
    id: 3,
    request_date: "2024-03-13",
    company_name: "Elite Cars",
    car_model: "Porsche 911",
    car_type: "Sports",
    pickup_date: "2024-03-18",
    drop_off_date: "2024-03-21",
    total_days: 3,
    total_price: 2800,
    status: "Rejected",
    company_id: 103,
  },
];

const page = () => {
  const [filter, setFilter] = useState("All");

  const { data: requests, mutate } = useSWR("broker/requests", (url) =>
    HttpClient.getInstance().fetcher(url)
  );
  
  if (!requests) return <div>Loading...</div>;

  const filteredRequests = requests?.filter((request: any) => {
    switch (filter) {
      case "All":
        return true;
      case "Accepted":
        return request.status === "Accepted";
      case "Rejected":
        return request.status === "Rejected";
      case "Waiting":
        return request.status === "Pending";
      default:
        return true;
    }
  });

  return (
    <DashboardLayout panelType="broker">
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl">Reserve listing</h1>
        <div className="">
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <FormControlLabel value="All" control={<Radio />} label="All" />
              <FormControlLabel
                value="Accepted"
                sx={{
                  color: "#79F6A7",
                  "&.Mui-checked": {
                    color: "#79F6A7",
                  },
                }}
                control={<Radio />}
                label="Accepted"
              />
              <FormControlLabel
                value="Rejected"
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
                value="Waiting"
                control={<Radio />}
                label="Waiting"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      <div className="relative overflow-x-auto mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-[#A0A0A0] uppercase bg-gray-50 ">
            <tr className="bg-white border-b  border-[#A0A0A0]">
              <th scope="col" className="px-6 py-3">
                Request Date
              </th>
              <th scope="col" className="px-6 py-3">
                Company
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
                Total Days
              </th>
              <th scope="col" className="px-6 py-3">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests &&
              filteredRequests?.map((request: any, index: number) => (
                <RowItem key={index} request={request} />
              ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default page;

const RowItem = ({ request }: any) => {
  return (
    <>
      <tr
        className={`border-b-2 border-[#A0A0A0] ${
          request.status === "Accepted"
            ? "bg-[#79F6A7]"
            : request.status === "Rejected"
            ? "bg-[#EB5858]"
            : "bg-white"
        }`}
      >
        <td className="px-6 py-4">{request.request_date}</td>
        <td className="px-6 py-4">{request.company_name}</td>
        <td className="px-6 py-4">{request.car_model}</td>
        <td className="px-6 py-4">{request.car_type}</td>
        <td className="px-6 py-4">{request.pickup_date}</td>
        <td className="px-6 py-4">{request.drop_off_date}</td>
        <td className="px-6 py-4">{request.total_days} Days</td>
        <td className="px-6 py-4">
          {request.total_price} <span className="text-[#A0A0A0]">AED</span>
        </td>
      </tr>
    </>
  );
};
