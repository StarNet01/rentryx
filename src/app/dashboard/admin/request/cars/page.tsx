"use client";
import DashboardLayout from "@/modules/dashboard/layouts/DashboardLayout";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";
import React from "react";
import useSWR from "swr";

const mockData = [
  {
    id: 1,
    date: "2025-02-01",
    companyName: "Luxury Motors",
    carModel: "Mercedes G-Class",
    carType: "SUV",
    location: "Dubai",
    insurance: "2025-03-21",
  },
  {
    id: 2,
    date: "2025-02-15",
    companyName: "Premium Cars",
    carModel: "BMW X7",
    carType: "SUV",
    location: "Abu Dhabi",
    insurance: "2025-04-15",
  },
  {
    id: 3,
    date: "2025-02-20",
    companyName: "Elite Wheels",
    carModel: "Porsche 911",
    carType: "Sports Car",
    location: "Sharjah",
    insurance: "2025-05-01",
  },
];

const page = () => {
  const { data: ADSLIst, isLoading: isLoading } = useSWR(
    "companies/1",
    (url: string) => HttpClient.getInstance().fetcher(url)
  );

//  const ADSLIst = mockData; // TODO for dev

  return (
    <>
      <DashboardLayout panelType="admin">
        <div className="relative overflow-x-auto mt-5">
          <h1>Car Ads</h1>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-[#A0A0A0] uppercase bg-gray-50 ">
              <tr className="bg-white border-b  border-[#A0A0A0]">
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Company Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Car model
                </th>
                <th scope="col" className="px-6 py-3">
                  Car type
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Insurance
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {ADSLIst &&
                ADSLIst.map((item: any, i: any) => (
                  <RowItem data={item} key={i} />
                ))}
            </tbody>
          </table>
        </div>
      </DashboardLayout>
    </>
  );
};

export default page;

const RowItem = ({ data }: any) => {
  return (
    <>
      <tr className="bg-white border-b-2  border-[#A0A0A0]">
        <td className="px-6 py-4">{data.date}</td>
        <td className="px-6 py-4">{data.companyName}</td>
        <td className="px-6 py-4">{data.carModel}</td>
        <td className="px-6 py-4">{data.carType}</td>
        <td className="px-6 py-4">{data.location}</td>
        <td className="px-6 py-4">{data.insurance}</td>
        <td className="px-6 py-4 flex gap-3">
          // TODO make link
          <a href="#" className="text-blue-500 underline">
            View
          </a>
        </td>
      </tr>
    </>
  );
};
